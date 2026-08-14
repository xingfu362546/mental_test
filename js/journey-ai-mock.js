/**
 * 人生旅程 · 模型理解 / 出图 mock
 * 原型：无论画板如何摆放，均返回同一张演示成图 + 同一段描述 + 同一套解读。
 * 正式环境替换为真实多模态串联出图接口。
 */
window.JourneyAIMock = {
  /** 固定演示成图（图标串联后的完整画面） */
  DEMO_IMAGE: "assets/journey/journey-compose-demo.png",

  /** 固定演示解读模式 id（对应 journey-patterns.js） */
  DEMO_PATTERN_ID: "j04",

  /** 固定演示描述 */
  DEMO_DESCRIPTION:
    "模型将你画板上的旅伴与风景串联成一幅完整旅途：猴子走在稍前，像是重要他人在引路；小鸟轻盈飞在前方；背包贴在行进路线旁，提醒责任仍在途中；蛇安稳随行，带来安全感。远处有山与桥，阳光洒在草径上——这是一次关于信任、同行与抵达的旅程安排。（原型固定演示图与文案，正式环境将按真实摆放生成。）",

  /**
   * 模拟「理解画板 → 串联出图」耗时（毫秒）
   */
  COMPOSE_DELAY_MS: 2600,

  /**
   * @param {object[]} figures 画板元素（原型忽略差异，仅校验调用方已摆齐）
   * @returns {{ imageUrl: string, description: string, patternId: string }}
   */
  composeBoard(figures) {
    void figures;
    return {
      imageUrl: this.DEMO_IMAGE,
      description: this.DEMO_DESCRIPTION,
      patternId: this.DEMO_PATTERN_ID,
    };
  },

  /** @deprecated 保留兼容；出图流程请用 composeBoard */
  describeBoard(figures, userText, board) {
    void figures;
    void userText;
    void board;
    return this.DEMO_DESCRIPTION;
  },
};
