/**
 * H5 入口分流（授权后）
 *
 * 逻辑注释：
 * 1) 若进度 status=composing（已生图、尚未点「确认并查看解读」）：
 *    下次从入口进来仍进入成图页 journey-canvas（resume），直到用户主动查看解读。
 * 2) status=completed → 直达结果页。
 * 3) 否则走引导页开始/继续一轮测评。
 * 4) 重新测试次数等额度按授权手机号维度统计，见 h5-progress.js（非本页职责）。
 */
(function () {
  const tip = document.getElementById("h5-entry-tip");
  const params = new URLSearchParams(location.search);
  const justAuthed = params.get("authed") === "1";

  // 非「刚授权回来」：清会话并进入授权页（每次扫码/打开都要授权）
  if (!justAuthed) {
    if (window.H5Auth) window.H5Auth.clearSession();
    location.replace("login.html");
    return;
  }

  const session = window.H5Auth.requireLogin("login.html");
  if (!session) return;

  try {
    history.replaceState(null, "", "entry.html");
  } catch (e) {}

  const progress = window.H5Progress.get(session);
  const status = progress.status || "none";

  function go(url) {
    location.href = url;
  }

  if (status === "completed") {
    if (tip) tip.textContent = "检测到你已完成解读，正在进入结果页…";
    try {
      sessionStorage.setItem(
        "journeyPayload",
        JSON.stringify({
          figures: [],
          extras: [],
          userText: progress.lockedDesc || "",
          imageUrl: progress.imageUrl || "",
          description: progress.description || progress.lockedDesc || "",
          patternId: progress.patternId || "j04",
        })
      );
    } catch (e) {}
    setTimeout(() => go("journey-result.html"), 300);
    return;
  }

  // 已生图未解读：强制回到成图确认页（不再弹出可取消的确认框）
  if (status === "composing") {
    if (tip) tip.textContent = "你已生成旅程图，正在回到成图页…";
    setTimeout(() => go("journey-canvas.html?resume=1"), 300);
    return;
  }

  if (tip) tip.textContent = "授权成功，即将开始人生旅程…";
  setTimeout(() => go("journey-guide.html"), 400);
})();
