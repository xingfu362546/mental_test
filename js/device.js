window.SixQDevice = {
  toast(msg, ms = 1600) {
    const root = document.querySelector(".phone-frame") || document.body;
    let el = root.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      root.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("is-show");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("is-show"), ms);
  }
};
