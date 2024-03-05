import img from "./img.js";
import Player from "./Player.js";

const canvas = document.getElementById('myCanvas');
document.body.append(canvas);
const ctx = canvas.getContext("2d");
canvas.width = 928;
canvas.height = 793;

const Baggrund1 = document.getElementById('Baggrund1');
const Baggrund2 = document.getElementById('Baggrund2');
const Lag1 = document.getElementById('Lag1');
const Lag2 = document.getElementById('Lag2');
const Lys1 = document.getElementById('Lys1');
const Lag3 = document.getElementById('Lag3');
const Lag4 = document.getElementById('Lag4');
const Lys2 = document.getElementById('Lys2');
const Lag5 = document.getElementById('Lag5');
const Blade = document.getElementById('Blade');
const Jord = document.getElementById('Jord');
const Forgrund = document.getElementById('Forgrund');

const player = new Player();

class Layer{
    constructor(image, movSpeed, y_Position){
        this.x = 0;
        this.y = y_Position;
        this.width = 928;
        this.height = 793;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = movSpeed;
    }

    draw(){
        ctx.drawImage(this.image, this.x, this.y);
        ctx.drawImage(this.image, this.x2, this.y);
    }

    update(){
        if(this.x < -this.width) {
            this.x = this.width - this.speedModifier + this.x2;
        }else{
            this.x -= this.speedModifier;
        }
        if(this.x2 < -this.width) {
            this.x2 = this.width - this.speedModifier + this.x;
        }else{
            this.x2 -= this.speedModifier;
        }
    }
}

const baggrund1Layer = new Layer(Baggrund1, 0, 0);
const baggrund2Layer = new Layer(Baggrund2, 0, 0);
const lag1Layer = new Layer(Lag1, 1, 0);
const lag2Layer = new Layer(Lag2, 1, 0);
const lys1Layer = new Layer(Lys1, .5, 0);
const lag3Layer = new Layer(Lag3, 1, 0);
const lag4Layer = new Layer(Lag4, 1, 0);
const lys2Layer = new Layer(Lys2, 1, 0);
const lag5Layer = new Layer(Lag5, 1, 0);
const bladeLayer = new Layer(Blade, 3, 0);
const jordLayer = new Layer(Jord, 1, 0);
const forgrundLayer = new Layer(Forgrund, 1, 0);

function game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  baggrund1Layer.update();
  baggrund1Layer.draw();

  baggrund2Layer.update();
  baggrund2Layer.draw();

  lag1Layer.update();
  lag1Layer.draw();

  lag2Layer.update();
  lag2Layer.draw();

  lys1Layer.update();
  lys1Layer.draw();

  lag3Layer.update();
  lag3Layer.draw();

  lag4Layer.update();
  lag4Layer.draw();

  lys2Layer.update();
  lys2Layer.draw();

  lag5Layer.update();
  lag5Layer.draw();

  bladeLayer.update();
  bladeLayer.draw();

  jordLayer.update();
  jordLayer.draw();

  forgrundLayer.update();
  forgrundLayer.draw();

  player.draw(ctx);
}

setInterval(game, 1000 / 60);