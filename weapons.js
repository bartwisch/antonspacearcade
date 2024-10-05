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
        bulletWidth: 5,  // Breite der Kugel
        bulletHeight: 10, // Höhe der Kugel
        bulletSound: new Audio('bullet1.mp3')  // Sound für die Basic Gun
    },
    autoBlaster: {
        name: 'Auto Blaster',
        fireRate: 20,
        damage: 1,
        autoShoot: true,
        bulletImage: 'bullet2.png',  // Unterschiedliche Kugel-Grafik
        bulletWidth: 25,  // Breite der Kugel
        bulletHeight: 20, // Höhe der Kugel
        bulletSound: new Audio('bullet2.mp3')  // Sound für den Auto Blaster
    },
    laserCannon: {
        name: 'Laser Cannon',
        fireRate: 1000,
        damage: 3,
        autoShoot: false,
        bulletImage: 'bullet3.png',  // Andere Grafik für den Laser
        bulletWidth: 50,  // Breite der Kugel
        bulletHeight: 100, // Höhe der Kugel
        bulletSound: new Audio('sound1.mp3')  // Sound für die Laser Cannon
    }
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
        x: player.x + player.width / 2 - currentWeapon.bulletWidth / 2,  // Kugel in der Mitte des Spielers
        y: player.y,
        width: currentWeapon.bulletWidth,  // Verwende die Breite der aktuellen Waffe
        height: currentWeapon.bulletHeight,  // Verwende die Höhe der aktuellen Waffe
        image: currentWeapon.bulletImage,  // Verwende das Kugel-Bild der aktuellen Waffe
    };
    bullets.push(bullet);  // Füge die Kugel zur Liste hinzu

    // Spiele den Sound der aktuellen Waffe ab
    currentWeapon.bulletSound.currentTime = 0;  // Setze den Sound zurück, damit er erneut abgespielt wird
    currentWeapon.bulletSound.play();
}
