/**
 * 心画统一 payload 壳（构图 / 旅程）
 * 便于后台同配；构图 imageUrl 恒 null、extras 恒 []。
 */
window.XinhuaPayload = {
  ASSESSMENT: {
    COMPOSITION: "composition",
    JOURNEY: "journey",
  },

  /**
   * @param {object} partial
   * @returns {object}
   */
  build(partial) {
    const p = partial || {};
    const compose = p.compose || {};
    return {
      assessmentType: p.assessmentType || "",
      audience: p.audience === "child" ? "child" : "adult",
      figures: Array.isArray(p.figures) ? p.figures : [],
      extras: Array.isArray(p.extras) ? p.extras : [],
      compose: {
        status: compose.status || "done",
        imageUrl: compose.imageUrl == null ? null : compose.imageUrl,
        description: compose.description || "",
        patternId: compose.patternId || "",
      },
      meta: p.meta || {},
    };
  },

  save(key, payload) {
    try {
      sessionStorage.setItem(key, JSON.stringify(payload));
    } catch (e) {}
  },

  load(key) {
    try {
      return JSON.parse(sessionStorage.getItem(key) || "null");
    } catch (e) {
      return null;
    }
  },

  readAudienceFromAge() {
    let age = null;
    try {
      const raw = sessionStorage.getItem("xinhuaAge");
      if (raw) age = Number(raw);
    } catch (e) {}
    const isChild = Number.isFinite(age) && age < 18;
    return { age, audience: isChild ? "child" : "adult", isChild };
  },
};
