#!/bin/zsh
set -eu
script_dir=${0:A:h}
python_bin=/opt/miniconda3/bin/python
[[ -x "$python_bin" ]] || python_bin=$(command -v python3)
export BAOCUT_LOCALE=${BAOCUT_LOCALE:-zh-Hans}
export PYTHONDONTWRITEBYTECODE=1
ui() { "$python_bin" "$script_dir/messages.py" "$1"; }
if (( $# )); then
  exec "$python_bin" "$script_dir/convert.py" "$@"
fi
ui 'BaoCut bilingual subtitles'
ui 'Enter a video URL or local media path:'
IFS= read -r source
[[ -n "$source" ]] || exit 0
ui 'Does the image already contain original-language subtitles? [y/N]'
IFS= read -r embedded
options=(--clash-dns-workaround)
[[ "$embedded" == [yY] ]] && options+=(--source-has-captions)
ui 'BaoCut will transcribe and the logged-in Codex will translate. Output: Downloads/BaoCut-auto.'
status_code=0
"$python_bin" "$script_dir/convert.py" "$source" "${options[@]}" || status_code=$?
ui 'Press Enter to close.'
IFS= read -r ignored
exit "$status_code"
