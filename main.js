"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
const chooseElem = document.querySelector(".choose");
const resultElem = document.querySelector(".result");
const buttonsElem = document.querySelector(".buttons");
const pointNumElem = document.querySelector(".point-num");
const userChoiseImg = document.querySelector(".user-choise img");
const robatChoiseImg = document.querySelector(".robat-choise img");
const assetsBaseURL = "/assets/";
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
const state = {
    view: "choose",
    point: 0,
    userChosie: null,
    robatChoise: null,
    robatIntervalRef: null,
    robatTempChoiseIndex: 0,
};
const rpsChoises = ["rock", "paper", "scissors"];
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
function randomChoise() {
    const rndNum = Math.round(Math.random()) + Math.round(Math.random());
    return rpsChoises[rndNum];
}
function handleChoiseClick(choise) {
    return __awaiter(this, void 0, void 0, function* () {
        state.userChosie = choise;
        state.view = "robat-choosing";
        updateUI();
        yield delay(3000);
        const robatChoise = randomChoise();
        state.robatChoise = robatChoise;
        state.point += pointMap[`${choise},${robatChoise}`];
        state.view = "result";
        updateUI();
    });
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
    }
    else if (state.view === "robat-choosing") {
        chooseElem.classList.add("hidden");
        resultElem.classList.remove("hidden");
        buttonsElem.classList.add("hidden");
        pointNumElem.classList.add("hidden");
        userChoiseImg.src = assetsBaseURL + state.userChosie + ".png";
        robatChoiseImg.classList.add("prog");
        startRobatChooseEffect();
    }
    else {
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
        const choise = elem.getAttribute("data-rps");
        handleChoiseClick(choise);
    });
});
(_a = document
    .querySelector("button.continue")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", handleContinueClick);
(_b = document
    .querySelector("button.restart")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", handleRestartClick);
updateUI();
