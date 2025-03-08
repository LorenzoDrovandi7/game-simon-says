let statusText = document.getElementById("status-text");
let startButton = document.getElementById("start-button");
let divColors = document.getElementById("div-colors");
let blue = document.getElementById("blue");
let red = document.getElementById("red");
let green = document.getElementById("green");
let yellow = document.getElementById("yellow");

let accumulator = 1;
let arraySecuency = [];
let userSecuency = [];
let arrayColors = [
  "blue",
  "red",
  "green",
  "yellow",
  "blue",
  "red",
  "green",
  "yellow",
  "blue",
  "red",
  "green",
  "yellow",
  "blue",
  "red",
  "green",
  "yellow",
  "blue",
  "red",
  "green",
  "yellow",
];

function restart() {
  accumulator = 1;
  arraySecuency = [];
  userSecuency = [];
  toggleStartButton("enable");
}

function userWins() {
  modifyStatusText("win");
  document.body.style.backgroundColor = "rgb(74, 192, 84)";
  setTimeout(() => {
    document.body.style.backgroundColor = "";
    restart();
  }, 3000);
}

function userFails() {
  modifyStatusText("lose");
  document.body.style.backgroundColor = "rgb(192, 74, 74)";
  setTimeout(() => {
    document.body.style.backgroundColor = "";
    restart();
  }, 3000);
}

function compareSecuency() {
  let currentIndex = userSecuency.length - 1;
  if (arraySecuency[currentIndex] == userSecuency[currentIndex]) {
    if (userSecuency.length === arraySecuency.length) {
      if (arraySecuency.length === 20) {
        userWins();
      }
      userSecuency = [];
      accumulator++;
      setTimeout(() => {
        modifyStatusText("computer");
        formTheSecuency(arrayColors);
        showTheSecuency(arraySecuency);
      }, 1000);
    }
  } else {
    userFails();
  }
}

function playerSecuency() {
  blue.addEventListener("click", handlePlayerClick);
  red.addEventListener("click", handlePlayerClick);
  green.addEventListener("click", handlePlayerClick);
  yellow.addEventListener("click", handlePlayerClick);
}

function handlePlayerClick(event) {
  const colorClicked = event.target.id;
  userSecuency.push(colorClicked);
  compareSecuency();
}

function disablePlayerClicks() {
  blue.removeEventListener("click", handlePlayerClick);
  red.removeEventListener("click", handlePlayerClick);
  green.removeEventListener("click", handlePlayerClick);
  yellow.removeEventListener("click", handlePlayerClick);
}

// function playerSecuency() {
//   blue.onclick = function () {
//     userSecuency.push("blue");
//     compareSecuency();
//   };
//   red.onclick = function () {
//     userSecuency.push("red");
//     compareSecuency();
//   };
//   green.onclick = function () {
//     userSecuency.push("green");
//     compareSecuency();
//   };
//   yellow.onclick = function () {
//     userSecuency.push("yellow");
//     compareSecuency();
//   };
// }

function userTurn() {
  modifyStatusText("user");
  playerSecuency();
}

function clickTheColor(color) {
  const colorMap = {
    blue: blue,
    red: red,
    green: green,
    yellow: yellow,
  };

  let element = colorMap[color];
  if (element) {
    element.classList.add("pressed-effect");
    setTimeout(() => {
      element.classList.remove("pressed-effect");
    }, 500);
  }
}

function showTheSecuency(arraySecuency) {
  disablePlayerClicks();
  for (let i = 0; i < arraySecuency.length; i++) {
    setTimeout(() => {
      let color = arraySecuency[i];
      if (color === "blue") {
        clickTheColor("blue");
      } else if (color === "red") {
        clickTheColor("red");
      } else if (color === "green") {
        clickTheColor("green");
      } else if (color === "yellow") {
        clickTheColor("yellow");
      }
    }, i * 1000);
    setTimeout(() => {
      userTurn();
    }, arraySecuency.length * 1050);
  }
}

function formTheSecuency(arrayColors) {
  arraySecuency = [];
  let mixedArray = arrayColors.sort(() => Math.random() - 0.5);
  for (let i = 0; i < accumulator; i++) {
    let color = mixedArray[i];
    arraySecuency.push(color);
  }
}

function modifyStatusText(status) {
  if (status === "computer") {
    statusText.textContent = "-Computer turn-";
  } else if (status === "user") {
    statusText.textContent = "-Your turn-";
  } else if (status === "win") {
    statusText.textContent = "-You won-";
  } else if (status === "lose") {
    statusText.textContent = "-Game over-";
  } else {
    statusText.textContent = "-Press start-";
  }
}

function toggleStartButton(status) {
  if (status === "disable") {
    startButton.disabled = true;
  } else if (status === "enable") {
    startButton.disabled = false;
  }
}

startButton.onclick = function () {
  event.preventDefault();
  modifyStatusText("computer");
  toggleStartButton("disable");
  formTheSecuency(arrayColors);
  setTimeout(() => {
    showTheSecuency(arraySecuency);
  }, 700);
  clickTheColor();
};
