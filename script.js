const lines = [
  { text: "ESTABLISHING SECURE CONNECTION...", cls: "dim" },
  { text: "CONNECTION ESTABLISHED.", cls: "gold" },
  { text: "IDENTIFYING RECIPIENT...", cls: "dim" },
  { text: "RECIPIENT: NIT THE GOAT", cls: "red" },
  { text: "AGE: 19 → 20", cls: "gold" },
  { text: "THREAT LEVEL: EXTREMELY HIGH.", cls: "red" },
  { text: "REASON: HAS SOMEHOW TAKEN OVER", cls: "" },
  { text: "SOMEONE'S ENTIRE HEART.", cls: "" }
];
const output = document.querySelector("#terminal-copy");
const button = document.querySelector("#initiate");
const flash = document.querySelector("#red-flash");
const transmission = document.querySelector("#transmission");
const dossier = document.querySelector("#dossier");
const evidenceButton = document.querySelector("#access-evidence");
const musicVault = document.querySelector("#music-vault");
const distanceLevel = document.querySelector("#distance-level");
const signalNext = document.querySelector("#signal-next");
let index = 0;

function revealNextLine() {
  if (index >= lines.length) {
    button.disabled = false;
    return;
  }
  const row = document.createElement("div");
  row.className = lines[index].cls;
  row.textContent = lines[index].text;
  output.append(row);
  index += 1;
  window.setTimeout(revealNextLine, index < 3 ? 480 : 300);
}
window.setTimeout(revealNextLine, 550);

button.addEventListener("click", () => {
  document.body.classList.add("glitch");
  flash.classList.remove("active");
  void flash.offsetWidth;
  flash.classList.add("active");
  transmission.classList.add("hidden");
  transmission.setAttribute("aria-hidden", "true");
  dossier.classList.remove("hidden");
  dossier.setAttribute("aria-hidden", "false");
});

evidenceButton.addEventListener("click", () => {
  dossier.classList.add("hidden");
  dossier.setAttribute("aria-hidden", "true");
  musicVault.classList.remove("hidden");
  musicVault.setAttribute("aria-hidden", "false");
});

signalNext.addEventListener("click", () => {
  musicVault.classList.add("hidden");
  musicVault.setAttribute("aria-hidden", "true");
  distanceLevel.classList.remove("hidden");
  distanceLevel.setAttribute("aria-hidden", "false");
});

document.querySelectorAll("[data-dialog-target]").forEach((card) => {
  card.addEventListener("click", () => {
    document.getElementById(card.dataset.dialogTarget).showModal();
  });
});

document.querySelectorAll(".dialog-close").forEach((closeButton) => {
  closeButton.addEventListener("click", () => closeButton.closest("dialog").close());
});

document.querySelectorAll(".letter-dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

const gameNext = document.querySelector("#game-next");
const operation = document.querySelector("#operation");
const quizCard = document.querySelector("#quiz-card");
const missionStatus = document.querySelector("#mission-status");
const missionProgress = document.querySelector("#mission-progress-fill");
const missionComplete = document.querySelector("#mission-complete");
const missions = [
  {
    title: "DAREDEVIL",
    questions: [
      { text: "What is Daredevil’s real name?", options: ["Matt Murdock", "Frank Castle", "Foggy Nelson"], answer: 0, note: "Matt Murdock is the man behind the mask." },
      { text: "What is Matt Murdock’s day job?", options: ["Lawyer", "Doctor", "Police detective"], answer: 0, note: "He fights for people in court and on the streets." },
      { text: "Which New York neighborhood is most closely tied to Daredevil?", options: ["Hell’s Kitchen", "Queens", "Brooklyn Heights"], answer: 0, note: "Hell’s Kitchen is home turf for the Devil of that neighborhood." }
    ]
  },
  {
    title: "THE MUSIC TEST",
    questions: [
      { text: "Which Papon song did you say you used to listen to on repeat?", options: ["Jiyein Kyun", "Tu Hi Hai", "Moh Moh Ke Dhaage"], answer: 0, note: "Exactly. A song from your repeat-listening days." },
      { text: "Who sings “Tu Hoti Toh”?", options: ["Bharat Chauhan", "Mohammed Rafi", "Kishore Kumar"], answer: 0, note: "Bharat Chauhan—and someone here knows you love the sad songs." },
      { text: "“Gojira” is a track by which artist?", options: ["Ikka", "Papon", "Bharat Chauhan"], answer: 0, note: "Correct. Gojira by Ikka made it into the vault." }
    ]
  }
];
let missionIndex = 0;
let questionIndex = 0;
let answeredQuestions = 0;

gameNext.addEventListener("click", () => {
  distanceLevel.classList.add("hidden");
  distanceLevel.setAttribute("aria-hidden", "true");
  operation.classList.remove("hidden");
  operation.setAttribute("aria-hidden", "false");
  renderQuestion();
});

function renderQuestion() {
  const mission = missions[missionIndex];
  const question = mission.questions[questionIndex];
  missionStatus.textContent = `MISSION 0${missionIndex + 1} OF 02 // ${mission.title}`;
  quizCard.replaceChildren();

  const count = document.createElement("div");
  count.className = "question-count";
  count.textContent = `QUESTION 0${questionIndex + 1} OF 03`;
  const prompt = document.createElement("h3");
  prompt.className = "question-text";
  prompt.textContent = question.text;
  const answers = document.createElement("div");
  answers.className = "answer-list";
  const feedback = document.createElement("p");
  feedback.className = "answer-feedback";
  feedback.setAttribute("aria-live", "polite");

  question.options.forEach((answerText, answerIndex) => {
    const answerButton = document.createElement("button");
    answerButton.className = "answer-option";
    answerButton.type = "button";
    answerButton.textContent = answerText;
    answerButton.addEventListener("click", () => {
      answers.querySelectorAll("button").forEach((item) => { item.disabled = true; });
      if (answerIndex === question.answer) {
        answerButton.classList.add("correct");
        feedback.textContent = `CORRECT. ${question.note}`;
      } else {
        answerButton.classList.add("incorrect");
        answers.children[question.answer].classList.add("correct");
        feedback.textContent = `NOT QUITE—THE ANSWER IS ${question.options[question.answer]}. ${question.note}`;
      }
      answeredQuestions += 1;
      missionProgress.style.width = `${(answeredQuestions / 6) * 100}%`;
      const nextButton = document.createElement("button");
      nextButton.className = "quiz-next";
      nextButton.type = "button";
      nextButton.textContent = questionIndex < 2 || missionIndex === 0 ? "NEXT QUESTION →" : "COMPLETE OPERATION →";
      nextButton.addEventListener("click", advanceQuestion);
      quizCard.append(nextButton);
    });
    answers.append(answerButton);
  });

  quizCard.append(count, prompt, answers, feedback);
}

function advanceQuestion() {
  if (questionIndex < 2) {
    questionIndex += 1;
    renderQuestion();
    return;
  }
  if (missionIndex === 0) {
    missionIndex = 1;
    questionIndex = 0;
    renderQuestion();
    return;
  }
  quizCard.classList.add("hidden");
  missionStatus.classList.add("hidden");
  missionComplete.classList.remove("hidden");
}

const claimReward = document.querySelector("#claim-reward");
const finalTransmission = document.querySelector("#final-transmission");
const playAgain = document.querySelector("#play-again");
const voiceNote = document.querySelector("#voice-note");
const voiceNotePlaceholder = document.querySelector("#voice-note-placeholder");

claimReward.addEventListener("click", () => {
  operation.classList.add("hidden");
  operation.setAttribute("aria-hidden", "true");
  finalTransmission.classList.remove("hidden");
  finalTransmission.setAttribute("aria-hidden", "false");
});

playAgain.addEventListener("click", () => window.location.reload());

voiceNote.addEventListener("loadedmetadata", () => {
  voiceNote.hidden = false;
  voiceNotePlaceholder.hidden = true;
});
voiceNote.addEventListener("error", () => {
  voiceNote.hidden = true;
  voiceNotePlaceholder.hidden = false;
});
voiceNote.load();

document.querySelectorAll(".play-track").forEach((playButton) => {
  playButton.addEventListener("click", () => {
    const currentPlayer = playButton.nextElementSibling;
    const isOpen = playButton.getAttribute("aria-expanded") === "true";

    document.querySelectorAll(".play-track").forEach((otherButton) => {
      if (otherButton === playButton) return;
      otherButton.setAttribute("aria-expanded", "false");
      otherButton.textContent = "▶ PLAY IN THE VAULT";
      otherButton.nextElementSibling.classList.add("hidden");
      otherButton.nextElementSibling.replaceChildren();
    });

    if (isOpen) {
      playButton.setAttribute("aria-expanded", "false");
      playButton.textContent = "▶ PLAY IN THE VAULT";
      currentPlayer.classList.add("hidden");
      currentPlayer.replaceChildren();
      return;
    }

    if (window.location.protocol === "file:") {
      const previewMessage = document.createElement("p");
      previewMessage.className = "preview-message";
      previewMessage.textContent = "YouTube needs a web address to play inside this page. The in-page player will work when the site is hosted.";
      const previewLink = document.createElement("a");
      previewLink.href = `https://www.youtube.com/watch?v=${playButton.dataset.videoId}`;
      previewLink.target = "_blank";
      previewLink.rel = "noopener noreferrer";
      previewLink.textContent = "OPEN THIS TRACK ON YOUTUBE";
      currentPlayer.replaceChildren(previewMessage, previewLink);
      currentPlayer.classList.remove("hidden");
      playButton.setAttribute("aria-expanded", "true");
      playButton.textContent = "■ CLOSE LOCAL PREVIEW";
      return;
    }

    const title = playButton.closest(".archive-card").querySelector("h3").textContent;
    const player = document.createElement("iframe");
    player.src = `https://www.youtube-nocookie.com/embed/${playButton.dataset.videoId}?autoplay=1&rel=0`;
    player.title = `Play ${title}`;
    player.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    player.referrerPolicy = "strict-origin-when-cross-origin";
    player.allowFullscreen = true;
    currentPlayer.replaceChildren(player);
    currentPlayer.classList.remove("hidden");
    playButton.setAttribute("aria-expanded", "true");
    playButton.textContent = "■ CLOSE PLAYER";
  });
});

