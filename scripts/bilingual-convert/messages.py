"""Copy for this standalone Python helper; unsupported locales fall back to English."""
import os


ZH_HANS = {
    "BaoCut CLI not found. Set BAOCUT_CLI to its executable path.": "找不到 BaoCut CLI，请通过 BAOCUT_CLI 指定可执行文件路径。",
    "BaoCut returned invalid JSON (exit {code}).": "BaoCut 返回的 JSON 无效（退出码 {code}）。",
    "BaoCut exited with {code}.": "BaoCut 已退出，退出码 {code}。",
    "Job {job}: {state}; {error}": "任务 {job}：{state}；{error}",
    "Job {job} is still running; continuing to wait.": "任务 {job} 仍在运行，继续等待。",
    "Translation IDs/order/count do not match the current source sentences.": "译文的 ID、顺序或数量与当前原文句子不匹配。",
    "A translation is empty or contains a line break.": "译文中存在空文本或换行。",
    "Invalid transcript correction: unknown/duplicate word ID or empty text.": "原文校对结果无效：词 ID 未知或重复，或者文本为空。",
    "Codex CLI not found. Install it and run codex login first.": "找不到 Codex CLI，请安装并先运行 codex login。",
    "Codex {name} failed (exit {code}); rerun to resume.": "Codex 的 {name} 步骤失败（退出码 {code}），再次运行可继续。",
    "Another conversion is using the Clash DNS workaround. Retry later.": "另一项转换正在使用 Clash DNS 临时配置，请稍后重试。",
    "YouTube DNS lookup failed; check Clash connectivity before retrying.": "YouTube DNS 解析失败，请检查 Clash 网络后重试。",
    "Clash Fake-IP detected, but its configuration/socket was not found. Exclude +.youtube.com from Fake-IP.": "检测到 Clash Fake-IP，但找不到配置或服务接口，请将 +.youtube.com 排除在 Fake-IP 外。",
    "Cannot parse Clash configuration; no network settings were changed.": "无法解析 Clash 配置，网络设置未改动。",
    "Clash uses a non-blacklist Fake-IP mode; configure YouTube real DNS manually.": "Clash 的 Fake-IP 过滤不是黑名单模式，请手动配置 YouTube 真实 DNS。",
    "Clash has no PROXY group; configure YouTube real DNS manually.": "Clash 中没有 PROXY 组，请手动配置 YouTube 真实 DNS。",
    "Clash request failed: {method} {route} (exit {code}).": "Clash 请求失败：{method} {route}（退出码 {code}）。",
    "Temporarily using real DNS for YouTube through Clash; restoration follows.": "临时通过 Clash 为 YouTube 使用真实 DNS，结束后恢复配置。",
    "YouTube DNS is still not public; check Clash connectivity.": "YouTube DNS 仍未解析为公网地址，请检查 Clash 网络。",
    "Clash original configuration restored.": "已恢复 Clash 原配置。",
    "This output directory belongs to different input/options. Choose another --output directory.": "此输出目录已有其他输入或选项的记录，请用 --output 指定新目录。",
    "Input media changed or was deleted. Choose a new --output directory.": "输入媒体已被修改或删除，请用 --output 指定新目录。",
    "BaoCut CLI and Runtime interface versions differ; update them together.": "BaoCut CLI 与 Runtime 的接口版本不同，请一起更新。",
    "Codex is not logged in. Run codex login, then retry.": "Codex 尚未登录，请先运行 codex login 后重试。",
    "Input must be a video URL or an existing media file.": "输入必须是视频链接或已存在的媒体文件路径。",
    "Transcription completed without a video ID; inspect the saved job before retrying.": "转录已结束但没有视频 ID，请检查已记录的任务后重试。",
    "Expected one speech document; select a video with one source transcript.": "需要一份原文文稿，请选择只有一份原文文稿的视频。",
    "Multiple Simplified Chinese translations exist; resolve them in BaoCut first.": "存在多份简体中文译文，请先在 BaoCut 中处理。",
    "Proofread transcript": "校对原文",
    "Source transcript changed during translation; rerun with the current source.": "翻译期间原文发生了变化，请按当前原文重新运行。",
    "Simplified Chinese": "简体中文",
    "Existing translation is stale. Review/update it in BaoCut before resuming.": "现有译文与当前原文不匹配，请先在 BaoCut 中检查或更新。",
    "Reusing the existing transcript and Simplified Chinese translation.": "复用已有原文和简体中文译文。",
    "Keep original embedded captions; place Chinese above the image": "保留原片字幕，将中文置于画面上方",
    "Video changed after exports were started. Choose a new --output directory.": "开始导出后视频发生了变化，请用 --output 指定新目录。",
    "Completed. Editable video: {video}\nOutput: {output}": "已完成，可编辑视频：{video}\n输出目录：{output}",
    "Video changed between exports; stop and use a new --output directory.": "导出期间视频发生了变化，请用 --output 指定新目录。",
    "Verified existing export: {filename}": "已校验现有导出：{filename}",
    "Video changed while submitting an export; use a new --output directory.": "提交导出时视频发生了变化，请用 --output 指定新目录。",
    "Export warnings: ": "导出提示：",
    "Export job completed without files.": "导出任务已结束，但没有输出文件。",
    "Export was deleted: {path}. Use a new --output directory.": "导出文件已被删除：{path}。请用 --output 指定新目录。",
    "Export was changed: {path}. Use a new --output directory.": "导出文件已被修改：{path}。请用 --output 指定新目录。",
    "BaoCut transcription + Codex translation + bilingual SRT/MP4/editable package.": "BaoCut 转录、Codex 翻译，导出双语 SRT、MP4 和可编辑包。",
    "Video URL or local media file": "视频链接或本机媒体文件路径",
    "Reuse an existing BaoCut video (ID or directory)": "复用已有 BaoCut 视频（ID 或目录）",
    "Output directory; rerunning with the same input resumes automatically": "输出目录；相同输入再次运行会自动继续",
    "Keep embedded captions and place Chinese near the top": "保留原片字幕，把新建的中文放在画面上方",
    "Temporarily resolve YouTube publicly through the current Clash PROXY group (macOS)": "通过当前 Clash PROXY 组临时为 YouTube 使用公网 DNS（macOS）",
    "Export SRT and editable package only": "只导出 SRT 和可编辑包",
    "Provide exactly one source or --video.": "请提供一项输入或 --video，二者只能选一项。",
    "Another conversion is using this output directory.": "另一项转换正在使用此输出目录。",
    "Conversion stopped: {error}": "转换已停止：{error}",
    "Interrupted. Rerun the same command to inspect/resume saved jobs.": "已中断，再次运行同一条命令可检查并继续已记录的任务。",
    "BaoCut bilingual subtitles": "BaoCut 一键生成简体中文双语字幕",
    "Enter a video URL or local media path:": "输入视频链接或本机媒体文件路径：",
    "Does the image already contain original-language subtitles? [y/N]": "原视频画面是否已经带原文字幕？[y/N]",
    "BaoCut will transcribe and the logged-in Codex will translate. Output: Downloads/BaoCut-auto.": "将使用 BaoCut 本机转录和已登录的 Codex 翻译，输出到 Downloads/BaoCut-auto。",
    "Press Enter to close.": "按回车关闭窗口。",
}


def message(text, **values):
    language = os.environ.get("BAOCUT_LOCALE", "en").replace("_", "-").lower()
    template = ZH_HANS.get(text, text) if language in {"zh", "zh-hans", "zh-cn"} else text
    return template.format(**values)


if __name__ == "__main__":
    import sys
    print(message(sys.argv[1]))
