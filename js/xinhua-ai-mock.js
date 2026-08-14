/**
 * 关系空间构图 · 理解/生成 mock（隐藏出图）
 */
window.XinhuaAIMock = {
  COMPOSE_DELAY_MS: 2200,
  DEMO_PATTERN_ID: "p01",

  DEMO_DESCRIPTION:
    "模型已理解你在关系地图上的摆放：成员之间的远近、朝向与大小差异，被整理为一份探索性关系描述。本原型不生成完整配图，仅保留「理解构图」流程节点，便于与人生旅程测评共用后台配置壳。（正式环境可接入真实匹配逻辑。）",

  /**
   * @param {object[]} figures
   * @returns {{ imageUrl: null, description: string, patternId: string }}
   */
  composeBoard(figures) {
    void figures;
    return {
      imageUrl: null,
      description: this.DEMO_DESCRIPTION,
      patternId: this.DEMO_PATTERN_ID,
    };
  },
};
