/**
 * 心画结果页
 * 统一 payload → 回放画板 + 默认 patternId；演示条仍可切换 12 模。
 */
(function () {
  const patterns = window.XinhuaPatterns || [];
  const select = document.getElementById("xh-pattern-select");
  const nameEl = document.getElementById("xh-pattern-name");
  const observeEl = document.getElementById("xh-observe");
  const hypoEl = document.getElementById("xh-hypo");
  const questionEl = document.getElementById("xh-question");
  const actionEl = document.getElementById("xh-action");
  const childNote = document.getElementById("xh-child-note");
  const descEl = document.getElementById("xh-compose-desc");
  const preview = document.getElementById("xh-board-preview");
  const previewEmpty = document.getElementById("xh-board-preview-empty");

  const payload = window.XinhuaPayload
    ? window.XinhuaPayload.load("xinhuaPayload")
    : null;
  const audienceInfo = window.XinhuaPayload
    ? window.XinhuaPayload.readAudienceFromAge()
    : { isChild: false };

  const isChild =
    (payload && payload.audience === "child") || audienceInfo.isChild;
  if (childNote) childNote.hidden = !isChild;

  if (descEl) {
    descEl.textContent =
      (payload && payload.compose && payload.compose.description) ||
      "未找到构图理解结果。";
  }

  let figures = (payload && payload.figures) || [];
  if (!figures.length) {
    try {
      figures = JSON.parse(sessionStorage.getItem("xinhuaFigures") || "[]");
    } catch (e) {
      figures = [];
    }
  }

  function renderBoardPreview() {
    if (!preview) return;
    preview.innerHTML = "";
    if (!figures.length) {
      if (previewEmpty) previewEmpty.hidden = false;
      preview.classList.add("is-empty");
      return;
    }
    if (previewEmpty) previewEmpty.hidden = true;
    preview.classList.remove("is-empty");

    const srcW = (payload && payload.meta && payload.meta.boardWidth) || 320;
    const srcH = (payload && payload.meta && payload.meta.boardHeight) || 240;
    const rect = preview.getBoundingClientRect();
    const dstW = rect.width || 320;
    const dstH = rect.height || 220;
    const sx = dstW / srcW;
    const sy = dstH / srcH;

    const STROKE = { male: "#5b8def", female: "#e85a8c" };
    figures.forEach((f) => {
      const el = document.createElement("div");
      el.className =
        "xh-figure xh-figure--" +
        (f.gender || "male") +
        " xh-figure--outline is-readonly";
      const size = Math.max(28, Math.round((f.size || 56) * Math.min(sx, sy)));
      const stroke =
        f.stroke || f.color || STROKE[f.gender] || STROKE.male;
      el.style.left = Math.round((f.x || 0) * sx) + "px";
      el.style.top = Math.round((f.y || 0) * sy) + "px";
      el.style.width = size + "px";
      el.style.height = size + "px";
      el.style.borderColor = stroke;
      el.style.color = stroke;
      el.style.background = "transparent";
      el.textContent = f.symbol || "";
      el.title = f.gender === "female" ? "女性 ○" : "男性 □";
      preview.appendChild(el);
    });
  }

  patterns.forEach((p, i) => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = i + 1 + ". " + p.name;
    select.appendChild(opt);
  });

  function render(id) {
    const p = patterns.find((x) => x.id === id) || patterns[0];
    if (!p) return;
    select.value = p.id;
    nameEl.textContent = p.name;
    observeEl.textContent = p.observe || "";
    hypoEl.textContent = p.hypothesis || "";
    questionEl.textContent = p.question || "";
    actionEl.textContent = p.action || "";
  }

  select.addEventListener("change", () => render(select.value));

  const defaultId =
    (payload && payload.compose && payload.compose.patternId) ||
    (patterns[0] && patterns[0].id) ||
    "";
  render(defaultId);

  // 等布局完成后再按预览板尺寸缩放
  requestAnimationFrame(() => {
    renderBoardPreview();
    setTimeout(renderBoardPreview, 50);
  });
  window.addEventListener("resize", renderBoardPreview);

  document.querySelectorAll(".js-stub").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      window.SixQDevice && SixQDevice.toast("即将开放");
    });
  });
})();
