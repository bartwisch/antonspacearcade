export function drawLives(ctx, lives) {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Lives: ' + lives, 20, 30);
}

export function collisionDetection(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

export function loseLife() {
    lives--;
    if (lives <= 0) {
        gameOver();
    }
}

export function resetGame() {
    lives = 3;
    player.x = canvas.width / 2 - 50;
    enemies = [];
    bullets = [];
}

export function gameOver() {
    alert('Game Over! Resetting...');
    resetGame();
}
