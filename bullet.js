import { player } from './player.js'; // Damit du die Position des Spielers kennst

export let bullets = [];

const bulletImage = new Image();
bulletImage.src = 'bullet1.png'; // Pfad zur Explosion-Bilddatei
/*
export function drawBullets(ctx, bullets) {
    bullets.forEach((bullet, index) => {
        bullet.y -= 7;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        if (bullet.y + bullet.height < 0) {
            bullets.splice(index, 1); // Entferne Kugeln, die aus dem Bildschirm sind
        }
    });
}
*/

// Explosionen zeichnen und aktualisieren
export function drawBullets(ctx) {
    bullets.forEach((bullet, index) => {
        bullet.y -= 7;
        ctx.drawImage(bulletImage, bullet.x, bullet.y,  bullet.width, bullet.height);
        

        if (bullet.y + bullet.height < 0) {
            bullets.splice(index, 1); // Entferne Kugeln, die aus dem Bildschirm sind
        }
    });
}


export function shootBullet() {
    const bullet = {
        x: player.x + player.width / 2 - 2.5, // Mittig auf dem Spieler
        y: player.y,
        width: 5,
        height: 10,
    };
    bullets.push(bullet); // Füge die Kugel zur Liste hinzu
}
