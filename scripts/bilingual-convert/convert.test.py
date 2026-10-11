"""Contract checks for resumable automation and model-written subtitle data."""
import argparse
import copy
import hashlib
import importlib.util
import json
from pathlib import Path
import tempfile
import sys
import unittest
from unittest.mock import Mock, patch

sys.path.insert(0, str(Path(__file__).resolve().parent))

spec = importlib.util.spec_from_file_location("convert", Path(__file__).with_name("convert.py"))
convert = importlib.util.module_from_spec(spec)
spec.loader.exec_module(convert)


class ConversionTests(unittest.TestCase):
    def setUp(self):
        self.sentences = [{"id": "s1", "fingerprint": "f1"}, {"id": "s2", "fingerprint": "f2"}]
        self.translations = [{"id": "s1", "text": "第一句。"}, {"id": "s2", "text": "第二句。"}]

    def test_rejects_missing_reordered_and_empty_translation(self):
        for units in [self.translations[:1], list(reversed(self.translations)),
                      [{"id": "s1", "text": ""}, self.translations[1]],
                      [{"id": "s1", "text": "第一\n句"}, self.translations[1]]]:
            with self.subTest(units=units), self.assertRaises(RuntimeError):
                convert.checked_translations(self.sentences, {"translations": units})

    def test_translation_uses_current_basis_and_runtime_alignment(self):
        basis = {"sourceBasis": {"documentId": "speech", "revision": "3"}, "sentences": self.sentences}
        body = convert.translation_body(basis, self.translations)
        self.assertEqual(body["sourceBasis"], basis["sourceBasis"])
        self.assertEqual(body["units"][1]["sourceFingerprint"], "f2")
        self.assertIsNone(body["units"][0]["alignment"])

    def test_polish_changes_only_word_text_and_does_not_mutate_input(self):
        body = {"schema": "speech", "words": [
            {"id": "w1", "text": "qdrant", "start": 0.1, "end": 0.8, "speakerId": "spk1"},
            {"id": "w2", "text": "memory", "start": 1, "end": 2}], "speakers": [{"id": "spk1"}]}
        original = copy.deepcopy(body)
        corrected = convert.polished_body(body, [{"id": "w1", "text": "Qdrant"}])
        self.assertEqual(body, original)
        corrected["words"][0]["text"] = "qdrant"
        self.assertEqual(corrected, original)

    def test_polish_rejects_unknown_duplicate_or_empty_words(self):
        body = {"words": [{"id": "w1", "text": "one"}]}
        for changes in [[{"id": "missing", "text": "two"}], [{"id": "w1", "text": " "}],
                        [{"id": "w1", "text": "One"}, {"id": "w1", "text": "one"}]]:
            with self.subTest(changes=changes), self.assertRaises(RuntimeError):
                convert.polished_body(body, changes)

    def test_wait_continues_after_timeout_and_rejects_failed_jobs(self):
        cli = object.__new__(convert.BaoCut)
        cli.call = Mock(side_effect=[convert.CliError({"code": "WAIT_TIMEOUT"}),
                                    {"job": {"state": "completed", "outputs": []}}])
        self.assertEqual(cli.wait("job1")["state"], "completed")
        self.assertEqual(cli.call.call_count, 2)
        cli.call = Mock(return_value={"job": {"state": "failed"}})
        with self.assertRaises(RuntimeError):
            cli.wait("job2")

    def test_export_verification_detects_tampering(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "file.srt"
            path.write_bytes(b"subtitles")
            outputs = [{"path": str(path), "artifactId": "sha256:" + hashlib.sha256(path.read_bytes()).hexdigest()}]
            convert.Conversion.verify_outputs(outputs)
            path.write_bytes(b"changed")
            with self.assertRaises(RuntimeError):
                convert.Conversion.verify_outputs(outputs)
            path.unlink()
            with self.assertRaises(RuntimeError):
                convert.Conversion.verify_outputs(outputs)

    def test_state_load_is_deferred_until_lock_and_preserves_job_ids(self):
        with tempfile.TemporaryDirectory() as directory, patch.object(convert, "BaoCut"):
            args = argparse.Namespace(video=None, source="https://example.org/video", output=directory,
                                      source_has_captions=False)
            first = convert.Conversion(args)
            second = convert.Conversion(args)
            self.assertFalse(first.state_file.exists())
            first.load_state()
            first.state["jobs"]["transcribe"] = "saved-job"
            first.save()
            second.load_state()
            self.assertEqual(second.state["jobs"]["transcribe"], "saved-job")
            self.assertEqual(first.command_id("transcribe"), second.command_id("transcribe"))
            args.source_has_captions = True
            with self.assertRaises(RuntimeError):
                second.load_state()

    def test_job_resume_does_not_resubmit(self):
        conversion = object.__new__(convert.Conversion)
        conversion.state = {"jobs": {"transcribe": "saved-job"}}
        conversion.cli = Mock()
        conversion.job("transcribe", ["transcribe", "--url", "unused"])
        conversion.cli.call.assert_not_called()
        conversion.cli.wait.assert_called_once_with("saved-job")

    def test_state_rejects_changed_local_input(self):
        with tempfile.TemporaryDirectory() as directory, patch.object(convert, "BaoCut"):
            path = Path(directory) / "input.mp4"
            path.write_bytes(b"original")
            args = argparse.Namespace(video=None, source=str(path), output=str(Path(directory) / "output"),
                                      source_has_captions=False)
            conversion = convert.Conversion(args)
            conversion.load_state()
            path.write_bytes(b"changed")
            with self.assertRaises(RuntimeError):
                conversion.load_state()

    def test_copy_uses_requested_language_and_english_fallback(self):
        with patch.dict(convert.os.environ, {"BAOCUT_LOCALE": "zh-Hans"}):
            self.assertEqual(convert.message("Simplified Chinese"), "简体中文")
        for language in ["en", "ja", "unknown"]:
            with patch.dict(convert.os.environ, {"BAOCUT_LOCALE": language}):
                self.assertEqual(convert.message("Simplified Chinese"), "Simplified Chinese")

    def test_dns_workaround_restores_config_after_conversion_error(self):
        requests = []

        def run(arguments, **kwargs):
            if arguments[0] == "/usr/bin/ruby":
                return Mock(returncode=0, stdout=json.dumps({"dns": {}, "proxy-groups": [{"name": "PROXY"}]}))
            if arguments[0] == "curl":
                requests.append((arguments, json.loads(kwargs["input"]) if kwargs.get("input") else None))
            return Mock(returncode=0, stdout="", stderr="")

        fake = [(None, None, None, None, ("198.18.0.1", 0))]
        real = [(None, None, None, None, ("142.250.199.206", 0))]
        with patch.object(convert.sys, "platform", "darwin"), \
             patch.object(convert.socket, "getaddrinfo", side_effect=[fake, real]), \
             patch.object(convert.Path, "is_file", return_value=True), \
             patch.object(convert.Path, "exists", return_value=True), \
             patch.object(convert.subprocess, "run", side_effect=run):
            with self.assertRaisesRegex(RuntimeError, "conversion error"):
                with convert._youtube_dns_workaround("https://www.youtube.com/watch?v=test", True):
                    raise RuntimeError("conversion error")
        self.assertIn("payload", requests[0][1])
        self.assertIn("path", requests[-1][1])
        self.assertNotIn("payload", requests[-1][1])

    def test_dns_workaround_lock_prevents_overlapping_config_changes(self):
        real = [(None, None, None, None, ("142.250.199.206", 0))]
        with tempfile.TemporaryDirectory() as directory, \
             patch.object(convert.sys, "platform", "darwin"), \
             patch.object(convert.tempfile, "gettempdir", return_value=directory), \
             patch.object(convert.socket, "getaddrinfo", return_value=real):
            with convert.youtube_dns_workaround("https://www.youtube.com/watch?v=test", True):
                with self.assertRaises(RuntimeError):
                    with convert.youtube_dns_workaround("https://www.youtube.com/watch?v=test", True):
                        self.fail("Concurrent DNS modification was allowed")

    def test_cli_reads_spilled_result_and_reports_error_envelope(self):
        with tempfile.TemporaryDirectory() as directory:
            result_file = Path(directory) / "result.json"
            result_file.write_text(json.dumps({"body": "complete"}))
            cli = object.__new__(convert.BaoCut)
            cli.output, cli.command = Path(directory), ["baocut"]
            response = Mock(returncode=0, stdout=json.dumps({"ok": True, "result": {
                "truncated": True, "path": str(result_file)}}))
            with patch.object(convert.subprocess, "run", return_value=response):
                self.assertEqual(cli.call("documents", "read"), {"body": "complete"})
            response = Mock(returncode=1, stdout=json.dumps({"ok": False, "error": {"code": "JOB_FAILED"}}))
            with patch.object(convert.subprocess, "run", return_value=response), self.assertRaises(convert.CliError):
                cli.call("jobs", "wait")


if __name__ == "__main__":
    unittest.main()
