(function () {
  const patterns = window.JourneyPatterns || [];
  const imgEl = document.getElementById("jh-compose-img");
  const descEl = document.getElementById("jh-desc");
  const nameEl = document.getElementById("jh-theme") || document.getElementById("jh-name");
  const arrangeEl = document.getElementById("jh-arrange");
  const posEl = document.getElementById("jh-positive");
  const watchEl = document.getElementById("jh-watch");
  const fbEl = document.getElementById("jh-feedback");

  const fallbackImage = "assets/journey/journey-compose-demo.png";
  const fallbackDesc =
    "模型将你画板上的旅伴与风景串联成一幅完整旅途（原型固定演示图）。";
  const fallbackPatternId = "j04";

  let payload = null;
  try {
    payload = JSON.parse(sessionStorage.getItem("journeyPayload") || "null");
  } catch (e) {}

  const imageUrl = (payload && payload.imageUrl) || fallbackImage;
  const description = (payload && payload.description) || fallbackDesc;
  const patternId = (payload && payload.patternId) || fallbackPatternId;

  imgEl.src = imageUrl;
  descEl.textContent = description;

  function render(id) {
    const p = patterns.find((x) => x.id === id) || patterns[0];
    if (!p) return;
    // 前台展示参与者呈现主题；不展示后台模式名
    nameEl.textContent = p.frontTheme || p.name || "—";
    if (nameEl.setAttribute) nameEl.setAttribute("data-pattern-id", p.id || id);
    arrangeEl.textContent = p.arrange || "—";
    posEl.textContent = p.positive || "—";
    watchEl.textContent = p.watch || "—";
    fbEl.textContent =
      p.feedbackNoType ||
      p.feedback ||
      "结合你的完整旅程图与描述，可以对照下面的探索线索，再结合真实感受与生活核实。这不是心理诊断。";
  }

  render(patternId);

  document.querySelectorAll(".js-stub").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      SixQDevice.toast("即将开放");
    });
  });
})();
