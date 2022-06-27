let startButton = document.getElementById("start-button")
let inflateButton = document.getElementById("inflate-button")

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
    highPopCountElem.innerText = highestPopCount

}

function stopGame() {
    inflateButton.setAttribute("disabled", true)
    startButton.removeAttribute("disabled")
    console.log("the game is over!")

    clickCount = 0
    height = 120
    width = 100

    if (currentPopCount > highestPopCount) {
        highestPopCount = currentPopCount
    }

    currentPopCount = 0

    stopClock()
    draw()
}

