import { player, movePlayer, stopPlayer, drawPlayer } from './player.js';
import { drawEnemies, spawnEnemy } from './enemy.js';
import { drawBullets } from './bullet.js';
import { drawLives, collisionDetection, loseLife, resetGame, gameOver } from './utils.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bullets = [];
let enemies = [];
let lives = 3;

function update() {
    player.x += player.dx;
    // Begrenzungen
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer(ctx);
    drawBullets(ctx, bullets);
    drawEnemies(ctx, enemies, bullets);
    drawLives(ctx, lives);
}

setInterval(spawnEnemy, 2000);
setInterval(update, 1000 / 60);

document.addEventListener('keydown', movePlayer);
document.addEventListener('keyup', stopPlayer);
