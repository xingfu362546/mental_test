/**
 * 关系空间构图 · 漫画翻页引导（不可跳过，末页 CTA「开始心画」）
 */
(function () {
  const info = window.XinhuaPayload
    ? window.XinhuaPayload.readAudienceFromAge()
    : { audience: "adult", isChild: false };
  const pack = (window.XinhuaComicCopy || {})[info.isChild ? "child" : "adult"] || {};
  const PAGES = pack.pages || [];

  const stage = document.getElementById("xh-comic-stage");
  const progress = document.getElementById("xh-comic-progress");
  const audience = document.getElementById("xh-audience");
  const btnPrev = document.getElementById("xh-comic-prev");
  const btnNext = document.getElementById("xh-comic-next");
  const btnStart = document.getElementById("xh-comic-start");
  let index = 0;

  if (audience) {
    audience.textContent = info.isChild
      ? "当前：儿童 / 青少年版引导"
      : "当前：成人版引导" + (info.age == null ? "（未填年龄，默认成人）" : "");
  }

  function render() {
    if (!PAGES.length) {
      stage.innerHTML = "<p class='jh-lead'>引导文案缺失</p>";
      return;
    }
    const p = PAGES[index];
    progress.textContent = index + 1 + " / " + PAGES.length;

    let howtoHtml = "";
    if (p.howto) {
      const items = (p.howtoItems || [])
        .map(function (t) {
          return "<li>" + t + "</li>";
        })
        .join("");
      howtoHtml =
        '<ul class="jh-howto">' +
        items +
        "</ul>" +
        '<p class="jh-howto-note">没有标准答案。反馈仅供自我觉察，不作为心理诊断。</p>';
    }

    stage.innerHTML =
      '<article class="jh-comic-panel is-enter">' +
      '<div class="jh-comic-art"><img src="' +
      p.img +
      '" alt="' +
      (p.alt || "") +
      '" /></div>' +
      '<div class="jh-comic-caption">' +
      "<h2>" +
      p.title +
      "</h2>" +
      (p.body ? "<p>" + p.body + "</p>" : "") +
      howtoHtml +
      "</div></article>";

    const last = index === PAGES.length - 1;
    btnPrev.disabled = index === 0;
    btnNext.hidden = last;
    btnStart.hidden = !last;
  }

  btnPrev.addEventListener("click", function () {
    if (index <= 0) return;
    index -= 1;
    render();
  });

  btnNext.addEventListener("click", function () {
    if (index >= PAGES.length - 1) return;
    index += 1;
    render();
  });

  render();
})();
