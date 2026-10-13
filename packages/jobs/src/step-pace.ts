/**
 * 按步进度的剩余时间（本机生图的去噪步，命令协议 §4.1）：从收到的第一次进度量起，按已走完各步的平均耗时推算剩下的步数要多久。
 * 一步都还没走完（推不出步速）或步数已走完（解码、发布的耗时报不上来）时为 null，不编造。
 */
export class StepPace {
  #first: { at: number; done: number } | null = null;
  #last = -1;

  /** 收到一次进度（`at` 是收到时的毫秒时刻）；返回预计剩余的整秒数。进度回退（重新开始）时从这次重新量。 */
  observe(done: number, total: number, at: number): number | null {
    if (!this.#first || done < this.#last) this.#first = { at, done };
    this.#last = done;
    const first = this.#first;
    if (done <= first.done || done >= total) return null;
    const perStep = (at - first.at) / (done - first.done);
    return Math.max(0, Math.round((perStep * (total - done)) / 1000));
  }
}
