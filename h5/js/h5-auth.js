/**
 * H5 mock 登录（小程序授权手机号占位）
 * 正式环境：getPhoneNumber → 后端换 userId，替换 mockLogin。
 */
window.H5Auth = (function () {
  const KEY = "xinhua_h5_session";

  function getSession() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "null");
    } catch (e) {
      return null;
    }
  }

  function mockLogin() {
    const session = {
      userId: "mock_13800000000",
      phoneMasked: "138****0000",
      loginAt: new Date().toISOString(),
    };
    localStorage.setItem(KEY, JSON.stringify(session));
    return session;
  }

  function clearSession() {
    localStorage.removeItem(KEY);
  }

  /** @returns {object|null} session；未登录则跳转 loginUrl 并返回 null */
  function requireLogin(loginUrl) {
    const s = getSession();
    if (s && s.userId) return s;
    location.href = loginUrl || "login.html";
    return null;
  }

  return { getSession: getSession, mockLogin: mockLogin, clearSession: clearSession, requireLogin: requireLogin, KEY: KEY };
})();
