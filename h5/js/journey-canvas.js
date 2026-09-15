/**
 * H5 人生旅程画板：语音/文字 → 同页校验 → 成图一次（不支持重新生图）
 *
 * 逻辑注释：
 * 1) 生图成功后进度 status=composing；用户未点「确认并查看解读」前，
 *    下次从入口进来仍回到本页（resume），直到主动查看解读。
 * 2) 进度读写按授权手机号维度（传入 H5Auth session，见 H5Progress）。
 * 3) 本页不提供「重新生成」；重新测试在结果页按手机号限额处理。
 */
(function () {
  const session = window.H5Auth && window.H5Auth.requireLogin("login.html");
  if (!session) return;

  if (window.JourneyAIMock) {
    window.JourneyAIMock.DEMO_IMAGE = "../assets/journey/journey-compose-demo.png";
  }

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
  const btnNext = document.getElementById("jh-next");

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
  const riskOverlay = document.getElementById("jh-risk-overlay");
  const riskBody = document.getElementById("jh-risk-body");
  const riskDev = document.getElementById("jh-risk-dev");
  const btnRiskHelp = document.getElementById("jh-risk-help");
  const btnRiskExit = document.getElementById("jh-risk-exit");
  const btnDemoRisk = document.getElementById("jh-demo-risk");

  let lockedDesc = "";
  let composePayload = null;
  let generating = false;
  let hold = null;
  let hasInterpret = false;
  /** @type {ReturnType<typeof window.JourneyVoiceMock.detectRisk>|null} */
  let lastRiskPayload = null;

  /**
   * E：敏感命中 → 写入开发字段 + 弹出温馨提示，停止一般成图/解读。
   * 开发可读字段：risk_flag / risk_categories / stop_general_analysis
   */
  function publishRisk(payload) {
    lastRiskPayload = payload;
    try {
      sessionStorage.setItem("journeyRiskPayload", JSON.stringify(payload));
    } catch (e) {}
    if (window.console && console.info) {
      console.info("[journeyRiskPayload]", payload);
    }
  }

  function showRiskTip(payload) {
    publishRisk(payload);
    if (riskBody) riskBody.textContent = payload.tip_body || "";
    if (riskDev) {
      riskDev.hidden = false;
      riskDev.textContent =
        "开发字段 journeyRiskPayload：" +
        JSON.stringify({
          risk_flag: payload.risk_flag,
          risk_categories: payload.risk_categories,
          stop_general_analysis: payload.stop_general_analysis,
          matched_terms: payload.matched_terms,
        });
    }
    if (riskOverlay) riskOverlay.hidden = false;
  }

  function hideRiskTip() {
    if (riskOverlay) riskOverlay.hidden = true;
  }

  /** @returns {boolean} true=命中敏感，应中断后续一般流程 */
  function guardRisk(text) {
    const payload = window.JourneyVoiceMock.detectRisk(text);
    if (!payload.risk_flag) {
      lastRiskPayload = null;
      try {
        sessionStorage.removeItem("journeyRiskPayload");
      } catch (e) {}
      return false;
    }
    showRiskTip(payload);
    SixQDevice.toast("已暂停一般解析");
    return true;
  }

  if (btnRiskHelp) {
    btnRiskHelp.addEventListener("click", () => {
      SixQDevice.toast("请拨打当地心理援助热线或紧急救援电话（原型占位）");
    });
  }
  if (btnRiskExit) {
    btnRiskExit.addEventListener("click", () => {
      hideRiskTip();
      SixQDevice.toast("已暂停本次探索，您可随时离开");
      location.href = "entry.html";
    });
  }
  if (btnDemoRisk) {
    btnDemoRisk.addEventListener("click", () => {
      const sample = window.JourneyVoiceMock.sampleRisk();
      if (descInput) descInput.value = sample;
      missEl.hidden = true;
      revealInterpret(true);
      guardRisk(sample);
    });
  }

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

  /** 落库 composing：已生图未解读，供入口下次强制回本页 */
  function saveComposing() {
    const prev = window.H5Progress.get(session);
    window.H5Progress.set(session, {
      status: "composing",
      lockedDesc: lockedDesc,
      imageUrl: composePayload ? composePayload.imageUrl : "",
      patternId: composePayload ? composePayload.patternId : "",
      description: lockedDesc,
      genCount: 1,
      retestCount: prev.retestCount || 0,
    });
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
    if (guardRisk(lockedDesc)) return;
    if (composePayload) {
      SixQDevice.toast("心画已生成，本版不支持重新生成");
      showStep("confirmImg");
      return;
    }
    generating = true;
    if (btnCheck) btnCheck.disabled = true;
    setBoardState("wait");
    const tips = [
      "AI 正在根据您确认的安排生成心画…",
      "画面只是对描述内容的模拟呈现…",
      "正在绘制完整旅途…",
    ];
    let tipIdx = 0;
    boardWaitTip.textContent = tips[0];
    const tipTimer = setInterval(() => {
      tipIdx = (tipIdx + 1) % tips.length;
      boardWaitTip.textContent = tips[tipIdx];
    }, 700);

    const delay = (window.JourneyAIMock && window.JourneyAIMock.COMPOSE_DELAY_MS) || 2600;
    setTimeout(() => {
      clearInterval(tipTimer);
      composePayload = window.JourneyAIMock.composeBoard([]);
      composePayload.description = lockedDesc;
      boardImg.src = composePayload.imageUrl;
      setBoardState("img");
      generating = false;
      if (btnCheck) btnCheck.disabled = false;
      showStep("confirmImg");
      saveComposing();
      SixQDevice.toast("心画已生成");
    }, delay);
  }

  btnCheck.addEventListener("click", () => {
    const text = descInput.value.trim();
    if (!text) {
      missEl.hidden = false;
      missEl.textContent = "请先用语音或文字描述你的旅程。";
      return;
    }
    if (guardRisk(text)) return;
    const result = window.JourneyVoiceMock.validateRequired(text);
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
    const prev = window.H5Progress.get(session);
    window.H5Progress.set(session, {
      status: "completed",
      lockedDesc: lockedDesc,
      imageUrl: composePayload.imageUrl,
      patternId: composePayload.patternId,
      description: lockedDesc,
      genCount: 1,
      retestCount: prev.retestCount || 0,
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
    if (guardRisk(descInput.value)) return;
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

  const params = new URLSearchParams(location.search);
  const saved = window.H5Progress.get(session);
  if ((params.get("resume") === "1" || saved.status === "composing") && saved.imageUrl && saved.lockedDesc) {
    lockedDesc = saved.lockedDesc;
    composePayload = {
      imageUrl: saved.imageUrl,
      description: saved.lockedDesc,
      patternId: saved.patternId || "j04",
    };
    descInput.value = lockedDesc;
    boardImg.src = composePayload.imageUrl;
    setBoardState("img");
    showStep("confirmImg");
  } else {
    showStep("input");
    setBoardState("empty");
    syncCheckVisibility();
  }
})();
