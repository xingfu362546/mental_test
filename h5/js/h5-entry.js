(function () {
  const tip = document.getElementById("h5-entry-tip");
  const session = window.H5Auth.requireLogin("login.html");
  if (!session) return;

  const progress = window.H5Progress.get(session.userId);
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

  if (status === "composing") {
    if (tip) tip.textContent = "检测到未完成的测试…";
    const ok = window.confirm("你上次测试进行中（已生成旅程图）。是否继续测？");
    if (ok) {
      go("journey-canvas.html?resume=1");
    } else {
      if (tip) tip.textContent = "已取消。可关闭页面，或刷新本页再次选择。";
    }
    return;
  }

  if (tip) tip.textContent = "欢迎，" + session.phoneMasked + "。即将开始人生旅程…";
  setTimeout(() => go("journey-guide.html"), 400);
})();
