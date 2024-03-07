import PlayerStates from "./PlayerStates.js";
import SpriteAnimation from "./SpriteAnimation.js";

export default class Player {
  constructor() {
    this.state = PlayerStates.idle;
    this.#createAnimations();
    document.addEventListener("keydown", this.#keydown);
    document.addEventListener("keyup", this.#keyup);
  }

  draw(ctx) {
    this.#setState();
    const animation = this.animations.find((animation) =>
      animation.isFor(this.state)
    );

    const image = animation.getImage();

    const x = 100;
    let y = 700;
    
    if (this.state === PlayerStates.jump) {
      const jumpFrame = animation.currentFrameIndex;

      // Adjust the y-coordinate based on the jump frame
      if (jumpFrame >= 1 && jumpFrame <= 4) {
        // Increase y during the ascent (1st to 4th frame)
        y -= jumpFrame * 100; // Adjust the multiplier as needed
      } else if (jumpFrame >= 5 && jumpFrame <= 7) {
        // Decrease y during the descent (5th to 7th frame)
        y += (jumpFrame - 4) * 100; // Adjust the multiplier as needed
      }
    }
    console.log('Player Position:', x, y);

    if (this.state == PlayerStates.slide) {
      y = 700;
    }

    ctx.drawImage(image, x, y);
    
  }

  #setState() {
    if (this.deadPressed) {
      this.state = PlayerStates.dead;
    } else if (this.slidePressed) {
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
      "Idle (?).png",
      3, // Frame antal
      9, // Frame rate
      PlayerStates.idle
    );
    this.walkAnimation = new SpriteAnimation(
      "Walk (?).png",
      5, // Frame antal
      8, // Frame rate
      PlayerStates.walk
    );

    this.jumpAnimation = new SpriteAnimation(
      "Jump (?).png",
      7, // Frame antal
      8, // Frame rate
      PlayerStates.jump
    );

    this.slideAnimation = new SpriteAnimation(
      "Slide (?).png",
      2, // Frame antal
      9, // Frame rate
      PlayerStates.slide
    );

    this.animations = [
      this.idleAnimation,
      this.walkAnimation,
      this.jumpAnimation,
      this.slideAnimation,
    ];
  }

  #keydown = (event) => {
    switch (event.code) {
      case "ArrowRight":
        this.rightPressed = true;
        break;
      case "ArrowDown":
        this.slidePressed = true;
        break;
      case "ShiftLeft":
        this.runPressed = true;
        break;
      case "ArrowUp":
        this.jumpPressed = true;
        break;
    }
  };

  #keyup = (event) => {
    switch (event.code) {
      case "ArrowRight":
        this.rightPressed = false;
        break;
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
}
