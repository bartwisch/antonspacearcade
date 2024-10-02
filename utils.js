export function drawLives(ctx, lives) {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Lives: ' + lives, 20, 30);
}

export function drawScore(ctx, score) {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 20, 60); // Punktzahl an der gewünschten Position anzeigen
}

export function isCollision(rect1, rect2) {
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

// Funktion zum Zurücksetzen des Spiels
export function resetGame() {
    lives = 3;
    score = 0;
    enemies.length = 0; // Gegnerliste leeren
    bullets.length = 0; // Kugelliste leeren
    initPlayer(canvas.width, canvas.height); // Spieler zurücksetzen
}

export function gameOver() {
    alert('Game Over! Resetting...');
    resetGame();
}
