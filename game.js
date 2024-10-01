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

// Draw player using the image
function drawPlayer() {
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
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

        // Check collision with player (game over logic can be implemented here)
        if (collisionDetection(player, enemy)) {
            alert('Game Over');
            document.location.reload();
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

// Collision detection
function collisionDetection(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
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

    drawPlayer();  // Now draw the player using the image
    drawBullets();
    drawEnemies();
}

// Spawn enemies at intervals
setInterval(spawnEnemy, 2000);

// Game update loop
setInterval(update, 1000 / 60);

document.addEventListener('keydown', movePlayer);
document.addEventListener('keyup', stopPlayer);



