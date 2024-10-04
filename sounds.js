// sounds.js

// Sounds laden
const laserSound = new Audio('bullet1.mp3'); // Pfad zur Audio-Datei anpassen
const explosionSound = new Audio('explosion1.mp3'); // Pfad zur Audio-Datei anpassen
const backgroundMusic = new Audio('music1.mp3'); // Pfad zur Hintergrundmusik-Datei anpassen


// Funktion zum Abspielen des Laser-Sounds
export function playLaserSound() {
    laserSound.currentTime = 0; // Setzt den Sound auf den Anfang zurück, falls er schnell hintereinander abgespielt wird
    laserSound.play();
}

export function playExplosionSound() {
    explosionSound.currentTime = 0; // Setzt den Sound auf den Anfang zurück, falls er schnell hintereinander abgespielt wird
    explosionSound.play();
}


// Hintergrundmusik im Loop-Modus
backgroundMusic.loop = true; // Die Musik wird wiederholt

// Funktion zum Abspielen der Hintergrundmusik
export function playBackgroundMusic() {
    backgroundMusic.play();
}

// Funktion zum Stoppen der Hintergrundmusik
export function stopBackgroundMusic() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0; // Setzt die Musik auf den Anfang zurück
}