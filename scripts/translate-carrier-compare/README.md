# translate-carrier-compare

翻译流程的两种融合载体（`alignFusion: 'rows' | 'lines'`）在真实项目上的对照：用生产的 `runSpeechTranslate`（`packages/jobs` 源码）和编好的 `speech-worker`，把每份转写各按两种载体翻一遍，记下 `report.json` 的对齐计数、译文单元的对齐器分布、调用次数，以及每次调用的输入与回答。背景、判据与 2026-10-14 的结果见[精简载体设计 §8.16](../../docs/design/subtitle/bcut-lean-llm-carrier-design.md#816-2026-10-14-v3-runtime-接入与默认载体)。

只读视频：转写从各项目的 `video.db` 以只读方式导出，翻译产出只写进 `--out`，不回写视频。

## 用法

需要 Node 22.18+、`python3`，以及编好的 Worker（`cargo build -p speech-worker`；找不到时用 `--worker` 指定）。从仓库根运行。

导出转写（每个视频取最长的那份转写的当前版本）：

```bash
python3 -I scripts/translate-carrier-compare/extract.py ~/Documents/BaoCut /tmp/carrier-corpus
```

结构对照（不调模型，确定性的回声答案）：

```bash
node scripts/translate-carrier-compare/compare.ts --corpus /tmp/carrier-corpus --out /tmp/carrier-runs
```

```bash
python3 -I scripts/translate-carrier-compare/tally.py /tmp/carrier-runs/summary.none.json
```

真实模型对照：先在 Runtime 的设置里配好并开启一个文本服务商，确认 `node apps/cli/src/main.ts text --provider <provider> --model <model> ok` 能返回，再用 `--generator runtime`。每次调用经 CLI 的 `text`（`models.generateText`），授权、预算与账本都按 Runtime 的规矩走；`BAOCUT_HOME` 指向要用的那个 Runtime。

```bash
node scripts/translate-carrier-compare/compare.ts --generator runtime --provider <provider> --model <model> --max-output-tokens 8192 --videos video_eb935384ae574712 --corpus /tmp/carrier-corpus --out /tmp/carrier-live
```

`--max-output-tokens` 给模型的单次输出上限（DeepSeek 是 8192）。

## 参数

- `--generator echo`（默认）：每块按源词数写长度成比例的填充文本（中日韩目标约 1.6 字/词，其他约 1 词/词；中日韩源按字数的一半算词），rows 按 `data-align-groups` 每组一块，`lines` 按 `¦` 每片一块；改写、修复等后续请求不作答。只验证两种载体能不能把真实文稿走完，不代表对齐质量。`fake` 是 jobs 测试用的假模型，两边的块长不一样，不适合对照。
- `--perturb nomarks|merge|range|fence|drop`：只扰动 `lines` 整页的头一次回答（去块标记、两行并一行、引用写错、包代码块、漏末行），看核心怎么降级。
- `--replay <先前的 --out>`：按提示词原样回放那次运行记下的回答（同一页重发时依次取），回答不变地验证解析侧的改动；录制里没有的提示词交给 `--generator`（`--generator replay` 时直接失败）。`--out` 开跑前会清空，不能与 `--replay` 同一目录。
- `--fusion rows,lines`、`--videos id,id`、`--max-words N`：选载体与视频。

产出：`<out>/<videoId>.<载体>.<扰动>/` 下有 `calls.jsonl`（每次调用的种类、字数、用量、输入与回答；失败的调用记错误码、输出上限与提示词）、`staging/report.json`、`translation.json`、`cues.json`；`<out>/summary.<扰动>.json` 汇总全部运行。`tally.py` 可以一次读几份汇总，按载体与源语言出表，token 从各次运行的 `calls.jsonl` 累加。
