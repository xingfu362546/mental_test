/**
 * H5 人生旅程进度（按 userId 分桶）
 * status: none | composing | completed
 * completed 时仍保留 patternId，供智能体/服务端使用；结果页不对用户展示类型名（H5-v1.0.1）
 */
window.H5Progress = (function () {
  function key(userId) {
    return "xinhua_h5_progress_" + userId;
  }

  function empty() {
    return {
      status: "none",
      lockedDesc: "",
      imageUrl: "",
      patternId: "",
      description: "",
      genCount: 0,
      updatedAt: null,
    };
  }

  function get(userId) {
    if (!userId) return empty();
    try {
      const raw = localStorage.getItem(key(userId));
      if (!raw) return empty();
      const data = JSON.parse(raw);
      return Object.assign(empty(), data);
    } catch (e) {
      return empty();
    }
  }

  function set(userId, data) {
    if (!userId) return;
    const next = Object.assign(empty(), get(userId), data, {
      updatedAt: new Date().toISOString(),
    });
    localStorage.setItem(key(userId), JSON.stringify(next));
    return next;
  }

  function clear(userId) {
    if (!userId) return;
    localStorage.removeItem(key(userId));
  }

  return { get: get, set: set, clear: clear, empty: empty, key: key };
})();
