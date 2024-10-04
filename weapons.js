export const weapons = {
    basicGun: {
        name: 'Basic Gun',
        fireRate: 500,  // in Millisekunden
        damage: 1,
        autoShoot: false,
    },
    autoBlaster: {
        name: 'Auto Blaster',
        fireRate: 20,   // in Millisekunden
        damage: 1,
        autoShoot: true,
    },
    laserCannon: {
        name: 'Laser Cannon',
        fireRate: 1000, // in Millisekunden
        damage: 3,
        autoShoot: false,
    },
    // Weitere Waffen können hier hinzugefügt werden
};

export function getWeaponByName(weaponName) {
    return weapons[weaponName] || weapons.basicGun; // Fallback zur Standardwaffe
}

