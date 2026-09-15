/**
 * H5 人生旅程结果页
 *
 * 逻辑注释（产品口径）：
 * 1) 不向用户展示后台模式类型名；展示 frontTheme（参与者呈现主题）。
 *    patternId / name 仍写入进度供智能体使用。
 * 2) 每人仅可测试一次，不提供重新测试；结果页用「去6Q超级爸妈查看更多测评」替代用尽/重测按钮。
 *    进度仍按「授权手机号」维度落库。
 * 3) 「分享转发」= 转发微信小程序卡片（参考会话里小程序分享卡：顶栏名称/图标、标题 title、封面 imageUrl、底栏「小程序」）；
 *    正式对接 onShareAppMessage / open-type=share，返回 { title, path, imageUrl }；
 *    本 H5 原型仅 toast 占位，不走系统分享链接。
 */
(function () {
  const session = window.H5Auth && window.H5Auth.requireLogin("login.html");
  if (!session) return;

  const patterns = window.JourneyPatterns || [];
  const imgEl = document.getElementById("jh-compose-img");
  const descEl = document.getElementById("jh-desc");
  const nameEl = document.getElementById("jh-name");
  const themeEl = document.getElementById("jh-theme");
  const arrangeEl = document.getElementById("jh-arrange");
  const posEl = document.getElementById("jh-positive");
  const watchEl = document.getElementById("jh-watch");
  const fbEl = document.getElementById("jh-feedback");

  const fallbackImage = "../assets/journey/journey-compose-demo.png";
  const fallbackDesc =
    "\u6a21\u578b\u5c06\u4f60\u753b\u677f\u4e0a\u7684\u65c5\u4f34\u4e0e\u98ce\u666f\u4e32\u8054\u6210\u4e00\u5e45\u5b8c\u6574\u65c5\u9014\uff08\u539f\u578b\u56fa\u5b9a\u6f14\u793a\u56fe\uff09\u3002";
  const fallbackPatternId = "j04";

  // 小程序转发卡片字段（对齐 onShareAppMessage；封面正式应用测评/活动海报）
  const MP_SHARE = {
    title: "\u5fc3\u753b\u6d4b\u8bc4\u00b7\u4eba\u751f\u65c5\u7a0b",
    path: "/pages/journey/entry",
    imageUrl: "",
  };

  let payload = null;
  try {
    payload = JSON.parse(sessionStorage.getItem("journeyPayload") || "null");
  } catch (e) {}

  const saved = window.H5Progress.get(session);
  const imageUrl = (payload && payload.imageUrl) || saved.imageUrl || fallbackImage;
  const description =
    (payload && payload.description) || saved.description || saved.lockedDesc || fallbackDesc;
  const patternId = (payload && payload.patternId) || saved.patternId || fallbackPatternId;

  imgEl.src = imageUrl;
  descEl.textContent = description;

  function stripTypeName(text) {
    if (!text) return text;
    return String(text).replace(/\u300c[^\u300d]+\u300d/g, "\u8fd9\u6bb5\u65c5\u7a0b\u5b89\u6392");
  }

  function render(id) {
    const p = patterns.find((x) => x.id === id) || patterns[0];
    if (!p) return;
    // 前台：只展示参与者呈现主题；后台类型名隐藏
    if (themeEl) {
      themeEl.textContent = p.frontTheme || "旅程中的探索主题";
      themeEl.setAttribute("data-pattern-id", p.id || id);
    }
    if (nameEl) {
      nameEl.textContent = "";
      nameEl.hidden = true;
      nameEl.setAttribute("data-pattern-id", p.id || id);
      nameEl.setAttribute("data-pattern-name", p.name || "");
    }
    arrangeEl.textContent = p.arrange || "\u2014";
    posEl.textContent = p.positive || "\u2014";
    watchEl.textContent = p.watch || "\u2014";
    fbEl.textContent =
      p.feedbackNoType ||
      stripTypeName(p.feedback) ||
      "\u7ed3\u5408\u4f60\u7684\u5b8c\u6574\u65c5\u7a0b\u56fe\u4e0e\u63cf\u8ff0\uff0c\u53ef\u4ee5\u5bf9\u7167\u4e0b\u9762\u7684\u63a2\u7d22\u7ebf\u7d22\uff0c\u518d\u7ed3\u5408\u771f\u5b9e\u611f\u53d7\u4e0e\u751f\u6d3b\u6838\u5b9e\u3002\u8fd9\u4e0d\u662f\u5fc3\u7406\u8bca\u65ad\u3002";
  }

  render(patternId);

  window.H5Progress.set(session, {
    status: "completed",
    lockedDesc: saved.lockedDesc || (payload && payload.userText) || "",
    imageUrl: imageUrl,
    patternId: patternId,
    description: description,
    genCount: saved.genCount || 1,
    retestCount: saved.retestCount || 0,
  });

  const btnShare = document.getElementById("h5-share");
  if (btnShare) {
    btnShare.addEventListener("click", () => {
      void MP_SHARE;
      SixQDevice.toast(
        "\u8bf7\u4f7f\u7528\u5c0f\u7a0b\u5e8f\u300c\u8f6c\u53d1\u300d\u5206\u4eab\u7ed9\u597d\u53cb\uff08\u539f\u578b\u5360\u4f4d\uff09"
      );
    });
  }
})();
