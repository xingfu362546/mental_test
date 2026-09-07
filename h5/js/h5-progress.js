/**
 * H5 人生旅程进度（本地分桶）
 * status: none | composing | completed
 * - patternId 仍保留供智能体；结果页不对用户展示类型名
 * - 每人最多重新测试 3 次（retestCount）；不支持重新生图
 */
window.H5Progress = (function () {
  const DEVICE_KEY = "xinhua_h5_device_id";
  const MAX_RETEST = 3;

  function deviceId() {
    try {
      let id = localStorage.getItem(DEVICE_KEY);
      if (!id) {
        id = "dev_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
        localStorage.setItem(DEVICE_KEY, id);
      }
      return id;
    } catch (e) {
      return "dev_fallback";
    }
  }

  function resolveBucket(userId) {
    void userId;
    return deviceId();
  }

  function key(userId) {
    return "xinhua_h5_progress_" + resolveBucket(userId);
  }

  function empty() {
    return {
      status: "none",
      lockedDesc: "",
      imageUrl: "",
      patternId: "",
      description: "",
      genCount: 0,
      retestCount: 0,
      updatedAt: null,
    };
  }

  function get(userId) {
    try {
      const raw = localStorage.getItem(key(userId));
      if (!raw) return empty();
      return Object.assign(empty(), JSON.parse(raw));
    } catch (e) {
      return empty();
    }
  }

  function set(userId, data) {
    const next = Object.assign(empty(), get(userId), data, {
      updatedAt: new Date().toISOString(),
    });
    localStorage.setItem(key(userId), JSON.stringify(next));
    return next;
  }

  function retestLeft(userId) {
    return Math.max(0, MAX_RETEST - (get(userId).retestCount || 0));
  }

  function canRetest(userId) {
    return retestLeft(userId) > 0;
  }

  /**
   * 发起重新测试：增加 retestCount，清空当次旅程内容。
   * @returns {{ok:boolean, left:number, reason?:string}}
   */
  function startRetest(userId) {
    const cur = get(userId);
    const used = cur.retestCount || 0;
    if (used >= MAX_RETEST) {
      return { ok: false, left: 0, reason: "重新测试次数已用尽（每人最多 3 次）" };
    }
    set(userId, {
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

  /** 清空当次内容但保留重新测试计数（防绕过限额） */
  function clear(userId) {
    const used = get(userId).retestCount || 0;
    localStorage.removeItem(key(userId));
    if (used > 0) set(userId, { retestCount: used });
  }

  return {
    get: get,
    set: set,
    clear: clear,
    empty: empty,
    key: key,
    deviceId: deviceId,
    MAX_RETEST: MAX_RETEST,
    retestLeft: retestLeft,
    canRetest: canRetest,
    startRetest: startRetest,
  };
})();
