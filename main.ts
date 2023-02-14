const chooseElem = document.querySelector(".choose") as HTMLElement;
const resultElem = document.querySelector(".result") as HTMLElement;
const buttonsElem = document.querySelector(".buttons") as HTMLElement;
const pointNumElem = document.querySelector(".point-num") as HTMLElement;
const userChoiseImg = document.querySelector(
  ".user-choise img"
) as HTMLImageElement;
const robatChoiseImg = document.querySelector(
  ".robat-choise img"
) as HTMLImageElement;

const assetsBaseURL = "/assets/";

type RPSChoise = "rock" | "paper" | "scissors";

const pointMap = {
  "rock,rock": 0,
  "rock,paper": -1,
  "rock,scissors": 1,
  "paper,rock": 1,
  "paper,paper": 0,
  "paper,scissors": -1,
  "scissors,rock": -1,
  "scissors,paper": 1,
  "scissors,scissors": 0,
};

const state: {
  view: "choose" | "robat-choosing" | "result";
  point: number;
  userChosie: RPSChoise | null;
  robatChoise: RPSChoise | null;
  robatIntervalRef: number | null;
  robatTempChoiseIndex: number;
} = {
  view: "choose",
  point: 0,
  userChosie: null,
  robatChoise: null,
  robatIntervalRef: null,
  robatTempChoiseIndex: 0,
};
const rpsChoises: RPSChoise[] = ["rock", "paper", "scissors"];
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

function randomChoise(): RPSChoise {
  const rndNum = Math.round(Math.random()) + Math.round(Math.random());
  return rpsChoises[rndNum];
}

async function handleChoiseClick(choise: RPSChoise) {
  state.userChosie = choise;
  state.view = "robat-choosing";
  updateUI();
  await delay(3000);
  const robatChoise = randomChoise();
  state.robatChoise = robatChoise;
  state.point += pointMap[`${choise},${robatChoise}`];
  state.view = "result";
  updateUI();
}

function handleRestartClick() {
  state.view = "choose";
  state.point = 0;
  updateUI();
}

function handleContinueClick() {
  state.view = "choose";
  updateUI();
}

function updateUI() {
  if (state.view === "choose") {
    chooseElem.classList.remove("hidden");
    resultElem.classList.add("hidden");
    buttonsElem.classList.add("hidden");
    robatChoiseImg.classList.remove("prog");
  } else if (state.view === "robat-choosing") {
    chooseElem.classList.add("hidden");
    resultElem.classList.remove("hidden");
    buttonsElem.classList.add("hidden");
    pointNumElem.classList.add("hidden");
    userChoiseImg.src = assetsBaseURL + state.userChosie + ".png";
    robatChoiseImg.classList.add("prog");
    startRobatChooseEffect();
  } else {
    stopRobatChooseEffect();
    chooseElem.classList.add("hidden");
    resultElem.classList.remove("hidden");
    buttonsElem.classList.remove("hidden");
    pointNumElem.classList.remove("hidden");
    robatChoiseImg.classList.remove("prog");
    pointNumElem.innerText = state.point.toString();
    userChoiseImg.src = assetsBaseURL + state.userChosie + ".png";
    robatChoiseImg.src = assetsBaseURL + state.robatChoise + ".png";
  }
}

function startRobatChooseEffect() {
  if (state.robatIntervalRef) {
    clearInterval(state.robatIntervalRef);
  }
  state.robatIntervalRef = setInterval(() => {
    state.robatTempChoiseIndex++;
    if (state.robatTempChoiseIndex > 2) {
      state.robatTempChoiseIndex = 0;
    }
    robatChoiseImg.src =
      assetsBaseURL + rpsChoises[state.robatTempChoiseIndex] + ".png";
  }, 100);
}

function stopRobatChooseEffect() {
  if (state.robatIntervalRef) {
    clearInterval(state.robatIntervalRef);
  }
}

document.querySelectorAll(".choise").forEach((elem) => {
  elem.addEventListener("click", () => {
    const choise = elem.getAttribute("data-rps") as RPSChoise;
    handleChoiseClick(choise);
  });
});

document
  .querySelector("button.continue")
  ?.addEventListener("click", handleContinueClick);
document
  .querySelector("button.restart")
  ?.addEventListener("click", handleRestartClick);

updateUI();
