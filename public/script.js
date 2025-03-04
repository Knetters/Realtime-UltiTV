// darmode
const darkButton = document.querySelector('.darkmode');
const darkText = document.getElementById("darkmode-btn-text");
const root = document.documentElement;
let initialTheme = false;

darkButton.addEventListener('click', toggleDarkMode);

function toggleDarkMode() {
  if (initialTheme) {
    root.style.setProperty('--c-dark', '#252525');
    root.style.setProperty('--c-white', '#FEFEFE');
    root.style.setProperty('--c-whiteColumns', '#FEFEFE');
    root.style.setProperty('--c-lightGray', '#f8f8f8');
    root.style.setProperty('--c-hoverGray', '#f8f8f8');
    root.style.setProperty('--c-mediumGray', '#eaeaea');
    root.style.setProperty('--c-borderColor', 'rgba(149, 157, 165, 0.2)');
    darkText.innerHTML = "Light";
    initialTheme = false;
  } else {
    root.style.setProperty('--c-dark', '#FEFEFE');
    root.style.setProperty('--c-white', '#252525');
    root.style.setProperty('--c-whiteColumns', '#3A3A3A');
    root.style.setProperty('--c-lightGray', '#2c2c2c');
    root.style.setProperty('--c-hoverGray', '#3e3e3e');
    root.style.setProperty('--c-mediumGray', '#323232');
    root.style.setProperty('--c-borderColor', 'rgba(149, 157, 165, 0.0)');
    darkText.innerHTML = "Dark";
    initialTheme = true;
  }
}

// Loading screen
window.addEventListener('load', function () {
  const loadingPage = document.querySelector('#loading');
  if (loadingPage) {
    loadingPage.style.display = 'none';
  }
});

let toggleLoadingState = document.querySelector('.goal-scored')
let toggleScoreBlock = document.querySelector('.score-message-wrapper')
let content = true

jsToggleLoad()

function jsToggleLoad() {
  if (content === true) {
    toggleLoadingState.classList.add('black');
  }
};

// Tijd aftellen
const timerContainer = document.getElementById("time-box-container")

if (timerContainer) {
  var countDownDate = new Date().getTime() + 40 * 60 * 1000
  var x = setInterval(function () {

    var now = new Date().getTime()
    var distance = countDownDate - now

    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((distance % (1000 * 60)) / 1000)

    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }

    const timerValue = minutes + ":" + seconds

    // Zet de minuten en seconden in de html
    document.getElementById("timer").innerHTML = timerValue

    if (distance <= 0) {
      clearInterval(x)
      document.getElementById("timer").innerHTML = "0:00"
    }

  }, 1000)
}

// Connect to the Socket.IO server
const socket = io();

// Listen for the "scoreUpdate" event and update the UI
socket.on("scoreUpdate", (data) => {
  const team = data.team;
  const score = data.score;
  const assist = data.assist;
  const passes = data.passes;
  const turnover = data.turnover;
  const timeScored = document.getElementById("timer").innerHTML;

  const scoreMessageBlock = document.getElementById("score-message-block");

  if (scoreMessageBlock) {
    const newElement = document.createElement("div");
    newElement.id = "score-message-element";
    newElement.className = "score-message-element";
    newElement.innerHTML = `
    <div class="score-message-wrapper">
                <div class="goal-header-container">
                    <p class="goal-scored">Goal!!!</p>
                    <p class="goal-time">${timeScored}</p>
                </div>
                <div class="line goal-line"></div>

                <p class="team-name team-name-gsap">${team}</p>
                <div class="score-message-container">
                    <div class="left-side-message">
                        <div class="goals-scored">
                            <img class="goal-icon stats-icon" src="/static/img/icon-05.svg" alt="Goal icon">
                            <p>${score}</p>
                        </div>
                        <div class="goals-scored">
                            <img class="assist-icon stats-icon" src="/static/img/icon-04.svg" alt="Assist icon">
                            <p>${assist}</p>
                        </div>
                    </div>

                    <div class="right-side-message">
                        <div class="goals-scored">
                            <img class="passes-icon stats-icon" src="/static/img/icon-06.svg" alt="Passes icon">
                            <p>${passes}</p>
                        </div>
                        <div class="goals-scored">
                            <img class="turnover-icon stats-icon" src="/static/img/icon-07.svg" alt="turnover icon">
                            <p>${turnover}</p>
                        </div>
                    </div>
                </div>
            </div>
    `;

    // Insert the new element before the first child of scoreMessageBlock
    scoreMessageBlock.insertBefore(newElement, scoreMessageBlock.firstChild);
  } else {
    console.error("Score message block not found.");
  }
});

// Listen for the "scoreHistory" event and update the UI with the score history
socket.on("scoreHistory", (history) => {
  const scoreMessageBlock = document.getElementById("score-message-block");

  if (scoreMessageBlock) {
    // Clear the existing contents of the score message block
    // scoreMessageBlock.innerHTML = "";

    // Iterate through the score history and append score message elements
    history.forEach((scoreData) => {
      const { team, score, assist, passes, turnover, timeScored } = scoreData;

      const newElement = document.createElement("div");
      newElement.id = "score-message-element";
      newElement.className = "score-message-element";
      newElement.innerHTML = `
        <div class="score-message-wrapper">
        <div class="goal-header-container">
            <p class="goal-scored">Goal!!!</p>
            <p class="goal-time">${timeScored}</p>
        </div>
        <div class="line goal-line"></div>

        <p class="team-name team-name-gsap">${team}</p>
        <div class="score-message-container">
            <div class="left-side-message">
                <div class="goals-scored">
                    <img class="goal-icon stats-icon" src="/static/img/icon-05.svg" alt="Goal icon">
                    <p>${score}</p>
                </div>
                <div class="goals-scored">
                    <img class="assist-icon stats-icon" src="/static/img/icon-04.svg" alt="Assist icon">
                    <p>${assist}</p>
                </div>
            </div>

            <div class="right-side-message">
                <div class="goals-scored">
                    <img class="passes-icon stats-icon" src="/static/img/icon-06.svg" alt="Passes icon">
                    <p>${passes}</p>
                </div>
                <div class="goals-scored">
                    <img class="turnover-icon stats-icon" src="/static/img/icon-07.svg" alt="turnover icon">
                    <p>${turnover}</p>
                </div>
            </div>
        </div>
    </div>
      `;

      scoreMessageBlock.appendChild(newElement);
    });
  } else {
    console.error("Score message block not found.");
  }
});


// Submit the form and emit the "playerScore" event
function submitForm(event) {
  event.preventDefault();
  const teamScored = document.getElementById("teamScored").value;
  const playerScore = document.getElementById("playerScored").value;
  const playerAssist = document.getElementById("playerAssist").value;
  const playerPasses = document.getElementById("playerPasses").value;
  const turnover = document.getElementById("turnover").value;

  socket.emit("playerScore", { team: teamScored, score: playerScore, assist: playerAssist, passes: playerPasses, turnover: turnover });

  document.getElementById("teamScored").value = "";
  document.getElementById("playerScored").value = "";
  document.getElementById("playerAssist").value = "";
  document.getElementById("playerPasses").value = "";
  document.getElementById("turnover").value = "";

  clickCount = 0;
    playerPassesInput.value = 0;
    gridItems.forEach(gridItem => {
      gridItem.textContent = '';
    });
    lastClickedIndex = null;
    canUndo = true; // Reset canUndo to true when canceling
}

// menu in en uitklappen
const menuToggle = document.querySelector('.menu-toggle-button')
const sidebarToggle = document.querySelector('aside')
const mainToggle = document.querySelector('main')
const removeButtonText = document.querySelectorAll('.menu-button-text')
const biggerIcons1 = document.querySelector('.menu-icon1')
const biggerIcons2 = document.querySelector('.menu-icon2')
const biggerIcons3 = document.querySelector('.menu-icon3')
const biggerIcons4 = document.querySelector('.menu-icon4')
const ultiLogo = document.querySelector('.logo')

menuToggle.addEventListener('click', toggleMenu)

function toggleMenu() {
  sidebarToggle.classList.toggle('toggle-sidebar')
  mainToggle.classList.toggle('toggle-sidebar-main')
  removeButtonText.forEach((removeButtonText) => {
    removeButtonText.classList.toggle('remove-button-text')
  });
  biggerIcons1.classList.toggle('bigger-icons')
  biggerIcons2.classList.toggle('bigger-icons')
  biggerIcons3.classList.toggle('bigger-icons')
  biggerIcons4.classList.toggle('bigger-icons')
  ultiLogo.classList.toggle('remove-logo')
  menuToggle.classList.toggle('rotate-button')
}

// Add player
const addPlayerButton = document.getElementById("add-player-button")
const closePlayerButton = document.getElementById("close-player-button")
const teamPlayers = document.getElementById("teamPlayers")
const playerForm = document.getElementById("playerForm")

if (addPlayerButton) {
  addPlayerButton.addEventListener("click", toggleForm)
  closePlayerButton.addEventListener("click", toggleForm)

  function toggleForm() {
    teamPlayers.classList.toggle("d-none")
    playerForm.classList.toggle("active")
  }
}

const phase = new SplitType('.team-name-gsap', { types: 'words, chars' })

// Player passes field input
const gridItems = document.querySelectorAll('.field-item');
const playerPassesInput = document.getElementById('playerPasses');
const undoButton = document.getElementById('undoButton');
const cancelButton = document.getElementById('cancelButton');
let clickCount = 0;
let lastClickedIndex = null;
let canUndo = true; // Variable to track if undo is allowed

if (gridItems) {
  gridItems.forEach((gridItem, index) => {
    gridItem.addEventListener('click', () => {
      clickCount++;
      if (clickCount === 1) {
        gridItem.textContent = "start";
      } else {
        gridItem.textContent = clickCount - 1;
      }
      playerPassesInput.value = clickCount - 1;
      lastClickedIndex = index;
    });
  });

  undoButton.addEventListener('click', () => {
    if (canUndo && clickCount > 0) { // Check if undo is allowed and clickCount > 0
      clickCount--;
      playerPassesInput.value = clickCount - 1;
      if (lastClickedIndex !== null) {
        const lastClickedItem = gridItems[lastClickedIndex];
        lastClickedItem.textContent = '';
        lastClickedIndex = lastClickedIndex > 0 ? lastClickedIndex - 1 : null;
      }
      canUndo = false; // Set canUndo to false after undoing once
    }
  });

  cancelButton.addEventListener('click', () => {
    clickCount = 0;
    playerPassesInput.value = 0;
    gridItems.forEach(gridItem => {
      gridItem.textContent = '';
    });
    lastClickedIndex = null;
    canUndo = true; // Reset canUndo to true when canceling
  });
}