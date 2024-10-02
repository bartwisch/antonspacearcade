const enemyImage = new Image();
enemyImage.src = 'enemy1.png';

export let enemies = [];

export function drawEnemies(ctx, enemies, bullets) {
    enemies.forEach((enemy, index) => {
        enemy.y += 3;
        ctx.drawImage(enemyImage, enemy.x, enemy.y, enemy.width, enemy.height);

        // Gegner entfernen, wenn sie den unteren Rand des Bildschirms erreichen
        if (enemy.y > ctx.canvas.height) {
            enemies.splice(index, 1);
        }

        // Logik für Kollision mit Kugeln hinzufügen (optional)
    });
}

export function spawnEnemy(canvasWidth) {
    const xPosition = Math.random() * (canvasWidth - 50);
    enemies.push({
        x: xPosition,
        y: -50,
        width: 50,
        height: 50,
    });
}
