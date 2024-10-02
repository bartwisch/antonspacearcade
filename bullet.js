export let bullets = [];

export function drawBullets(ctx, bullets) {
    bullets.forEach((bullet, index) => {
        bullet.y -= 7;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        if (bullet.y + bullet.height < 0) {
            bullets.splice(index, 1);
        }
    });
}
