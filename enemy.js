const enemyImage = new Image();
enemyImage.src = 'enemy1.png';

export let enemies = [];

export function drawEnemies(ctx, enemies, bullets) {
    enemies.forEach((enemy, index) => {
        enemy.y += 3;
        ctx.drawImage(enemyImage, enemy.x, enemy.y, enemy.width, enemy.height);

        // Logik für Kollision etc.
    });
}

export function spawnEnemy() {
    const xPosition = Math.random() * (canvas.width - 50);
    enemies.push({
        x: xPosition,
        y: -50,
        width: 50,
        height: 50,
    });
}
