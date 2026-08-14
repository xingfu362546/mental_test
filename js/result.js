(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) {
    root.SixQResult = api;
    if (root.document) api.mount(root.document);
  }
})(typeof window !== "undefined" ? window : null, function () {
  function getStarState(rating) {
    return Array.from({ length: 5 }, (_, index) => index < rating);
  }

  function mount(document) {
    const view = document.defaultView;
    const scroll = document.querySelector(".app-scroll");
    const tabs = document.querySelectorAll("[data-tab]");
    const panels = document.querySelectorAll("[data-panel]");
    const stars = document.querySelectorAll("[data-star]");
    const textarea = document.getElementById("feedback");
    const count = document.getElementById("feedback-count");
    const submit = document.getElementById("submit-feedback");
    const top = document.getElementById("back-top");

    function toast(message) {
      if (view.SixQDevice) view.SixQDevice.toast(message);
    }
    function setRating(rating) {
      stars.forEach((star, index) => star.classList.toggle("is-active", index < rating));
    }

    tabs.forEach((tab) => tab.addEventListener("click", () => {
      const key = tab.dataset.tab;
      tabs.forEach((item) => item.classList.toggle("is-active", item === tab));
      panels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.panel === key));
    }));
    stars.forEach((star) => star.addEventListener("click", () => setRating(Number(star.dataset.star))));
    textarea.addEventListener("input", () => { count.textContent = textarea.value.length; });
    submit.addEventListener("click", () => {
      toast("感谢反馈");
      textarea.value = "";
      count.textContent = "0";
      setRating(0);
    });
    top.addEventListener("click", () => scroll.scrollTo({ top: 0, behavior: "smooth" }));
    document.querySelectorAll("[data-stub]").forEach((item) => item.addEventListener("click", () => toast(item.dataset.stub)));
  }

  return { getStarState, mount };
});
