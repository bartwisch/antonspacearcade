import { player, movePlayer, stopPlayer, drawPlayer, initPlayer } from './player.js';
import { drawEnemies, spawnEnemy, enemies } from './enemy.js'; // Importiere enemies
import { drawBullets, bullets, shootBullet } from './bullet.js';
import { drawLives, isCollision, loseLife, resetGame, gameOver } from './utils.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

initPlayer(canvas.width, canvas.height);

let lives = 3;

function update() {
    // Bewegt den Spieler
    player.x += player.dx;

    // Begrenzungen für den Spieler
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

    // Bildschirm bereinigen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Zeichnen in der richtigen Reihenfolge:
    drawPlayer(ctx);               // Zeichne den Spieler
    drawBullets(ctx, bullets);      // Zeichne die Kugeln (bullets)
    drawEnemies(ctx, enemies, bullets);
    drawLives(ctx, lives);          // Zeichne die Anzahl der Leben

    // Optional: Kollisionsüberprüfungen zwischen Kugeln und Gegnern hier hinzufügen
    // Kollisionsprüfung zwischen Kugeln und Gegnern
    bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
            if (isCollision(bullet, enemy)) {
                // Entferne die getroffene Kugel
                bullets.splice(bulletIndex, 1);

                // Entferne den getroffenen Gegner
                enemies.splice(enemyIndex, 1);
            }
        });
    });
}

// Gegner alle 2 Sekunden spawnen lassen
setInterval(() => spawnEnemy(canvas.width), 2000);

// Die `update`-Funktion 60 Mal pro Sekunde aufrufen
setInterval(update, 1000 / 60);

// Tastatur-Ereignisse für die Bewegung des Spielers und das Schießen
document.addEventListener('keydown', movePlayer);
document.addEventListener('keyup', stopPlayer);
document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {  // Leertaste zum Schießen
        shootBullet();
    }
});
