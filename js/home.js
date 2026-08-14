document.querySelectorAll(".js-stub").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    SixQDevice.toast("即将开放");
  });
});
