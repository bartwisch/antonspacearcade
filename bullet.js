import { player } from './player.js'; // Damit du die Position des Spielers kennst

export let bullets = [];

export function drawBullets(ctx, bullets) {
    bullets.forEach((bullet, index) => {
        bullet.y -= 7;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

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
