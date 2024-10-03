const enemyImage = new Image();
enemyImage.src = 'enemy1.png';

const explosionImage = new Image();
explosionImage.src = 'explosion1.png'; // Pfad zur Explosion-Bilddatei

export let enemies = [];
let explosions = []; // Array für Explosionen

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

// Explosionen zeichnen
explosions.forEach((explosion, index) => {
    ctx.drawImage(explosionImage, explosion.x, explosion.y, explosion.size, explosion.size);
    explosion.timer--; // Timer für Explosion


    // Explosion entfernen, wenn der Timer abgelaufen ist
    if (explosion.timer <= 0) {
        explosions.splice(index, 1);
    }
});

export function spawnEnemy(canvasWidth) {
    const xPosition = Math.random() * (canvasWidth - 50);
    enemies.push({
        x: xPosition,
        y: -50,
        width: 50,
        height: 50,
    });
}

// Explosion hinzufügen, wenn ein Gegner verschwindet
export function removeEnemyAndAddExplosion(enemy) {
    enemies = enemies.filter(e => e !== enemy); // Gegner entfernen

    // Explosion an der Position des Gegners hinzufügen
    explosions.push({
        x: enemy.x,
        y: enemy.y,
        size: 200, // Größe der Explosion
        timer: 50  // Timer für die Dauer der Explosion
    });
}