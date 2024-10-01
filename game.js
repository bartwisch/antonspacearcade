const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load player image
const playerImage = new Image();
playerImage.src = 'player1.png';  // Path to your PNG file


// Load enemy image
const enemyImage = new Image();
enemyImage.src = 'enemy1.png';  // Path to your enemy PNG file

// Load sound files
const shootSound = new Audio('laser1.mp3');
const explosionSound = new Audio('explosion1.mp3');

playerImage.onload = function() {
    drawPlayer();
};

enemyImage.onload = function() {
    spawnEnemy();
};


// Function to play shooting sound
function shootBullet() {
    bullets.push({
        x: player.x + player.width / 2 - 5,
        y: player.y,
        width: 5,
        height: 10,
    });
    shootSound.play();  // Play shooting sound
}

// Function to play shooting sound
function shootBullet() {
    bullets.push({
        x: player.x + player.width / 2 - 5,
        y: player.y,
        width: 5,
        height: 10,
    });
    shootSound.play();  // Play shooting sound
}

let player = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    dx: 0,
    dy: 0,
    speed: 5,
};

let bullets = [];
let enemies = [];
let bulletSpeed = 7;
let enemySpeed = 3;
let lives = 3;

// Draw player using the image
function drawPlayer() {
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
}

// Function to draw lives count
function drawLives() {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Lives: ' + lives, 20, 30);
}

// Create bullets
function drawBullets() {
    ctx.fillStyle = 'red';
    bullets.forEach((bullet, index) => {
        bullet.y -= bulletSpeed;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        // Remove bullet if it moves off the screen
        if (bullet.y + bullet.height < 0) {
            bullets.splice(index, 1);
        }
    });
}

// Draw enemies using the enemy image
function drawEnemies() {
    enemies.forEach((enemy, index) => {
        enemy.y += enemySpeed;
        ctx.drawImage(enemyImage, enemy.x, enemy.y, enemy.width, enemy.height);  // Draw the enemy as an image

        // Remove enemy if it moves off the screen
        if (enemy.y > canvas.height) {
            enemies.splice(index, 1);
        }

        // Check if the enemy hits the player
        if (collisionDetection(player, enemy)) {
            enemies.splice(index, 1);  // Remove enemy
            loseLife();  // Decrease life
        }

        // Check if a bullet hits an enemy
        bullets.forEach((bullet, bulletIndex) => {
            if (collisionDetection(bullet, enemy)) {
                bullets.splice(bulletIndex, 1);
                enemies.splice(index, 1);  // Remove enemy
                explosionSound.play();  // Play explosion sound
            }
        });
    });
}

// Decrease lives and check for game over
function loseLife() {
    lives--;  // Decrease the number of lives by 1
    if (lives <= 0) {
        gameOver();  // Call the gameOver function when lives run out
    }
}

// Collision detection
function collisionDetection(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// Game over function
function gameOver() {
    alert('Game Over! Resetting...');
    resetGame();  // Reset the game when the player loses all lives
}

// Function to reset the game
function resetGame() {
    lives = 3;  // Reset lives back to 3
    player.x = canvas.width / 2 - 50;  // Reset player position
    enemies = [];  // Clear all enemies
    bullets = [];  // Clear all bullets
}

// Randomly spawn enemies
function spawnEnemy() {
    const xPosition = Math.random() * (canvas.width - 50);
    enemies.push({
        x: xPosition,
        y: -50,
        width: 50,
        height: 50,
    });
}

// Player movement
function movePlayer(e) {
    if (e.key === 'ArrowRight') {
        player.dx = player.speed;
    } else if (e.key === 'ArrowLeft') {
        player.dx = -player.speed;
    } else if (e.key === ' ') {  // Spacebar for shooting
        shootBullet();
    }
}

function stopPlayer(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        player.dx = 0;
    }
}

function update() {
    player.x += player.dx;
    
    // Boundaries for the player to prevent them from moving off-screen
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();  // Draw the player using the image
    drawBullets();  // Draw bullets
    drawEnemies();  // Draw enemies using the image
    drawLives();  // Draw the remaining lives on the screen
}


// Spawn enemies at intervals
setInterval(spawnEnemy, 2000);

// Game update loop
setInterval(update, 1000 / 60);

document.addEventListener('keydown', movePlayer);
document.addEventListener('keyup', stopPlayer);



