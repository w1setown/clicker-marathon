import img from "./img.js";
import Player from "./Player.js";

const canvas = document.createElement("canvas");
document.body.append(canvas);
const ctx = canvas.getContext("2d");
canvas.width = 2000 / 2.4; // Adjust canvas size here
canvas.height = 2000 / 3.5; // Adjust canvas size here


const background = img("BG.png");
const player = new Player();


function game() {
  ctx.drawImage(background, 0, 0, 2000, 1143, 0, 0, canvas.width, canvas.height); // Use canvas size for image size
  player.draw(ctx);

  if (player.x > canvas.width - Player){
    player.x = canvas.width - Player.width;
  }
}

setInterval(game, 1000 / 60);