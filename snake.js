const head = document.getElementById("head");
const scoreText = document.getElementById("score")

const bad = document.getElementById("fail")

let mainInterval = setInterval(move, 10);


let fartx = 0;
let farty = 0;
let apples = 0

function makeInterval() {
    if (mainInterval) {
        clearInterval(mainInterval)
    }
    mainInterval = setInterval(move, 10)
}

function restart() {
    bad.style.display = "none"
    stop()
    makeInterval()
    console.log(fartx, farty)

    farty = 0
    fartx = 0
    head.style.left = 5 + "px"
    head.style.top = 165 + "px"
    head.style.transform = "scaleX(1)"
    apples = 0
    scoreText.innerHTML = "Score : 0"

}

function randomAppleStart() {
    for (let i = 0; i < 5; i++) {
        randomApple()
    }
}

function randomApple() {
    let applenr = Math.floor(Math.random() * 81) + 1
    let apple = document.getElementById(applenr.toString())

    apple.style.backgroundImage = 'url(Bilder/pngtree-summer-cartoon-fruit-apple-png-download-apple-snake-fruit-red-apple-png-image_3939961-removebg-preview.png)'
    apple.style.backgroundSize = 'cover'; // Ensures the image covers the div
    apple.style.backgroundRepeat = 'no-repeat'; // Prevents image repetition
    apple.style.backgroundPosition = 'center'; // Centers the image
    console.log('Apple spawned')
}

function move() {
    let currentLeft = parseFloat(window.getComputedStyle(head).left) || 0;
    let newLeft = currentLeft + fartx;
    head.style.left = newLeft + "px";

    let currentTop = parseFloat(window.getComputedStyle(head).top) || 0;
    let newTop = currentTop + farty;
    head.style.top = newTop + "px";

    if (newLeft + 30 > 360 || newLeft < 0 || newTop + 30 > 360 || newTop < 0) {
        stop();
        bad.style.display = "flex"
        bad.style.alignItems = "center"
        bad.style.justifyContent = "center"
        bad.style.flexDirection = "column"




    }

    appleCounter()
}

function changeXL() {
    fartx = -3;
    farty = 0;
    let currentTop = parseFloat(window.getComputedStyle(head).top);
    let topmid = currentTop / 40;
    head.style.top = Math.round(topmid) * 40 + 5 + "px";

    head.style.transform = "scaleX(-1)"
}

function changeYO() {


    farty = -3;
    fartx = 0;
    let currentLeft = parseFloat(window.getComputedStyle(head).left);
    let leftmid = currentLeft / 40;
    head.style.left = Math.round(leftmid) * 40 + 5 + "px";
    head.style.transform = "rotate(-90deg)"


}

function changeXR() {
    fartx = 3;
    farty = 0;
    let currentTop = parseFloat(window.getComputedStyle(head).top);
    let topmid = currentTop / 40;
    head.style.top = Math.round(topmid) * 40 + 5 + "px";
    head.style.transform = "scaleX(1)"
}


function changeYN() {

    farty = 3;
    fartx = 0;
    let currentLeft = parseFloat(window.getComputedStyle(head).left);
    let leftmid = currentLeft / 40;
    head.style.left = Math.round(leftmid) * 40 + 5 + "px";
    head.style.transform = "rotate(90deg)"
}

function stop() {
    clearInterval(mainInterval);
}

document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'a':
            changeXL();
            break;
        case 'w':
            changeYO();
            break;
        case 's':
            changeYN();
            break;
        case 'd':
            changeXR();
            break;
    }
});

function appleCounter() {
    const headRect = head.getBoundingClientRect();

    for (let i = 1; i <= 81; i++) {
        const cell = document.getElementById(i.toString());
        const cellRect = cell.getBoundingClientRect();

        // Check if the snake head overlaps with the apple
        if (
            cell.style.backgroundImage &&
            headRect.left < cellRect.right &&
            headRect.right > cellRect.left &&
            headRect.top < cellRect.bottom &&
            headRect.bottom > cellRect.top
        ) {
            // Increment apple counter
            apples++;

            // Remove the apple image from the cell
            cell.style.backgroundImage = '';
            console.log('Apple eaten')
            randomApple()
            console.log(`Apples eaten: ${apples}`);
            scoreText.innerHTML = "Score : " + apples

        }
    }
}