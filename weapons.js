import { player } from './player.js';  // Spielerposition

// Liste der Kugeln
export let bullets = [];

// Definiere die Waffen und ihre Eigenschaften
export const weapons = {
    basicGun: {
        name: 'Basic Gun',
        fireRate: 500,
        damage: 1,
        autoShoot: false,
        bulletImage: 'bullet1.png',  // Pfad zur Kugel-Grafik
    },
    autoBlaster: {
        name: 'Auto Blaster',
        fireRate: 20,
        damage: 1,
        autoShoot: true,
        bulletImage: 'bullet2.png',  // Unterschiedliche Kugel-Grafik
    },
    laserCannon: {
        name: 'Laser Cannon',
        fireRate: 1000,
        damage: 3,
        autoShoot: false,
        bulletImage: 'bullet3.png',  // Andere Grafik für den Laser
    },
    // Weitere Waffen können hier hinzugefügt werden
};

// Funktion zum Wechseln der Waffe
export let currentWeapon = weapons.basicGun;  // Standardwaffe

export function switchWeapon(weaponName) {
    currentWeapon = weapons[weaponName];  // Setze aktuelle Waffe
    console.log(`Waffe gewechselt zu: ${currentWeapon.name}`);
    return currentWeapon;  // Rückgabe der neuen Waffe
}

// Explosionen zeichnen und aktualisieren
export function drawBullets(ctx) {
    bullets.forEach((bullet, index) => {
        bullet.y -= 7;

        // Lade das Bullet-Bild der aktuellen Waffe
        const bulletImage = new Image();
        bulletImage.src = bullet.image;  // Verwende das Bild der Kugel, das in shootBullet() zugewiesen wurde

        // Zeichne die Kugel
        bulletImage.onload = () => {  // Warte, bis das Bild geladen ist
            ctx.drawImage(bulletImage, bullet.x, bullet.y, bullet.width, bullet.height);
        };

        // Entferne Kugeln, die aus dem Bildschirm verschwinden
        if (bullet.y + bullet.height < 0) {
            bullets.splice(index, 1);
        }
    });
}

// Funktion zum Schießen einer Kugel
export function shootBullet() {
    const bullet = {
        x: player.x + player.width / 2 - 2.5,  // Kugel in der Mitte des Spielers
        y: player.y,
        width: 5,
        height: 10,
        image: currentWeapon.bulletImage,  // Verwende das Kugel-Bild der aktuellen Waffe
    };
    bullets.push(bullet);  // Füge die Kugel zur Liste hinzu
}
