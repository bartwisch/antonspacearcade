export let player = {
    x: 0, // Initial value
    y: 0, // Initial value
    width: 50,
    height: 50,
    dx: 0,
    dy: 0,
    speed: 5,
};
const keysPressed = new Set();

export function initPlayer(canvasWidth, canvasHeight) {
    player.x = canvasWidth / 2 - 50;
    player.y = canvasHeight - 100;
}

const playerImage = new Image();
playerImage.src = 'player1.png';

export function drawPlayer(ctx) {
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
}


export function startPlayer(e) {
    keysPressed.add(e.key);
    if (e.key === 'ArrowRight') {
        player.dx = player.speed;
    } else if (e.key === 'ArrowLeft') {
        player.dx = -player.speed;
    } else if (e.key === 'ArrowUp') {
        player.dy = -player.speed;
    } else if (e.key === 'ArrowDown') {
        player.dy = player.speed;
    }
}

export function stopPlayer(e) {
    keysPressed.delete(e.key);
    if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && !keysPressed.has('ArrowRight') && !keysPressed.has('ArrowLeft')) {
        player.dx = 0;
    }
    if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && !keysPressed.has('ArrowUp') && !keysPressed.has('ArrowDown')) {
        player.dy = 0;
    }
}

