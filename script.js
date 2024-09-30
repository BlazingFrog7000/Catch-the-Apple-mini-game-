const basket = document.getElementById('basket');
const apple = document.getElementById('apple');
const scoreDisplay = document.getElementById('score');
const gameOverDisplay = document.getElementById('gameOver');
let score = 0;
let basketPosition = 120; // Initial position of the basket
let appleInterval;

function startGame() {
    apple.style.left = `${Math.random() * 270}px`;
    apple.style.top = '0px';
    moveApple();
    gameOverDisplay.style.display = 'none'; // Hide game over message
}

function moveApple() {
    appleInterval = setInterval(() => {
        const appleTop = parseInt(apple.style.top);
        if (appleTop >= 400) {
            gameOver(); // Trigger game over if apple reaches the bottom
        } else {
            apple.style.top = `${appleTop + 5}px`;
        }

        checkCollision();
    }, 100);
}

function checkCollision() {
    const basketRect = basket.getBoundingClientRect();
    const appleRect = apple.getBoundingClientRect();

    if (
        appleRect.bottom >= basketRect.top &&
        appleRect.left >= basketRect.left &&
        appleRect.right <= basketRect.right
    ) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        resetApple();
    }
}

function resetApple() {
    clearInterval(appleInterval);
    startGame();
}

function gameOver() {
    clearInterval(appleInterval);
    gameOverDisplay.style.display = 'block'; // Show game over message
    scoreDisplay.textContent = `Final Score: ${score}`; // Show final score
}

function moveBasket(direction) {
    if (direction === 'left' && basketPosition > 0) {
        basketPosition -= 20; // Move left
    } else if (direction === 'right' && basketPosition < 240) {
        basketPosition += 20; // Move right
    }
    basket.style.left = `${basketPosition}px`;
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        moveBasket('left');
    } else if (event.key === 'ArrowRight') {
        moveBasket('right');
    }
});

startGame();
