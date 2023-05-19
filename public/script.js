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

// Tijd aftellen
const timerContainer = document.getElementById("time-box-container")

if(timerContainer) {
    var countDownDate = new Date().getTime() + 40*60*1000
    var x = setInterval(function() {

        var now = new Date().getTime()
        var distance = countDownDate - now

        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        var seconds = Math.floor((distance % (1000 * 60)) / 1000)

        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }

        // Zet de minuten en seconden in de html
        document.getElementById("timer").innerHTML = minutes + ":" + seconds

        if (distance <= 0) {
            clearInterval(x)
            document.getElementById("timer").innerHTML = "0:00"
        }

    }, 1000)
}

// Connect to the Socket.IO server
const socket = io();

// Listen for the "scoreUpdate" event and update the UI
socket.on("scoreUpdate", (score) => {
  const scoredByPlayerNames = document.getElementById("scoredByPlayerNames");
  const listItem = document.createElement("li");
  listItem.textContent = score;
  scoredByPlayerNames.appendChild(listItem);
});

// Submit the form and emit the "playerScore" event
function submitForm(event) {
  event.preventDefault();

  const playerScore = document.getElementById("playerScored").value;
  socket.emit("playerScore", playerScore);
  document.getElementById("playerScored").value = "";
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

menuToggle.addEventListener ('click', toggleMenu)

function toggleMenu() {
    sidebarToggle.classList.toggle ('toggle-sidebar')
    mainToggle.classList.toggle ('toggle-sidebar-main')
    removeButtonText.forEach((removeButtonText) => {
        removeButtonText.classList.toggle ('remove-button-text')
    });
    biggerIcons1.classList.toggle ('bigger-icons')
    biggerIcons2.classList.toggle ('bigger-icons')
    biggerIcons3.classList.toggle ('bigger-icons')
    biggerIcons4.classList.toggle ('bigger-icons')
    ultiLogo.classList.toggle ('remove-logo')
    menuToggle.classList.toggle ('rotate-button')
}

// Add player
const addPlayerButton = document.getElementById("add-player-button")
const closePlayerButton = document.getElementById("close-player-button")
const teamPlayers = document.getElementById("teamPlayers")
const playerForm = document.getElementById("playerForm")

if(addPlayerButton) {
    addPlayerButton.addEventListener ("click", toggleForm)
    closePlayerButton.addEventListener ("click", toggleForm)

    function toggleForm() {
        teamPlayers.classList.toggle("d-none")
        playerForm.classList.toggle("active")
    }
}

// Loading screen
window.addEventListener('load', function () {
    const loadingPage = document.querySelector('#loading');
    if(loadingPage) {
        loadingPage.style.display = 'none';
    }
});