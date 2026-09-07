/**
 * H5 · 人生旅程漫画引导（资源路径相对 ../assets）
 */
(function () {
  if (window.H5Auth && !window.H5Auth.requireLogin("login.html")) return;

  const PAGES = [
    {
      title: "旅行就要开始了",
      body: "有一天，你准备去一个很远的地方旅行。路上可能会遇到不同的天气、道路和困难。",
      img: "../assets/journey/journey-panel-01-depart.png",
      alt: "远行启程插画",
    },
    {
      title: "四位旅伴",
      body: "你需要带着一只猴子、一只小鸟、一个背包和一条蛇一起到达目的地——它们都不能被丢下。",
      img: "../assets/journey/journey-panel-02-companions.png",
      alt: "四位旅伴插画",
    },
    {
      title: "一起上路",
      body: "谁走在前面、谁靠得更近、谁背着谁……请按你的第一直觉，用话语描述这段旅程。",
      img: "../assets/journey/journey-panel-03-travel.png",
      alt: "同行旅途插画",
    },
    {
      title: "用语音画出旅程",
      body: "接下来用语音或文字讲清安排；系统会校验四位旅伴是否都在描述里。",
      howto: true,
      img: "../assets/journey/journey-scene-lawn-board.png",
      alt: "草坪画板与操作指引",
    },
  ];

  const stage = document.getElementById("jh-comic-stage");
  const progress = document.getElementById("jh-comic-progress");
  const btnPrev = document.getElementById("jh-comic-prev");
  const btnNext = document.getElementById("jh-comic-next");
  const btnStart = document.getElementById("jh-comic-start");
  let index = 0;

  function render() {
    const p = PAGES[index];
    progress.textContent = index + 1 + " / " + PAGES.length;

    let howtoHtml = "";
    if (p.howto) {
      howtoHtml =
        '<ul class="jh-howto">' +
        "<li>用<strong>语音或文字</strong>描述旅程，须包含<strong>猴子、小鸟、背包、蛇</strong></li>" +
        "<li>缺少任一元素会在本页提示补全</li>" +
        "<li>确认描述后生成旅程图（本版不支持重新生图），然后进入解读</li>" +
        "<li>每人最多重新测试 3 次</li>" +
        "</ul>" +
        '<p class="jh-howto-note">没有标准答案。反馈仅供自我觉察，不作为心理诊断。</p>';
    }

    stage.innerHTML =
      '<article class="jh-comic-panel is-enter">' +
      '<div class="jh-comic-art"><img src="' +
      p.img +
      '" alt="' +
      p.alt +
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

  btnPrev.addEventListener("click", () => {
    if (index <= 0) return;
    index -= 1;
    render();
  });

  btnNext.addEventListener("click", () => {
    if (index >= PAGES.length - 1) return;
    index += 1;
    render();
  });

  render();
})();
