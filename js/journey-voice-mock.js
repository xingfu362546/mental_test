/**
 * 人生旅程 · 语音/文本描述 mock
 * 校验四关键元素（关键词+别称）；演示不接真 ASR。
 */
window.JourneyVoiceMock = {
  REQUIRED: [
    { key: "monkey", label: "猴子", words: ["猴子", "小猴", "猴儿", "灵猴"] },
    { key: "bird", label: "小鸟", words: ["小鸟", "鸟", "雏鸟", "飞鸟"] },
    { key: "bag", label: "背包", words: ["背包", "书包", "包袱", "行囊", "包"] },
    { key: "snake", label: "蛇", words: ["蛇", "小蛇", "长虫"] },
  ],

  SAMPLE_OK: [
    "我和猴子并肩走，小鸟飞在前面，背包在脚边，蛇安稳跟在后面。",
    "路上带着猴子、小鸟、背包和蛇，谁都没有落下。",
    "猴子走前面引路，我背着背包，小鸟在肩上，蛇缠在手腕提醒我小心。",
  ],

  SAMPLE_MISS: [
    "我和猴子一起走，心里有点不安。",
    "小鸟飞得好高，远处好像有一座山。",
  ],

  /**
   * @param {string} text
   * @returns {{ ok: boolean, missing: {key:string,label:string}[], found: string[] }}
   */
  validateRequired(text) {
    const raw = String(text || "").trim();
    const found = [];
    const missing = [];
    this.REQUIRED.forEach((item) => {
      const hit = item.words.some((w) => raw.includes(w));
      if (hit) found.push(item.label);
      else missing.push({ key: item.key, label: item.label });
    });
    return { ok: missing.length === 0 && raw.length > 0, missing, found };
  },

  randomSampleOk() {
    const list = this.SAMPLE_OK;
    return list[Math.floor(Math.random() * list.length)];
  },

  randomSample() {
    return this.randomSampleOk();
  },
};
