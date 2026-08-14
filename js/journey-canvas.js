/**
 * 人生旅程画板页（v1.0.4）
 * 语音/打字 → 四元素校验 → 确认描述 → 成图贴板 → 确认/重生(最多3张) → 解读
 */
(function () {
  const MAX_GEN = 3; // 1 首次 + 2 重生
  const HOLD_MS = 300;
  const MAX_HOLD_MS = 15000;
  const CANCEL_DY = 56;

  const descInput = document.getElementById("jh-desc-input");
  const missEl = document.getElementById("jh-miss");
  const btnCheck = document.getElementById("jh-check");
  const stepInput = document.getElementById("jh-step-input");
  const stepConfirmDesc = document.getElementById("jh-step-confirm-desc");
  const stepConfirmImg = document.getElementById("jh-step-confirm-img");
  const confirmText = document.getElementById("jh-confirm-text");
  const btnEditDesc = document.getElementById("jh-edit-desc");
  const btnGenImg = document.getElementById("jh-gen-img");
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
    stepConfirmDesc.hidden = which !== "confirmDesc";
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
    btnGenImg.disabled = true;
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
      // 描述以用户确认文为准
      composePayload.description = lockedDesc;
      boardImg.src = composePayload.imageUrl;
      setBoardState("img");
      generating = false;
      btnGenImg.disabled = false;
      showStep("confirmImg");
      syncRegenUI();
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
        "。请补充后重新校验。";
      SixQDevice.toast("缺少 " + result.missing.map((m) => m.label).join("、"));
      return;
    }
    missEl.hidden = true;
    lockedDesc = text;
    confirmText.textContent = lockedDesc;
    showStep("confirmDesc");
  });

  btnEditDesc.addEventListener("click", () => {
    if (composePayload) {
      SixQDevice.toast("已生成图片后描述锁定，仅可重新生成图片");
      return;
    }
    showStep("input");
  });

  btnGenImg.addEventListener("click", () => {
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
      if (window.XinhuaPayload) {
        window.XinhuaPayload.save(
          "journeyPayloadUnified",
          window.XinhuaPayload.build({
            assessmentType: window.XinhuaPayload.ASSESSMENT.JOURNEY,
            audience: "adult",
            figures: [],
            extras: [],
            compose: {
              status: "done",
              imageUrl: composePayload.imageUrl,
              description: lockedDesc,
              patternId: composePayload.patternId,
            },
            meta: { genCount: genCount },
          })
        );
      }
    } catch (e) {}
    location.href = "journey-result.html";
  });

  // —— 按住说话 mock ——
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
    SixQDevice.toast("已填入模拟语音结果（可再编辑）");
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

  showStep("input");
  setBoardState("empty");
  syncRegenUI();
})();
