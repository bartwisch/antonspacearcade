export const weapons = {
    basicGun: {
        name: 'Basic Gun',
        fireRate: 500,  // in Millisekunden
        damage: 1,
        autoShoot: false,
        bulletImage: 'bullet1.png',  // Pfad zur Kugel-Grafik
        bulletWidth: 5,  // Breite der Kugel
        bulletHeight: 10, // Höhe der Kugel
        bulletSpeed: 7,  // Geschwindigkeit der Kugel
        bulletSound: new Audio('bullet1.mp3')  // Sound für die Basic Gun
    },
    autoBlaster: {
        name: 'Auto Blaster',
        fireRate: 20,   // in Millisekunden
        damage: 1,
        autoShoot: true,
        bulletImage: 'bullet2.png',  // Unterschiedliche Kugel-Grafik
        bulletWidth: 25,  // Breite der Kugel
        bulletHeight: 20, // Höhe der Kugel
        bulletSpeed: 10,  // Schnellere Kugeln
        bulletSound: new Audio('bullet2.mp3')  // Sound für den Auto Blaster
    },
    laserCannon: {
        name: 'Laser Cannon',
        fireRate: 1000, // in Millisekunden
        damage: 3,
        autoShoot: false,
        bulletImage: 'bullet3.png',  // Andere Grafik für den Laser
        bulletWidth: 50,  // Breite der Kugel
        bulletHeight: 100, // Höhe der Kugel
        bulletSpeed: 5,  // Langsamere, aber größere Kugeln
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

export function drawBullets(ctx) {
    bullets.forEach((bullet, index) => {
        bullet.y -= currentWeapon.bulletSpeed;  // Verwende die Geschwindigkeit der aktuellen Waffe

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

export function shootBullet() {
    const bullet = {
        x: player.x + player.width / 2 - currentWeapon.bulletWidth / 2,
        y: player.y,
        width: currentWeapon.bulletWidth,
        height: currentWeapon.bulletHeight,
        image: currentWeapon.bulletImage,
        lifespan: 2000  // Lebensdauer der Kugel in Millisekunden (2 Sekunden)
    };
    bullets.push(bullet);

    // Entferne die Kugel nach ihrer Lebensdauer
    setTimeout(() => {
        const index = bullets.indexOf(bullet);
        if (index !== -1) {
            bullets.splice(index, 1);  // Entferne die Kugel nach der definierten Lebensdauer
        }
    }, bullet.lifespan);

    // Spiele den Sound der aktuellen Waffe ab
    currentWeapon.bulletSound.currentTime = 0;
    currentWeapon.bulletSound.play();
}
