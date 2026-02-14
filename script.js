const words = ["ahple", "grapw", "mimik", "traim", "bruhs", "planr"];
const solution = words[Math.floor(Math.random() * words.length)];

const board = document.getElementById("board");
const message = document.getElementById("message");
const buttonCont = document.getElementById("buttonCont");

let currentRow = 0;
let currentGuess = "";
let gameOver = false;

const totalGuesses = 6;

let tries = 2;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Create board
createBoard();
function createBoard() {
  for (let i = 0; i < totalGuesses; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < 5; j++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      row.appendChild(tile);
    }
    board.appendChild(row);
  }
}

function revealGuess() {
  const row = board.children[currentRow];
  const solutionLetters = solution.split("");

  for (let i = 0; i < 5; i++) {
    const tile = row.children[i];
    const letter = currentGuess[i];

    setTimeout(() => {
      tile.classList.add("flip");

      if (letter === solution[i]) {
        tile.classList.add("correct");
        solutionLetters[i] = null;
      } else if (solutionLetters.includes(letter)) {
        tile.classList.add("present");
        solutionLetters[solutionLetters.indexOf(letter)] = null;
      } else {
        tile.classList.add("absent");
      }
    }, i * 300);
  }

  setTimeout(() => {
    if (currentGuess === solution) {
      message.textContent = "You Win!";
      gameOver = true;
      nextPage();
      return;
    }

    currentRow++;
    currentGuess = "";

    if (currentRow === totalGuesses) {
      tries -= 1;
      message.textContent = "Game Over! You have " + tries + " tries left...";
      if (tries == 0) {
        gameOver = true;
        nextPage();
      } else {
        buttonCont.children[0].textContent = "Try Again";
        buttonCont.children[0].addEventListener('click', () => {
          buttonCont.children[0].textContent = null;
          message.textContent = null;

          board.innerHTML = '';
          currentGuess = "";
          currentRow = 0;

          createBoard();
        })
      }
    }
  }, 1600);
}

async function nextPage() {

  // buttonCont.children[0].textContent = "⇨";
  // buttonCont.children[0].addEventListener('click', () => {
  //   window.location.href = 'main.html';
  // })

  if (confirm("Wait, you've got some new mail!")) {
    window.location.href = 'main.html';
  }

  return;
}

function handleKey(e) {
  if (gameOver) return;

  if (tries == 1 && currentRow == 3 && currentGuess.length == 3) {
    nextPage();

    return;
  }
  const row = board.children[currentRow];

  if (e.key === "Backspace") {
    currentGuess = currentGuess.slice(0, -1);
  } else if (e.key === "Enter") {
    if (currentGuess.length !== 5) {
      row.classList.add("shake");
      setTimeout(() => row.classList.remove("shake"), 400);
      return;
    }
    revealGuess();
    return;
  } else if (/^[a-zA-Z]$/.test(e.key) && currentGuess.length < 5) {
    currentGuess += e.key.toLowerCase();
    const tile = row.children[currentGuess.length - 1];
    tile.classList.add("pop");
    setTimeout(() => tile.classList.remove("pop"), 100);
  }

  for (let i = 0; i < 5; i++) {
    row.children[i].textContent = currentGuess[i] || "";
  }
}


document.addEventListener("keydown", handleKey);
