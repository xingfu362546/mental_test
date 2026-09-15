/**
 * H5 登录会话（微信手机号授权）
 *
 * 逻辑注释：
 * - 正式：小程序 getPhoneNumber → 后端换取真实手机号，写入 phoneE164
 * - 进度/重新测试次数按「授权手机号」维度统计（见 H5Progress），不是设备维度
 * - 每次从 entry 进入需重新授权；会话仅 sessionStorage
 * - 本页不展示、不写入假手机号模拟数据
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
   * @param {{ phoneE164?: string, phoneMasked?: string }=} phoneFromServer
   *   正式环境由后端回填；原型阶段可为空，待接真授权。
   */
  function authorize(phoneFromServer) {
    const phoneE164 = (phoneFromServer && phoneFromServer.phoneE164) || "";
    const phoneMasked = (phoneFromServer && phoneFromServer.phoneMasked) || "";
    const session = {
      authorized: true,
      // 有真号时用手机号作稳定身份；否则临时会话 id（接号后应改为 phone 分桶）
      userId: phoneE164 ? "phone_" + phoneE164 : "wx_pending_" + Date.now().toString(36),
      phoneE164: phoneE164,
      phoneMasked: phoneMasked,
      phoneSource: phoneE164 ? "wechat" : "wechat_pending",
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
    mockLogin: authorize,
  };
})();
