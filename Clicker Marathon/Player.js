// Player.js

import PlayerStates from "./PlayerStates.js";
import SpriteAnimation from "./SpriteAnimation.js";

export default class Player {
  constructor() {
    this.state = PlayerStates.idle;
    this.#createAnimations();
    this.x = .2; // Initial X position
    this.y = 20; // Initial Y position
    document.addEventListener("keydown", this.#keydown);
    document.addEventListener("keyup", this.#keyup);
  }

  draw(ctx) {
    this.#setState();
    const animation = this.animations.find((animation) =>
      animation.isFor(this.state)
    );

    const image = animation.getImage();

    ctx.drawImage(image, this.x, this.y, 100, 90);
  }

  #setState() {
    if (this.rightPressed) {
      this.state = PlayerStates.walk;
      this.x += 5; // Adjust the value based on the desired movement speed
    } else {
      this.state = PlayerStates.idle;
    }
  }

  #createAnimations() {
    this.idleAnimation = new SpriteAnimation(
      "Idle (?).png",
      4,
      11,
      PlayerStates.idle
    );
    this.walkAnimation = new SpriteAnimation(
      "Walk (?).png",
      5,
      7,
      PlayerStates.walk
    );

    this.animations = [this.idleAnimation, this.walkAnimation];
  }

  #keydown = (event) => {
    switch (event.code) {
      case "Space":
        this.rightPressed = true;
        break;
    }
  };

  #keyup = (event) => {
    switch (event.code) {
      case "Space":
        this.rightPressed = false;
        break;
    }
  };
}
