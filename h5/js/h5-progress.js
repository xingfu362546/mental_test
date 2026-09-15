/**
 * H5 人生旅程进度
 *
 * 逻辑注释（产品口径）：
 * 1) status=composing：已生图、未点「查看解读」→ 下次入口仍进成图页，直到用户主动看解读。
 * 2) 每人仅可测试一次，不提供重新测试（MAX_RETEST=0；结果页按钮隐藏）。
 *    进度仍按「授权手机号」维度落库（phoneE164）。
 * 3) 不支持同一轮内「重新生图」。
 * 4) patternId 写入进度供智能体使用，结果页不对用户展示类型名（展示 frontTheme）。
 */
window.H5Progress = (function () {
  /** 每人仅测一次：不可重新测试 */
  const MAX_RETEST = 0;

  /**
   * 分桶：优先授权手机号；无真号时用会话 userId 占位并打日志口径注释。
   * @param {object|string} sessionOrUserId H5Auth session 或历史 userId 字符串
   */
  function resolveBucket(sessionOrUserId) {
    const s =
      sessionOrUserId && typeof sessionOrUserId === "object"
        ? sessionOrUserId
        : window.H5Auth && window.H5Auth.getSession();

    // —— 手机号维度（正式）——
    if (s && s.phoneE164) {
      return "phone_" + String(s.phoneE164).replace(/\D/g, "");
    }

    // —— 真号未回填：会话占位（演示）；上线后禁止长期依赖 ——
    if (s && s.userId) return "auth_" + s.userId;
    if (typeof sessionOrUserId === "string" && sessionOrUserId) {
      return "auth_" + sessionOrUserId;
    }
    return "auth_anon";
  }

  function key(sessionOrUserId) {
    return "xinhua_h5_progress_" + resolveBucket(sessionOrUserId);
  }

  function empty() {
    return {
      status: "none",
      lockedDesc: "",
      imageUrl: "",
      patternId: "",
      description: "",
      genCount: 0,
      /** 已使用的重新测试次数（手机号维度）；首次完成后剩余 = MAX_RETEST - retestCount */
      retestCount: 0,
      updatedAt: null,
    };
  }

  function get(sessionOrUserId) {
    try {
      const raw = localStorage.getItem(key(sessionOrUserId));
      if (!raw) return empty();
      return Object.assign(empty(), JSON.parse(raw));
    } catch (e) {
      return empty();
    }
  }

  function set(sessionOrUserId, data) {
    const next = Object.assign(empty(), get(sessionOrUserId), data, {
      updatedAt: new Date().toISOString(),
    });
    localStorage.setItem(key(sessionOrUserId), JSON.stringify(next));
    return next;
  }

  function retestLeft(sessionOrUserId) {
    return Math.max(0, MAX_RETEST - (get(sessionOrUserId).retestCount || 0));
  }

  function canRetest(sessionOrUserId) {
    return retestLeft(sessionOrUserId) > 0;
  }

  /**
   * 发起重新测试（计入手机号维度的 retestCount）
   * @returns {{ok:boolean, left:number, reason?:string}}
   */
  function startRetest(sessionOrUserId) {
    const cur = get(sessionOrUserId);
    const used = cur.retestCount || 0;
    if (used >= MAX_RETEST) {
      return {
        ok: false,
        left: 0,
        reason: "每人仅可测试一次，不支持重新测试",
      };
    }
    set(sessionOrUserId, {
      status: "none",
      lockedDesc: "",
      imageUrl: "",
      patternId: "",
      description: "",
      genCount: 0,
      retestCount: used + 1,
    });
    return { ok: true, left: MAX_RETEST - (used + 1) };
  }

  function clear(sessionOrUserId) {
    const used = get(sessionOrUserId).retestCount || 0;
    localStorage.removeItem(key(sessionOrUserId));
    if (used > 0) set(sessionOrUserId, { retestCount: used });
  }

  return {
    get: get,
    set: set,
    clear: clear,
    empty: empty,
    key: key,
    resolveBucket: resolveBucket,
    MAX_RETEST: MAX_RETEST,
    retestLeft: retestLeft,
    canRetest: canRetest,
    startRetest: startRetest,
  };
})();
