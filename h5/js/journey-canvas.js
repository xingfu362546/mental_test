/**
 * H5 人生旅程画板：语音/文字 → 同页校验 → 直接成图；写入 H5Progress；支持 resume
 * （H5-v1.0.1：去掉中间「请确认旅程描述」页）
 */
(function () {
  const session = window.H5Auth && window.H5Auth.requireLogin("login.html");
  if (!session) return;

  if (window.JourneyAIMock) {
    window.JourneyAIMock.DEMO_IMAGE = "../assets/journey/journey-compose-demo.png";
  }

  const MAX_GEN = 3;
  const HOLD_MS = 300;
  const MAX_HOLD_MS = 15000;
  const CANCEL_DY = 56;

  const descInput = document.getElementById("jh-desc-input");
  const missEl = document.getElementById("jh-miss");
  const btnCheck = document.getElementById("jh-check");
  const checkWrap = document.getElementById("jh-check-wrap");
  const interpretEl = document.getElementById("jh-interpret");
  const typeToggle = document.getElementById("jh-type-toggle");
  const stepInput = document.getElementById("jh-step-input");
  const stepConfirmImg = document.getElementById("jh-step-confirm-img");
  const btnRegen = document.getElementById("jh-regen");
  const btnNext = document.getElementById("jh-next");
  const regenLeftEl = document.getElementById("jh-regen-left");

  const boardEmpty = document.getElementById("jh-board-empty");
  const boardWait = document.getElementById("jh-board-wait");
  const boardWaitTip = document.getElementById("jh-board-wait-tip");
  const boardImg = document.getElementById("jh-board-img");

  const micBtn = document.getElementById("jh-mic");
  const holdOverlay = document.getElementById("jh-hold-overlay");
  const holdCard = document.getElementById("jh-hold-card");
  const holdTitle = document.getElementById("jh-hold-title");
  const holdTip = document.getElementById("jh-hold-tip");
  const holdTime = document.getElementById("jh-hold-time");

  let lockedDesc = "";
  let genCount = 0;
  let composePayload = null;
  let generating = false;
  let hold = null;
  let hasInterpret = false;

  function syncCheckVisibility() {
    const hasText = !!(descInput && descInput.value.trim());
    if (interpretEl) interpretEl.hidden = !(hasInterpret || hasText);
    if (checkWrap) checkWrap.hidden = !(hasInterpret && hasText);
    if (typeToggle) typeToggle.hidden = hasInterpret || hasText;
  }

  function revealInterpret(fromVoice) {
    hasInterpret = true;
    if (interpretEl) {
      interpretEl.hidden = false;
      const headStrong = interpretEl.querySelector(".jh-h5-interpret__head strong");
      if (headStrong) headStrong.textContent = fromVoice ? "语音解读结果" : "文字描述";
    }
    syncCheckVisibility();
  }

  if (typeToggle) {
    typeToggle.addEventListener("click", () => {
      revealInterpret(false);
      if (descInput) descInput.focus();
    });
  }

  if (descInput) {
    descInput.addEventListener("input", () => {
      if (!hasInterpret && descInput.value.trim()) {
        revealInterpret(false);
      } else {
        syncCheckVisibility();
      }
    });
  }

  function saveComposing() {
    window.H5Progress.set(session.userId, {
      status: "composing",
      lockedDesc: lockedDesc,
      imageUrl: composePayload ? composePayload.imageUrl : "",
      patternId: composePayload ? composePayload.patternId : "",
      description: lockedDesc,
      genCount: genCount,
    });
  }

  function regenLeft() {
    return Math.max(0, MAX_GEN - genCount);
  }

  function syncRegenUI() {
    const left = regenLeft();
    if (regenLeftEl) regenLeftEl.textContent = String(left);
    btnRegen.disabled = left <= 0 || generating || !composePayload;
  }

  function showStep(which) {
    stepInput.hidden = which !== "input";
    stepConfirmImg.hidden = which !== "confirmImg";
  }

  function setBoardState(state) {
    boardEmpty.hidden = state !== "empty";
    boardWait.hidden = state !== "wait";
    boardImg.hidden = state !== "img";
  }

  function runGenerate() {
    if (generating) return;
    if (!lockedDesc) return;
    if (genCount >= MAX_GEN) {
      SixQDevice.toast("重新生成次数已用尽");
      return;
    }
    generating = true;
    syncRegenUI();
    if (btnCheck) btnCheck.disabled = true;
    setBoardState("wait");
    const tips = ["正在理解旅程描述…", "正在安排四位旅伴…", "正在绘制完整旅途…"];
    let tipIdx = 0;
    boardWaitTip.textContent = tips[0];
    const tipTimer = setInterval(() => {
      tipIdx = (tipIdx + 1) % tips.length;
      boardWaitTip.textContent = tips[tipIdx];
    }, 700);

    const delay = (window.JourneyAIMock && window.JourneyAIMock.COMPOSE_DELAY_MS) || 2600;
    setTimeout(() => {
      clearInterval(tipTimer);
      genCount += 1;
      composePayload = window.JourneyAIMock.composeBoard([]);
      composePayload.description = lockedDesc;
      boardImg.src = composePayload.imageUrl;
      setBoardState("img");
      generating = false;
      if (btnCheck) btnCheck.disabled = false;
      showStep("confirmImg");
      syncRegenUI();
      saveComposing();
      SixQDevice.toast(genCount === 1 ? "旅程图已生成" : "已重新生成旅程图");
    }, delay);
  }

  btnCheck.addEventListener("click", () => {
    const text = descInput.value.trim();
    const result = window.JourneyVoiceMock.validateRequired(text);
    if (!text) {
      missEl.hidden = false;
      missEl.textContent = "请先用语音或文字描述你的旅程。";
      return;
    }
    if (!result.ok) {
      missEl.hidden = false;
      missEl.textContent =
        "描述缺少：" +
        result.missing.map((m) => m.label).join("、") +
        "。请在本页补充后再确认。";
      SixQDevice.toast("缺少 " + result.missing.map((m) => m.label).join("、"));
      return;
    }
    missEl.hidden = true;
    lockedDesc = text;
    runGenerate();
  });

  btnRegen.addEventListener("click", () => {
    if (regenLeft() <= 0) {
      SixQDevice.toast("重新生成次数已用尽");
      return;
    }
    runGenerate();
  });

  btnNext.addEventListener("click", () => {
    if (!composePayload) {
      SixQDevice.toast("请先生成并确认旅程图");
      return;
    }
    try {
      sessionStorage.setItem(
        "journeyPayload",
        JSON.stringify({
          figures: [],
          extras: [],
          userText: lockedDesc,
          imageUrl: composePayload.imageUrl,
          description: lockedDesc,
          patternId: composePayload.patternId,
        })
      );
    } catch (e) {}
    window.H5Progress.set(session.userId, {
      status: "completed",
      lockedDesc: lockedDesc,
      imageUrl: composePayload.imageUrl,
      patternId: composePayload.patternId,
      description: lockedDesc,
      genCount: genCount,
    });
    location.href = "journey-result.html";
  });

  function clearHoldTimers() {
    if (!hold) return;
    if (hold.armTimer) clearTimeout(hold.armTimer);
    if (hold.tickTimer) clearInterval(hold.tickTimer);
    if (hold.maxTimer) clearTimeout(hold.maxTimer);
  }

  function setCancelUI(on) {
    holdCard.classList.toggle("is-cancel", !!on);
    holdTitle.textContent = on ? "松开取消" : "正在听取…";
    holdTip.textContent = on ? "松手将取消本次语音" : "上滑取消";
  }

  function fillFromVoiceDemo() {
    descInput.value = window.JourneyVoiceMock.randomSampleOk();
    missEl.hidden = true;
    revealInterpret(true);
    SixQDevice.toast("语音解读已生成，请确认后校验");
  }

  function endHold(opts) {
    if (!hold) return;
    const state = hold;
    clearHoldTimers();
    hold = null;
    micBtn.classList.remove("is-holding");
    holdOverlay.hidden = true;
    setCancelUI(false);
    try {
      if (state.pointerId != null) micBtn.releasePointerCapture(state.pointerId);
    } catch (e) {}
    if (opts && opts.cancelled) {
      SixQDevice.toast("已取消");
      return;
    }
    fillFromVoiceDemo();
  }

  function startRecordingVisual() {
    if (!hold || hold.recording) return;
    hold.recording = true;
    hold.startedAt = Date.now();
    micBtn.classList.add("is-holding");
    holdOverlay.hidden = false;
    setCancelUI(false);
    holdTime.textContent = "0s";
    hold.tickTimer = setInterval(() => {
      if (!hold || !hold.startedAt) return;
      holdTime.textContent = Math.floor((Date.now() - hold.startedAt) / 1000) + "s";
    }, 200);
    hold.maxTimer = setTimeout(() => endHold({ cancelled: false }), MAX_HOLD_MS);
  }

  micBtn.addEventListener("pointerdown", (e) => {
    if (micBtn.disabled || !stepInput || stepInput.hidden) return;
    if (e.button != null && e.button !== 0) return;
    e.preventDefault();
    clearHoldTimers();
    hold = {
      pointerId: e.pointerId,
      startY: e.clientY,
      recording: false,
      cancel: false,
      armTimer: null,
      tickTimer: null,
      maxTimer: null,
      startedAt: 0,
    };
    try {
      micBtn.setPointerCapture(e.pointerId);
    } catch (err) {}
    hold.armTimer = setTimeout(startRecordingVisual, HOLD_MS);
  });

  micBtn.addEventListener("pointermove", (e) => {
    if (!hold || hold.pointerId !== e.pointerId || !hold.recording) return;
    const cancel = hold.startY - e.clientY >= CANCEL_DY;
    if (cancel !== hold.cancel) {
      hold.cancel = cancel;
      setCancelUI(cancel);
    }
  });

  function onPointerUp(e) {
    if (!hold || (e.pointerId != null && hold.pointerId !== e.pointerId)) return;
    const wasRecording = hold.recording;
    const cancelled = !!hold.cancel;
    if (!wasRecording) {
      endHold({ cancelled: false });
      return;
    }
    endHold({ cancelled: cancelled });
  }

  micBtn.addEventListener("pointerup", onPointerUp);
  micBtn.addEventListener("pointercancel", () => {
    if (hold) endHold({ cancelled: true });
  });

  // resume：从进度恢复已生图状态
  const params = new URLSearchParams(location.search);
  const saved = window.H5Progress.get(session.userId);
  if ((params.get("resume") === "1" || saved.status === "composing") && saved.imageUrl && saved.lockedDesc) {
    lockedDesc = saved.lockedDesc;
    genCount = saved.genCount || 1;
    composePayload = {
      imageUrl: saved.imageUrl,
      description: saved.lockedDesc,
      patternId: saved.patternId || "j04",
    };
    descInput.value = lockedDesc;
    boardImg.src = composePayload.imageUrl;
    setBoardState("img");
    showStep("confirmImg");
    syncRegenUI();
  } else {
    showStep("input");
    setBoardState("empty");
    syncRegenUI();
    syncCheckVisibility();
  }
})();
