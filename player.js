export let player = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    dx: 0,
    speed: 5,
};

const playerImage = new Image();
playerImage.src = 'player1.png';

export function drawPlayer(ctx) {
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
}

export function movePlayer(e) {
    if (e.key === 'ArrowRight') {
        player.dx = player.speed;
    } else if (e.key === 'ArrowLeft') {
        player.dx = -player.speed;
    }
}

export function stopPlayer(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        player.dx = 0;
    }
}
