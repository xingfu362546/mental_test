/**
 * H5 旅程结果页
 * - 对用户：展示成图 + 探索文案；不展示模式类型名称
 * - 对智能体/进度：仍写入并保留 patternId（类型数据）
 */
(function () {
  const session = window.H5Auth && window.H5Auth.requireLogin("login.html");
  if (!session) return;

  const patterns = window.JourneyPatterns || [];
  const imgEl = document.getElementById("jh-compose-img");
  const descEl = document.getElementById("jh-desc");
  const nameEl = document.getElementById("jh-name");
  const arrangeEl = document.getElementById("jh-arrange");
  const posEl = document.getElementById("jh-positive");
  const watchEl = document.getElementById("jh-watch");
  const fbEl = document.getElementById("jh-feedback");

  const fallbackImage = "../assets/journey/journey-compose-demo.png";
  const fallbackDesc = "模型将你画板上的旅伴与风景串联成一幅完整旅途（原型固定演示图）。";
  const fallbackPatternId = "j04";

  let payload = null;
  try {
    payload = JSON.parse(sessionStorage.getItem("journeyPayload") || "null");
  } catch (e) {}

  const saved = window.H5Progress.get(session.userId);
  const imageUrl = (payload && payload.imageUrl) || saved.imageUrl || fallbackImage;
  const description =
    (payload && payload.description) || saved.description || saved.lockedDesc || fallbackDesc;
  const patternId = (payload && payload.patternId) || saved.patternId || fallbackPatternId;

  imgEl.src = imageUrl;
  descEl.textContent = description;

  function render(id) {
    const p = patterns.find((x) => x.id === id) || patterns[0];
    if (!p) return;
    // 类型名称不对用户展示；DOM 可保留空/隐藏，供调试或后续智能体侧读取
    if (nameEl) {
      nameEl.textContent = "";
      nameEl.hidden = true;
      nameEl.setAttribute("data-pattern-id", p.id || id);
    }
    arrangeEl.textContent = p.arrange || "—";
    posEl.textContent = p.positive || "—";
    watchEl.textContent = p.watch || "—";
    // 开放式反馈不点名模式类型，避免用户看到类型标签
    fbEl.textContent =
      p.feedbackNoType ||
      (p.feedback
        ? String(p.feedback).replace(/「[^」]+」/g, "这段旅程安排")
        : "结合你的完整旅程图与描述，可以对照下面的探索线索，再结合真实感受与生活核实。这不是心理诊断。");
  }

  render(patternId);

  // 进度/智能体侧仍保留类型 patternId
  window.H5Progress.set(session.userId, {
    status: "completed",
    lockedDesc: saved.lockedDesc || (payload && payload.userText) || "",
    imageUrl: imageUrl,
    patternId: patternId,
    description: description,
    genCount: saved.genCount || 0,
  });

  const btnShare = document.getElementById("h5-share");
  const btnRetest = document.getElementById("h5-retest");

  if (btnShare) {
    btnShare.addEventListener("click", () => {
      const shareUrl = location.href.split("?")[0].replace(/journey-result\.html.*/, "entry.html");
      const shareText = "我完成了心画·人生旅程测评，一起来看看你的旅程安排吧";
      if (navigator.share) {
        navigator
          .share({ title: "心画测评·人生旅程", text: shareText, url: shareUrl })
          .catch(function () {
            SixQDevice.toast("已取消分享");
          });
        return;
      }
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(shareUrl).then(
            function () {
              SixQDevice.toast("分享链接已复制（演示）");
            },
            function () {
              SixQDevice.toast("请长按复制链接分享（演示）");
            }
          );
          return;
        }
      } catch (e) {}
      SixQDevice.toast("请长按复制链接分享（演示）");
    });
  }

  if (btnRetest) {
    btnRetest.addEventListener("click", () => {
      const ok = window.confirm("重新测试将清空当前解读进度，是否继续？");
      if (!ok) return;
      window.H5Progress.clear(session.userId);
      try {
        sessionStorage.removeItem("journeyPayload");
      } catch (e) {}
      location.href = "journey-guide.html";
    });
  }
})();
