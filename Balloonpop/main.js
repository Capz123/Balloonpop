//#region Game Logic and Data

// DATA
let clickCount = 0
let height = 120
let width = 100
let inflationRate = 20
let maxSize = 300
let highestPopCount = 0
let currentPopCount = 0
let gameLength = 10000
let clockId = 0
let timeRemaining = 0
let currentPlayer = {}
let currentColor = "red"
let possibleColors = ["green", "blue", "pink", "purple", "red"]


function startGame() {
    document.getElementById("game-controls").classList.remove("hidden")
    document.getElementById("main-controls").classList.add("hidden")
    document.getElementById("scoreboard").classList.add("hidden")
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
    checkBalloonPop()
    draw()
}

function checkBalloonPop() {
    if (height >= maxSize) {
        let balloonElement = document.getElementById("Balloon")
        balloonElement.classList.remove(currentColor)
        getRandomColor()
        balloonElement.classList.add(currentColor)
        currentPopCount++
        height = 0
        width = 0
    }
}


function getRandomColor() {
    let i = Math.floor(Math.random() * possibleColors.length);
    currentColor = possibleColors[i]

}


function draw() {
    let balloonElement = document.getElementById("Balloon")
    let clickCountElement = document.getElementById("click-count")
    let popCountElem = document.getElementById("pop-count")
    let highPopCountElem = document.getElementById("high-pop-count")
    let playerNametElem = document.getElementById("player-name")

    balloonElement.style.height = height + "px"
    balloonElement.style.width = width + "px"

    clickCountElement.innerText = clickCount
    popCountElem.innerText = currentPopCount
    highPopCountElem.innerText = currentPlayer.topScore.toString()

    playerNametElem.innerText = currentPlayer.name

}

function stopGame() {
    document.getElementById("main-controls").classList.remove("hidden")
    document.getElementById("game-controls").classList.add("hidden")
    document.getElementById("scoreboard").classList.remove("hidden")
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
    drawScoreboard()
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
    drawScoreboard()
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

function drawScoreboard() {
    let template = ""

    players.sort((p1, p2) => p2.topScore - p1.topScore)

    players.forEach(players => {
        template += `
        <div class="d-flex space-between">
        <span>
            <i class="fa-solid fa-circle-user"></i>
                ${players.name}
        </span>
        <span>${players.topScore}</span>
        </div>`
    })

    document.getElementById("players").innerHTML = template
}

drawScoreboard()
//#endregion PlayersData