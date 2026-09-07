(function () {
  const btn = document.getElementById("h5-login-btn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const s = window.H5Auth.mockLogin();
    SixQDevice.toast("已授权 " + s.phoneMasked);
    setTimeout(() => {
      location.href = "entry.html";
    }, 400);
  });
})();
