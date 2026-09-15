/**
 * H5 · 人生旅程漫画引导（资源路径相对 ../assets）
 */
(function () {
  if (window.H5Auth && !window.H5Auth.requireLogin("login.html")) return;

  const PAGES = [
    {
      title: "人生旅程心画探索",
      body:
        "欢迎参加「人生旅程心画探索」。这是一项体验式、象征性的自我探索活动，不是专业心理测验。AI 回复仅提供自我观察线索，不用于心理诊断、人格判断或家庭关系评定。请避免在回答中输入真实姓名、住址、单位等个人信息。您可以随时退出。",
      img: "../assets/journey/journey-panel-01-depart.png",
      alt: "远行启程插画",
    },
    {
      title: "旅行就要开始了",
      body:
        "有一天，您准备去一个很远的地方旅行。路上可能会遇到不同的天气、道路和困难。您需要带着一只猴子、一只小鸟、一个背包和一条蛇一起到达目的地，它们都不能被丢下。请按第一感觉，说说您会怎样安排自己和它们一起出发。",
      img: "../assets/journey/journey-panel-02-companions.png",
      alt: "四位旅伴插画",
    },
    {
      title: "一起上路",
      body:
        "您可以说说：谁走在前面？谁在您身边？谁负责背包？小鸟、猴子和蛇怎样行动？您在旅程中有什么感受？没有标准答案，结果仅自己可见。",
      img: "../assets/journey/journey-panel-03-travel.png",
      alt: "同行旅途插画",
    },
    {
      title: "用语音或文字描述",
      body: "接下来用语音或文字讲清安排；须包含四位旅伴。请勿填写可识别个人身份的信息。",
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
        "<li>确认描述后生成心画（画面仅为描述的模拟呈现），然后查看探索提示</li>" +
        "<li>请勿填写真实姓名、电话、住址等可识别身份的信息</li>" +
        "<li>每位参与者仅可完成一次探索（不提供重新测试）</li>" +
        "</ul>" +
        '<p class="jh-howto-note">没有标准答案。AI 反馈仅为探索性提示，不代表对性格、心理状态或家庭关系作出判断。</p>';
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
