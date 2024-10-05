export const weapons = {
    basicGun: {
        name: 'Basic Gun',
        fireRate: 500,
        damage: 1,
        autoShoot: false,
    },
    autoBlaster: {
        name: 'Auto Blaster',
        fireRate: 20,
        damage: 1,
        autoShoot: true,
    },
    laserCannon: {
        name: 'Laser Cannon',
        fireRate: 1000,
        damage: 3,
        autoShoot: false,
    },
};

// Variable für die aktuelle Waffe
export let currentWeapon = weapons.basicGun;  // Standardwaffe

// Funktion zum Wechseln der Waffe
export function switchWeapon(weaponName) {
    currentWeapon = weapons[weaponName];  // Setze aktuelle Waffe
    console.log(`Waffe gewechselt zu: ${currentWeapon.name}`);  // Ausgabe zur Kontrolle
    return currentWeapon;  // Rückgabe der neuen Waffe
}