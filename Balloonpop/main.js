let startButton = document.getElementById("start-button")
let inflateButton = document.getElementById("inflate-button")

let clickCount = 0
let height = 120
let width = 100
let inflationRate = 20
let maxSize = 300
let popCount = 0

function startGame() {
    // console.log("time to start")
    startButton.setAttribute("disabled", true)
    inflateButton.removeAttribute("disabled")


    setTimeout(() => {

        inflateButton.setAttribute("disabled", true)
        startButton.removeAttribute("disabled")
        console.log("it's been three seconds")
    }, 3000)
}

function Inflate() {
    clickCount++
    height += inflationRate
    width += inflationRate
    if (height >= maxSize) {
        console.log("pop the baloon")
        popCount++
        height = 0
        width = 0
    }
    draw()
}


function draw() {
    let balloonElement = document.getElementById("Balloon")
    let clickCountElement = document.getElementById("click-count")
    let popCountElem = document.getElementById("pop-count")
    balloonElement.style.height = height + "px"
    balloonElement.style.width = width + "px"

    clickCountElement.innerText = clickCount

    popCountElem.innerText = popCount

}

