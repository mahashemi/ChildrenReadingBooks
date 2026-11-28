/* Little Lanterns — child-first English speaking practice. No recording or transcript is stored. */
(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const topic = $("speakingTopic");
  const question = $("speakingQuestion");
  const transcript = $("speechTranscript");
  const start = $("speechStart");
  const stop = $("speechStop");
  const status = $("speechStatus");
  const feedback = $("speechFeedback");
  const wordCount = $("speechWordCount");
  const liveDot = $("speechLiveDot");
  if (!topic || !question || !transcript || !start || !stop) return;

  const lessons = {
    story: {
      question: "What happened in the story? Who was in it, and what lesson did you learn?",
      frames: ["I read a story about ", "The story happened when ", "I think the lesson is ", "I learned that "],
      example: "I read a story about a kind boy. He listened to his father. I learned that wise advice can help us make good choices."
    },
    learning: {
      question: "What is one new thing you learned? Explain it as if you are teaching a friend.",
      frames: ["Today I learned that ", "This means ", "One example is ", "I want to learn more about "],
      example: "Today I learned that plants need light to grow. This means light helps plants make their food. I want to learn more about how leaves work."
    },
    kindness: {
      question: "Why is kindness important? Tell us one way you can show kindness today.",
      frames: ["Kindness means ", "I think kindness matters because ", "For example, ", "Today I can "],
      example: "Kindness means caring about other people. I think kindness matters because everyone wants to feel safe and welcome. For example, I can help a friend who feels sad."
    },
    science: {
      question: "Tell us about a science idea. What did you notice, and what question would you like to explore?",
      frames: ["I want to explain ", "I noticed that ", "I think this happens because ", "I would like to test "],
      example: "I want to explain a paper bridge. I noticed that folded paper can hold more coins than flat paper. I think the folds make it stronger. I would like to test another shape."
    },
    opinion: {
      question: "What is something you believe is important? Give a reason and an example to support your idea.",
      frames: ["I believe that ", "I think this is important because ", "For example, ", "That is why "],
      example: "I believe that learning is important. I think this is important because it helps us understand the world and help other people. For example, I can use what I learn to solve a problem."
    }
  };

  let recognition = null;
  let listening = false;
  let finalText = "";
  let activeStoryContext = null;
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const supported = !!SpeechRecognition;

  function setStatus(message, active = false) {
    status.textContent = message;
    liveDot.classList.toggle("is-listening", active);
    start.disabled = active || !supported;
    stop.disabled = !active;
    listening = active;
  }

  function updateCount() {
    const words = transcript.value.trim().match(/[A-Za-z]+(?:['’][A-Za-z]+)*/g) || [];
    wordCount.textContent = words.length + (words.length === 1 ? " word" : " words");
  }

  function renderFrames() {
    const host = $("speakingFrames");
    const lesson = lessons[topic.value] || lessons.story;
    if (topic.value === "story" && activeStoryContext) {
      const title = activeStoryContext.title;
      const category = activeStoryContext.category;
      if (category === "science" || category === "discovery") {
        question.textContent = "Explain one idea you discovered in " + title + ". What did you notice, and why do you think it matters?";
      } else if (category === "sahifa") {
        question.textContent = "What feeling or good action does " + title + " remind you of? Explain it in your own words."; 
      } else {
        question.textContent = "Tell the story or main idea of " + title + " in your own words. What happened or what did you learn? Give an example from your life.";
      }
    } else {
      question.textContent = lesson.question;
    }
    host.innerHTML = lesson.frames.map((frame) =>
      '<button type="button" data-frame="' + frame.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;") + '">' +
      frame.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim().replace(/\s+$/, "") + "…</button>"
    ).join("");
  }

  function speak(text) {
    if (!("speechSynthesis" in window) || !window.SpeechSynthesisUtterance) {
      setStatus("This browser cannot read the example aloud. Ask a grown-up to read it with you.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.82;
    window.speechSynthesis.speak(utterance);
  }

  function stopRecognition() {
    if (recognition && listening) {
      try { recognition.stop(); } catch (_) {}
    }
  }

  function startRecognition() {
    if (!supported) {
      setStatus("Voice recognition is not available in this browser. You can still type your answer in the box below.");
      transcript.focus();
      return;
    }
    if (!window.isSecureContext) {
      setStatus("Microphone practice needs a secure website connection. You can type your answer below.");
      transcript.focus();
      return;
    }
    if (!navigator.mediaDevices && !("SpeechRecognition" in window) && !("webkitSpeechRecognition" in window)) {
      setStatus("This browser cannot access a microphone. You can type your answer below.");
      return;
    }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    finalText = transcript.value.trim();
    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setStatus("I’m listening. Speak clearly and take your time.", true);
    recognition.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const phrase = event.results[i][0].transcript.trim();
        if (event.results[i].isFinal && phrase) finalText += (finalText ? " " : "") + phrase;
        else interim += phrase;
      }
      transcript.value = [finalText, interim].filter(Boolean).join(" ");
      updateCount();
    };
    recognition.onerror = (event) => {
      const messages = {
        "not-allowed": "Microphone permission was not given. Ask a grown-up to check browser permissions, or type your answer.",
        "service-not-allowed": "The browser speech service is unavailable. You can type your answer instead.",
        "network": "The speech service could not connect. Check the connection or type your answer.",
        "no-speech": "I did not hear any words. Try again when you are ready.",
        "audio-capture": "No microphone was found. You can type your answer instead."
      };
      setStatus(messages[event.error] || "Voice practice stopped. You can try again or type your answer.");
    };
    recognition.onend = () => {
      if (listening) setStatus("Lovely effort! You can add more, edit your words, or ask for a helpful next step.");
      recognition = null;
      updateCount();
    };
    try { recognition.start(); }
    catch (_) { setStatus("The microphone could not start. Please try again or type your answer."); }
  }

  function reviewAnswer() {
    const text = transcript.value.trim();
    const words = text.match(/[A-Za-z]+(?:['’][A-Za-z]+)*/g) || [];
    const lower = text.toLowerCase();
    if (!words.length) {
      feedback.textContent = "First, try saying one idea. You can begin with: “I think…”";
      return;
    }
    const suggestions = [];
    if (words.length < 12) suggestions.push("Try adding one more sentence to explain your idea.");
    if (!/\b(because|so|since)\b/.test(lower)) suggestions.push("Tell us why. Try adding “because…”");
    if (!/\b(for example|for instance|one time|when i)\b/.test(lower)) suggestions.push("Make your idea clearer with an example. Try “For example…”");
    if (!/[.!?]/.test(text)) suggestions.push("Pause between ideas. You can add a full stop when one thought is finished.");
    if (!suggestions.length) suggestions.push("You shared an idea, a reason and an example. Wonderful speaking! Now try saying it once more, a little more slowly and clearly.");
    feedback.textContent = "You shared " + words.length + " words. " + suggestions.join(" ");
  }

  topic.addEventListener("change", renderFrames);
  const storySpeakButton = $("storySpeakButton");
  if (storySpeakButton) storySpeakButton.addEventListener("click", function (event) {
    const button = event.currentTarget;
    activeStoryContext = {
      title: button.dataset.storyTitle || "this chapter",
      category: button.dataset.storyCategory || "",
      takeaway: button.dataset.storyTakeaway || ""
    };
    lessons.story.example = activeStoryContext.takeaway
      ? "This chapter is about " + activeStoryContext.title + ". One thing I learned is " + activeStoryContext.takeaway + " I can use this lesson in my own life."
      : "This chapter is about " + activeStoryContext.title + ". First, I will tell what happened. Then I will explain what I learned and give my own example.";
    topic.value = "story";
    renderFrames();
    const navButton = document.querySelector('[data-view="speak"]');
    if (navButton) navButton.click();
    $("speechStatus").textContent = "Your reading is ready. Think about the chapter, then tell it in your own English words.";
  });
  $("speakingFrames").addEventListener("click", (event) => {
    const button = event.target.closest("[data-frame]");
    if (!button) return;
    const insertion = button.dataset.frame;
    const from = transcript.selectionStart ?? transcript.value.length;
    const to = transcript.selectionEnd ?? transcript.value.length;
    transcript.value = transcript.value.slice(0, from) + insertion + transcript.value.slice(to);
    transcript.focus();
    transcript.setSelectionRange(from + insertion.length, from + insertion.length);
    updateCount();
  });
  start.addEventListener("click", startRecognition);
  stop.addEventListener("click", stopRecognition);
  $("speechReadPrompt").addEventListener("click", () => speak(question.textContent));
  $("speechReadExample").addEventListener("click", () => speak((lessons[topic.value] || lessons.story).example));
  $("speechReview").addEventListener("click", reviewAnswer);
  $("speechClear").addEventListener("click", () => {
    stopRecognition();
    transcript.value = "";
    finalText = "";
    updateCount();
    feedback.textContent = "A fresh try! Choose a sentence starter and share one idea.";
    setStatus(supported ? "When you are ready, press Start speaking and answer in English." : "Voice recognition is not available here. Type your answer and read it aloud with a grown-up.");
    transcript.focus();
  });
  transcript.addEventListener("input", updateCount);
  $("copyPrompt")?.addEventListener("click", () => speak((lessons[topic.value] || lessons.story).example));
  window.addEventListener("beforeunload", stopRecognition);

  renderFrames();
  updateCount();
  if (!supported) {
    start.disabled = true;
    setStatus("Voice recognition is not supported in this browser. Type your answer below, then read it aloud. A grown-up can listen and help.");
  }
})();
