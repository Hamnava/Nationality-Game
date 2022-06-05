// getting all the dom elements
const img = document.querySelector(".baseImg");
const container = document.querySelector(".container");
const countryA = document.querySelector(".topLeft");
const countryB = document.querySelector(".topRight");
const countryC = document.querySelector(".bottomLeft");
const countryD = document.querySelector(".bottomRight");
const scoreEl = document.querySelector(".score");
const scoreResult = document.querySelector(".scoreFinal");
const startBtn = document.querySelector(".startBtn");
const closeModalBtn = document.querySelector(".closeModalBtn");
const closeModalEl = document.querySelector(".finish");

// some needed variables
let counter = 1;
let numberOfImages = 8;
let totalScore = 0;
let okAnswerReward = 20;
let falseAnswerReward = -5;
let continued = false;
let generateImageInterval, imgTimeOut;

const CountriesRepo = {
  Chinese: [4, 6, 1],
  Korean: [2, 3],
  Japanese: [5, 7],
  Thai: [8],
};

// functions
const startGame = () => {
  startBtn.innerHTML = "Running...";
  startBtn.disabled = true;
  if (counter === 1 || continued === true) shootImage();
  generateImageInterval = setInterval(shootImage, 3000);
};
const stopGame = () => {
  scoreResult.innerHTML = totalScore;
  clearInterval(generateImageInterval);
  img.classList.remove("imgAnimation");
  startBtn.innerHTML = "Start";
  startBtn.disabled = false;
  continued = false;
  scoreEl.innerHTML = totalScore;
  totalScore = 0;
  img.style.visibility = "hidden";
  showModal();
};

// shoot the photo from top
const shootImage = () => {
  img.style.visibility = "visible";
  img.src = `./assets/${counter}.jpg`;
  img.setAttribute("id", `${counter}`);
  if (counter > numberOfImages) {
    stopGame();
    return;
  }
  animateImg();
  counter++;
};

const animateImg = () => {
  img.classList.add("imgAnimation");
};

// drop & drag functions
const allowDrop = (ev) => {
  ev.preventDefault();
};
const drop = (ev) => {
  ev.preventDefault();
  const country = ev.path[0].id;
  const image = img.id;
  if (!!CountriesRepo[country].find((x) => x === Number(image))) {
    totalScore += okAnswerReward;
  } else {
    totalScore += falseAnswerReward;
  }
  img.style.visibility = "hidden";
  scoreEl.innerHTML = totalScore;
};

const drag = (ev) => {
  ev.dataTransfer.setData("text", ev.target.id);
};

// img hover and holds the image and game
const mouseEntered = (ev) => {
  const x = window.innerWidth - container.clientWidth + img.clientWidth / 3;
  const y = window.innerHeight - container.clientHeight + img.clientHeight / 3;
  img.style.left = `${x}px`;
  img.style.top = `${y}px`;
  img.classList.remove("imgAnimation");
  clearInterval(generateImageInterval);
  imgTimeOut = setTimeout(continueGame, 3000);
};
img.addEventListener("mouseenter", mouseEntered);

const continueGame = () => {
  continued = true;
  clearTimeout(imgTimeOut);
  startGame();

};

const letsGo = () => {
  counter = 1;
  startGame();
};

const closeModal = () => {
  clearInterval(generateImageInterval);
  closeModalEl.classList.remove("showModal");
};
const showModal = () => {
  closeModalEl.classList.add("showModal");
};
startBtn.addEventListener("click", letsGo);
closeModalBtn.addEventListener("click", closeModal);
