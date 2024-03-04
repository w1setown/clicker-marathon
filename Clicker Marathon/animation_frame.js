// JavaScript Animation (index.js)
import PlayerStates from "./PlayerStates.js";
import SpriteAnimation from "./SpriteAnimation.js";

const canvas = document.createElement('canvas');
document.body.append(canvas);
const ctx = canvas.getContext('2d');
canvas.width = 2000 / 2.4; // Adjust canvas size here
canvas.height = 2000 / 3.5; // Adjust canvas size here

const player = new Player();

function game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);

    if (player.x > canvas.width - Player.width) {
        player.x = canvas.width - Player.width;
    }
}

setInterval(game, 1000 / 60);