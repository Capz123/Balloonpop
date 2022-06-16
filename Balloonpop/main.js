let clickCount = 0
let height = 120
let width = 100
let inflationRate = 20
let maxSize = 300

function Inflate() {
    clickCount++
    let balloonElement = document.getElementById("Balloon")
    height += inflationRate
    width += inflationRate
    if (height >= maxSize) {
        console.log("pop the baloon")
        height = 0
        width = 0
    }
    balloonElement.style.height = height + "px"
    balloonElement.style.width = width + "px"


    let clickCountElement = document.getElementById("click-count")
    clickCountElement.innerText = clickCount
}