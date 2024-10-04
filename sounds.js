// sounds.js

// Sounds laden
const laserSound = new Audio('bullet1.mp3'); // Pfad zur Audio-Datei anpassen
const explosionSound = new Audio('explosion1.mp3'); // Pfad zur Audio-Datei anpassen

// Funktion zum Abspielen des Laser-Sounds
export function playLaserSound() {
    laserSound.currentTime = 0; // Setzt den Sound auf den Anfang zurück, falls er schnell hintereinander abgespielt wird
    laserSound.play();
}

export function playExplosionSound() {
    explosionSound.currentTime = 0; // Setzt den Sound auf den Anfang zurück, falls er schnell hintereinander abgespielt wird
    explosionSound.play();
}