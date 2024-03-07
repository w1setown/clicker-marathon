import PlayerStates from "./PlayerStates.js";
import SpriteAnimation from "./SpriteAnimation.js";

export default class Player {
  constructor() {
    this.state = PlayerStates.idle;
    this.#createAnimations();
    document.addEventListener("keydown", this.#keydown);
    document.addEventListener("keyup", this.#keyup);

    this.width = 50; // Adjust the width of the hitbox
    this.height = 70; // Adjust the height of the hitbox
    this.hitbox = {
      x: 143, // Initial x position of the hitbox
      y: 665, // Initial y position of the hitbox
    };

    
  }

  draw(ctx) {
    this.#setState();
    const animation = this.animations.find((animation) =>
      animation.isFor(this.state)
    );

    const image = animation.getImage();

    const x = 100;
    let y = 645;

    const x2 = this.hitbox.x;
    const y2 = this.hitbox.y;

    console.log('Player Position:', x, y);

    if (this.state == PlayerStates.slide) {
      y = 645;
    }

    ctx.drawImage(image, x, y);
    this.#drawHitbox(ctx, x2, y2); // Draw the hitbox
  }

  #setState() {
    if (this.slidePressed) {
      this.state = PlayerStates.slide;
    } else if (this.jumpPressed) {
      this.state = PlayerStates.jump;
    } else if (this.runPressed && this.rightPressed) {
      this.state = PlayerStates.run;
    } else if (this.rightPressed) {
      this.state = PlayerStates.walk;
    } else {
      this.state = PlayerStates.idle;
    }
  }

  #createAnimations() {
    this.idleAnimation = new SpriteAnimation(
      "Walk (?).png",
      3,
      9,
      PlayerStates.idle
    );

    this.jumpAnimation = new SpriteAnimation(
      "Jump (?).png",
      7,
      8,
      PlayerStates.jump
    );

    this.slideAnimation = new SpriteAnimation(
      "Slide (?).png",
      2,
      9,
      PlayerStates.slide
    );

    this.animations = [
      this.idleAnimation,
      this.jumpAnimation,
      this.slideAnimation,
    ];
  }

  #keydown = (event) => {
    switch (event.code) {
      case "ArrowDown":
        this.slidePressed = true;
        break;
      case "ShiftLeft":
        this.runPressed = true;
        break;
      case "ArrowUp":
        if (!this.jumpPressed) {
          this.jumpPressed = true;
          this.jumpAnimation.reset();
        }
        break;
    }
  };

  #keyup = (event) => {
    switch (event.code) {
      case "ArrowDown":
        this.slidePressed = false;
        break;
      case "ShiftLeft":
        this.runPressed = false;
        break;
      case "ArrowUp":
        this.jumpPressed = false;
        break;
    }
  };

  #drawHitbox(ctx, x, y) {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, this.width, this.height);
  }
}
