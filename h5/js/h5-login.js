(function () {
  const allowBtn = document.getElementById("h5-login-allow");
  const denyBtn = document.getElementById("h5-login-deny");
  const privacy = document.getElementById("h5-privacy");
  const other = document.getElementById("h5-login-other");

  if (privacy) {
    privacy.addEventListener("click", (e) => {
      e.preventDefault();
      SixQDevice.toast("隐私保护指引（演示占位）");
    });
  }

  if (other) {
    other.addEventListener("click", () => {
      SixQDevice.toast("正式环境由微信提供其他号码能力");
    });
  }

  if (denyBtn) {
    denyBtn.addEventListener("click", () => {
      window.H5Auth.clearSession();
      SixQDevice.toast("已拒绝授权");
    });
  }

  if (allowBtn) {
    allowBtn.addEventListener("click", () => {
      window.H5Auth.authorize();
      SixQDevice.toast("已授权");
      setTimeout(() => {
        location.href = "entry.html?authed=1";
      }, 280);
    });
  }
})();
