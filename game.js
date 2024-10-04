import { player, movePlayer, stopPlayer, drawPlayer, initPlayer } from './player.js';
import { drawEnemies, spawnEnemy, enemies,removeEnemyAndAddExplosion, drawExplosions } from './enemy.js'; // Importiere enemies
import { drawBullets, bullets, shootBullet } from './bullet.js';
import { drawLives, drawScore, isCollision, loseLife, resetGame, gameOver, lives, score, increaseScore } from './utils.js'; // Import der Variablen und Funktionen
import { playLaserSound, playExplosionSound, playBackgroundMusic, stopBackgroundMusic } from './sounds.js'; // Importiere die Soundfunktion
import { weapons, getWeaponByName } from './weapons.js';



// Standard-Waffe für den Spieler
let currentWeapon = weapons.basicGun;


const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

initPlayer(canvas.width, canvas.height);

//let bulletsToRemove = [];
//let enemiesToRemove = [];

playBackgroundMusic()

// Upgrade Array
const upgrades = [];

// Füge die Upgrade-Zeichnungs- und Upgrade-Sammellogik hinzu
function drawUpgrades(ctx) {
    upgrades.forEach(upgrade => {
        ctx.fillStyle = 'blue';
        ctx.fillRect(upgrade.x, upgrade.y, 20, 20); // Beispielgröße und Position des Upgrades
    });
}

function checkUpgradeCollection() {
    upgrades.forEach((upgrade, index) => {
        if (isCollision(player, upgrade)) {
            upgrades.splice(index, 1); // Entferne das Upgrade
            activateWeaponUpgrade('autoBlaster'); // Waffe ändern (z.B. auf 'autoBlaster')
        }
    });
}

function activateWeaponUpgrade(upgradeName) {
    currentWeapon = getWeaponByName(upgradeName);
    if (currentWeapon.autoShoot) {
        autoShootInterval = setInterval(() => {
            shootBullet();
            playLaserSound();
        }, currentWeapon.fireRate);
    }
}

function spawnUpgrade(x, y) {
    if (Math.random() < 0.1) { // 10% Wahrscheinlichkeit
        upgrades.push({ x, y });
    }
}


function update() {
    // Bewegt den Spieler
    player.x += player.dx;
    player.y += player.dy;

    // Begrenzungen für den Spieler
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;


    // Bildschirm bereinigen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Zeichnen in der richtigen Reihenfolge:
    drawPlayer(ctx);               // Zeichne den Spieler
    drawBullets(ctx, bullets);      // Zeichne die Kugeln (bullets)
    drawEnemies(ctx, enemies, bullets);
    drawLives(ctx, lives);          // Zeichne die Anzahl der Leben
    drawScore(ctx, score);          // Zeichne die Punktzahl
    drawExplosions(ctx);            // Zeichne die Explosionen
    drawUpgrades(ctx);       // Upgrades zeichnen
    checkUpgradeCollection(); // Upgrade-Einsammeln überprüfen

    // Arrays für zu löschende Kugeln und Gegner
    let bulletsToRemove = [];
    let enemiesToRemove = [];

    // Kollisionsprüfung zwischen Kugeln und Gegnern
    bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
            if (isCollision(bullet, enemy)) {
                bulletsToRemove.push(bulletIndex);
                spawnUpgrade(enemy.x, enemy.y); // Spawnt Upgrade mit 10%iger Wahrscheinlichkeit
                removeEnemyAndAddExplosion(enemy);
                playExplosionSound();
                increaseScore();
            }
        });
    });

    // Entferne markierte Kugeln und Gegner in umgekehrter Reihenfolge, um Indizes korrekt zu halten
    bulletsToRemove.reverse().forEach((bulletIndex) => {
        bullets.splice(bulletIndex, 1);
    });
    enemiesToRemove.reverse().forEach((enemyIndex) => {
        enemies.splice(enemyIndex, 1);
    });

    // Kollisionsprüfung zwischen Spieler und Gegnern
    enemies.forEach((enemy, enemyIndex) => {
        if (isCollision(player, enemy)) {
            // Gegner entfernen
            enemies.splice(enemyIndex, 1);
            playExplosionSound();

            // Leben um 1 reduzieren
            loseLife(); // Leben um 1 reduzieren

            // Prüfen, ob das Spiel vorbei ist
            if (lives <= 0) {
                stopBackgroundMusic();
                gameOver(); // Spiel beenden und zurücksetzen

            }
        }
    });
}

// Gegner alle 2 Sekunden spawnen lassen
setInterval(() => spawnEnemy(canvas.width), 500);

// Die `update`-Funktion 60 Mal pro Sekunde aufrufen
setInterval(update, 1000 / 60);

// Tastatur-Ereignisse für die Bewegung des Spielers und das Schießen
document.addEventListener('keydown', movePlayer);
document.addEventListener('keyup', stopPlayer);
document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {  // Leertaste zum Schießen
        shootBullet();
        playLaserSound(); // Laser-Sound abspielen
    }
});


