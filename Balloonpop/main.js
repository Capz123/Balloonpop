
//Buttons
let startButton = document.getElementById("start-button")
let inflateButton = document.getElementById("inflate-button")

//#region Game Logic and Data

// DATA
let clickCount = 0
let height = 120
let width = 100
let inflationRate = 20
let maxSize = 300
let highestPopCount = 0
let currentPopCount = 0
let gameLength = 5000
let clockId = 0
let timeRemaining = 0
let currentPlayer = {}

function startGame() {
    startButton.setAttribute("disabled", true)
    inflateButton.removeAttribute("disabled")
    console.log("the games has started")

    startClock()
    setTimeout(stopGame, gameLength)
}

function startClock() {
    timeRemaining = gameLength
    clockId = setInterval(drawClock, 1000)
}
function stopClock() {
    clearInterval(clockId)
}

function drawClock() {
    let countdownElem = document.getElementById("countdown")
    countdownElem.innerText = timeRemaining / 1000
    timeRemaining -= 1000
}

function Inflate() {
    clickCount++
    height += inflationRate
    width += inflationRate
    if (height >= maxSize) {
        currentPopCount++
        height = 0
        width = 0
    }
    draw()
}


function draw() {
    let balloonElement = document.getElementById("Balloon")
    let clickCountElement = document.getElementById("click-count")
    let popCountElem = document.getElementById("pop-count")
    let highPopCountElem = document.getElementById("high-pop-count")
    balloonElement.style.height = height + "px"
    balloonElement.style.width = width + "px"

    clickCountElement.innerText = clickCount
    popCountElem.innerText = currentPopCount
    highPopCountElem.innerText = currentPlayer.topScore.toString()

}

function stopGame() {
    inflateButton.setAttribute("disabled", true)
    startButton.removeAttribute("disabled")
    console.log("the game is over!")

    clickCount = 0
    height = 120
    width = 100

    if (currentPopCount > currentPlayer.topScore) {
        currentPlayer.topScore = currentPopCount
        savePlayers()
    }

    currentPopCount = 0

    stopClock()
    draw()
}

//#endregion

let players = []
loadData()

//#region PlayersData
function setPlayer(event) {
    event.preventDefault()
    let form = event.target
    let playerName = (form.playerName.value)

    currentPlayer = players.find(player => player.name == playerName)

    if (!currentPlayer) {
        currentPlayer = { name: playerName, topScore: 0 }
        players.push(currentPlayer)
        savePlayers()
    }



    form.reset()
    document.getElementById("game").classList.remove("hidden")
    form.classList.add("hidden")
    draw()
}

function changePlayer() {
    document.getElementById("player-form").classList.remove("hidden")
    document.getElementById("game").classList.add("hidden")
}

function savePlayers() {
    window.localStorage.setItem("players", JSON.stringify(players))
}

function loadData() {
    let playersData = JSON.parse(window.localStorage.getItem("players"))
    if (playersData) {
        players = playersData
    }
}
//#endregion PlayersData