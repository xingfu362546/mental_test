/**
 * H5 登录会话（微信手机号授权口径）
 * - 不写入假手机号等模拟展示数据
 * - 正式环境：getPhoneNumber → 后端换 userId / 真实手机号
 * - 会话仅存 sessionStorage：关页即失效；入口每次强制重新授权
 */
window.H5Auth = (function () {
  const KEY = "xinhua_h5_session";

  function readStore() {
    try {
      return JSON.parse(sessionStorage.getItem(KEY) || "null");
    } catch (e) {
      return null;
    }
  }

  function writeStore(session) {
    sessionStorage.setItem(KEY, JSON.stringify(session));
  }

  function getSession() {
    const s = readStore();
    if (s && s.authorized && s.userId) return s;
    return null;
  }

  /**
   * 用户点击「允许」后建立本趟会话。
   * 不填充假手机号；userId 仅作本趟进度分桶，待真授权后由后端下发替换。
   */
  function authorize() {
    const session = {
      authorized: true,
      userId: "wx_pending_" + Date.now().toString(36),
      phoneMasked: "",
      phoneSource: "wechat_pending",
      loginAt: new Date().toISOString(),
    };
    writeStore(session);
    return session;
  }

  function clearSession() {
    sessionStorage.removeItem(KEY);
    try {
      localStorage.removeItem(KEY);
    } catch (e) {}
  }

  /** 未授权则跳转登录；返回 session 或 null */
  function requireLogin(loginUrl) {
    const s = getSession();
    if (s) return s;
    location.href = loginUrl || "login.html";
    return null;
  }

  return {
    KEY: KEY,
    getSession: getSession,
    authorize: authorize,
    clearSession: clearSession,
    requireLogin: requireLogin,
    /** @deprecated 使用 authorize；保留空操作避免旧引用报错 */
    mockLogin: authorize,
  };
})();
