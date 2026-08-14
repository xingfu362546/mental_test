/**
 * 心画画板（演示）
 * 仅负责图形摆放交互；解读结果不依赖本文件计算结果（见 xinhua-patterns.js / 结果页演示条）。
 */
(function () {
  const board = document.getElementById("xh-board");
  const inspector = document.getElementById("xh-inspector");
  const sizeInput = document.getElementById("xh-size");
  const btnSubmit = document.getElementById("xh-submit");
  const btnDelete = document.getElementById("xh-delete");
  if (!board) return;

  const STROKE = { male: "#5b8def", female: "#e85a8c" };
  let figures = [];
  let selectedId = null;
  let drag = null;
  let seq = 0;

  function uid() {
    seq += 1;
    return "f" + seq;
  }

  function render() {
    board.innerHTML = "";
    figures.forEach((f) => {
      const el = document.createElement("div");
      el.className =
        "xh-figure xh-figure--" +
        f.gender +
        " xh-figure--outline" +
        (f.id === selectedId ? " is-selected" : "");
      el.dataset.id = f.id;
      el.style.left = f.x + "px";
      el.style.top = f.y + "px";
      el.style.width = f.size + "px";
      el.style.height = f.size + "px";
      el.style.borderColor = f.stroke || STROKE[f.gender] || "#5b8def";
      el.style.color = f.stroke || STROKE[f.gender] || "#5b8def";
      el.textContent = f.symbol || "";
      el.title = f.gender === "male" ? "男性 □" : "女性 ○";
      board.appendChild(el);
    });
    btnSubmit.disabled = figures.length < 1;
    syncInspector();
  }

  function syncInspector() {
    const f = figures.find((x) => x.id === selectedId);
    if (!f) {
      inspector.classList.remove("is-open");
      return;
    }
    inspector.classList.add("is-open");
    sizeInput.value = String(f.size);
    inspector.querySelectorAll("[data-symbol]").forEach((btn) => {
      btn.classList.toggle("is-on", btn.getAttribute("data-symbol") === (f.symbol || ""));
    });
  }

  function addFigure(gender) {
    const size = 56;
    const f = {
      id: uid(),
      gender,
      x: 40 + (figures.length % 4) * 28,
      y: 40 + Math.floor(figures.length / 4) * 28,
      size,
      stroke: STROKE[gender],
      symbol: "",
    };
    figures.push(f);
    selectedId = f.id;
    render();
  }

  document.getElementById("xh-add-male").addEventListener("click", () => addFigure("male"));
  document.getElementById("xh-add-female").addEventListener("click", () => addFigure("female"));

  board.addEventListener("pointerdown", (e) => {
    const t = e.target.closest(".xh-figure");
    if (!t) {
      selectedId = null;
      render();
      return;
    }
    const id = t.dataset.id;
    const f = figures.find((x) => x.id === id);
    if (!f) return;
    selectedId = id;
    const rect = board.getBoundingClientRect();
    drag = {
      id,
      ox: e.clientX - rect.left - f.x,
      oy: e.clientY - rect.top - f.y,
    };
    t.setPointerCapture(e.pointerId);
    render();
  });

  board.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const f = figures.find((x) => x.id === drag.id);
    if (!f) return;
    const rect = board.getBoundingClientRect();
    f.x = Math.max(0, Math.min(rect.width - f.size, e.clientX - rect.left - drag.ox));
    f.y = Math.max(0, Math.min(rect.height - f.size, e.clientY - rect.top - drag.oy));
    render();
  });

  board.addEventListener("pointerup", () => {
    drag = null;
  });

  sizeInput.addEventListener("input", () => {
    const f = figures.find((x) => x.id === selectedId);
    if (!f) return;
    f.size = Number(sizeInput.value);
    render();
  });

  inspector.querySelectorAll("[data-symbol]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const f = figures.find((x) => x.id === selectedId);
      if (!f) return;
      f.symbol = btn.getAttribute("data-symbol") || "";
      render();
    });
  });

  btnDelete.addEventListener("click", () => {
    figures = figures.filter((x) => x.id !== selectedId);
    selectedId = null;
    render();
  });

  btnSubmit.addEventListener("click", () => {
    if (figures.length < 1) {
      window.SixQDevice && SixQDevice.toast("请至少添加一位家庭成员");
      return;
    }
    if (btnSubmit.dataset.busy === "1") return;
    btnSubmit.dataset.busy = "1";
    btnSubmit.disabled = true;

    const modal = document.getElementById("xh-compose-modal");
    const tipEl = document.getElementById("xh-compose-tip");
    if (modal) modal.hidden = false;

    const tips = ["正在识别成员位置…", "正在整理远近与朝向…", "正在匹配探索线索…"];
    let tipIdx = 0;
    if (tipEl) tipEl.textContent = tips[0];
    const tipTimer = setInterval(() => {
      tipIdx = (tipIdx + 1) % tips.length;
      if (tipEl) tipEl.textContent = tips[tipIdx];
    }, 700);

    const delay = (window.XinhuaAIMock && window.XinhuaAIMock.COMPOSE_DELAY_MS) || 2200;
    setTimeout(() => {
      clearInterval(tipTimer);
      const composed =
        (window.XinhuaAIMock && window.XinhuaAIMock.composeBoard(figures)) || {
          imageUrl: null,
          description: "",
          patternId: "p01",
        };
      const audienceInfo = window.XinhuaPayload
        ? window.XinhuaPayload.readAudienceFromAge()
        : { audience: "adult" };
      const rect = board.getBoundingClientRect();
      const payload = window.XinhuaPayload
        ? window.XinhuaPayload.build({
            assessmentType: window.XinhuaPayload.ASSESSMENT.COMPOSITION,
            audience: audienceInfo.audience,
            figures: figures,
            extras: [],
            compose: {
              status: "done",
              imageUrl: null,
              description: composed.description,
              patternId: composed.patternId,
            },
            meta: {
              boardWidth: Math.round(rect.width),
              boardHeight: Math.round(rect.height),
            },
          })
        : { figures, compose: composed };

      if (window.XinhuaPayload) {
        window.XinhuaPayload.save("xinhuaPayload", payload);
      }
      try {
        sessionStorage.setItem("xinhuaFigures", JSON.stringify(figures));
      } catch (e) {}
      location.href = "xinhua-result.html";
    }, delay);
  });

  render();
})();
