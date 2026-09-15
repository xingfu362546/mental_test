/**
 * 人生旅程 · 语音/文本描述 mock
 * 校验四关键元素（关键词+别称）；演示不接真 ASR。
 * E：敏感内容检测 → 输出开发字段 risk_*，供前端温馨提示 / 后端停一般解析。
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

  /** 演示敏感样例（勿用于真实用户默认填充） */
  SAMPLE_RISK:
    "我想结束这一切，不想再活了。猴子、小鸟、背包和蛇都跟着我，但我很绝望。",

  SAMPLE_MISS: [
    "我和猴子一起走，心里有点不安。",
    "小鸟飞得好高，远处好像有一座山。",
  ],

  /**
   * 敏感/危机关键词表（原型规则；正式环境建议后端/智能体复核）
   * category: self_harm | harm_others | domestic_violence | abuse | despair
   */
  RISK_RULES: [
    { category: "self_harm", words: ["自杀", "不想活", "结束生命", "结束这一切", "自残", "割腕", "跳楼"] },
    { category: "harm_others", words: ["想杀人", "伤害别人", "弄死他", "弄死她"] },
    { category: "domestic_violence", words: ["家暴", "打老婆", "打孩子", "被打得很惨"] },
    { category: "abuse", words: ["虐待", "性侵", "猥亵"] },
    { category: "despair", words: ["绝望", "活不下去", "没有活路"] },
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

  /**
   * 检测敏感内容，输出开发可读字段（对接智能体/后端）。
   * @param {string} text
   * @returns {{
   *   risk_flag: boolean,
   *   risk_categories: string[],
   *   stop_general_analysis: boolean,
   *   matched_terms: string[],
   *   user_text_preview: string,
   *   tip_title: string,
   *   tip_body: string
   * }}
   */
  detectRisk(text) {
    const raw = String(text || "").trim();
    const categories = [];
    const matched = [];
    this.RISK_RULES.forEach((rule) => {
      rule.words.forEach((w) => {
        if (raw.includes(w)) {
          if (!categories.includes(rule.category)) categories.push(rule.category);
          if (!matched.includes(w)) matched.push(w);
        }
      });
    });
    const hit = categories.length > 0;
    return {
      risk_flag: hit,
      risk_categories: categories,
      stop_general_analysis: hit,
      matched_terms: matched,
      user_text_preview: raw.slice(0, 120),
      tip_title: "温馨提示",
      tip_body: hit
        ? "您刚才提到的内容已经超出了趣味探索的范围。现在最重要的不是继续分析这幅画，而是先确认您和相关人员是否安全。\n\n如果您或他人正面临立即危险，请尽快联系当地紧急救援服务，或请身边可信任的人陪伴您。您也可以点击下方按钮，查看公益心理危机服务热线相关信息。\n\n（说明：系统只能识别并提示风险，不能在公众体验中独立承担危机干预。）"
        : "",
    };
  },

  randomSampleOk() {
    const list = this.SAMPLE_OK;
    return list[Math.floor(Math.random() * list.length)];
  },

  randomSample() {
    return this.randomSampleOk();
  },

  sampleRisk() {
    return this.SAMPLE_RISK;
  },
};
