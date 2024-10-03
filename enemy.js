const enemyImage = new Image();
enemyImage.src = 'enemy1.png';

let enemyIdCounter = 0; // Zähler für eindeutige IDs

const explosionImage = new Image();
explosionImage.src = 'explosion1.png'; // Pfad zur Explosion-Bilddatei

export let enemies = [];
let explosions = []; // Array für Explosionen

export function drawEnemies(ctx, enemies, bullets) {
    enemies.forEach((enemy, index) => {
        enemy.y += 3;
        ctx.drawImage(enemyImage, enemy.x, enemy.y, enemy.width, enemy.height);

        // Zeige die ID des Gegners anstelle des Index an
        ctx.font = "20px Arial"; // Schriftart und -größe
        ctx.fillStyle = "white"; // Textfarbe
        ctx.fillText(`ID: ${enemy.id}`, enemy.x, enemy.y - 10); // Text über dem Gegner zeichnen

        // Gegner entfernen, wenn sie den unteren Rand des Bildschirms erreichen
        if (enemy.y > ctx.canvas.height) {
            enemies.splice(index, 1);
        }
    });
}

// Explosionen zeichnen und aktualisieren
export function drawExplosions(ctx) {
    explosions.forEach((explosion, index) => {
        ctx.drawImage(explosionImage, explosion.x, explosion.y, explosion.size, explosion.size);
        explosion.timer--; // Timer für Explosion

        // Explosion entfernen, wenn der Timer abgelaufen ist
        if (explosion.timer <= 0) {
            explosions.splice(index, 1);
        }
    });
}

export function spawnEnemy(canvasWidth) {
    const xPosition = Math.random() * (canvasWidth - 50);
    enemies.push({
        id: enemyIdCounter++, // Weisen Sie eine eindeutige ID zu
        x: xPosition,
        y: -50,
        width: 50,
        height: 50,
    });
}


// Explosion hinzufügen, wenn ein Gegner verschwindet
export function removeEnemyAndAddExplosion(enemy) {
    const index = enemies.indexOf(enemy);
    if (index > -1) {
        enemies.splice(index, 1); // Nur den spezifischen Gegner entfernen
    }
    // Explosion an der Position des Gegners hinzufügen
    explosions.push({
        x: enemy.x,
        y: enemy.y,
        size: 50, // Größe der Explosion
        timer: 20  // Timer für die Dauer der Explosion
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