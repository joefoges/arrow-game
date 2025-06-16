/* Arrow1.js – projectile-style arrow for a Leopard/Scratch-to-JS project
   – Fires toward the mouse once per click
   – Simple gravity and reset when it leaves the stage
   – Written for Leopard @ ^1 (https://github.com/JoelEinbinder/leopard) */

import {
  Sprite,
  Trigger,
  Costume,
  Sound
} from "leopard";

export default class Arrow1 extends Sprite {
  constructor(...args) {
    super(...args);

    /* ----- assets ---------------------------------------------------- */
    this.costumes = [
      // If your costume file is named differently, adjust the path/name.
      new Costume("arrow", "./Arrow1/costumes/arrow.svg", { x: 0, y: 0 })
    ];

    this.sounds = [
      // Example: new Sound("whoosh", "./Arrow1/sounds/whoosh.wav")
    ];

    /* ----- event triggers ------------------------------------------- */
    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  /* ------------------------------------------------------------------ */
  whenGreenFlagClicked() {
    /* ---------- initial setup -------------------------------------- */
    this.goTo(-220, 0);      // ← corrected capital “T”
    this.direction = 90;     // point right
    this.visible = true;

    /* ---------- state vars ---------------------------------------- */
    let vx = 0;              // horizontal velocity
    let vy = 0;              // vertical   velocity
    let shooting = false;    // “in-flight” flag

    /* ---------- main loop ----------------------------------------- */
    while (true) {
      /* -- fire only on fresh mouse-down --------------------------- */
      if (this.mouse.down && !shooting) {
        shooting = true;

        /* angle & speed toward mouse position */
        const dx = this.mouse.x - this.x;
        const dy = this.mouse.y - this.y;
        const angleRad = Math.atan2(dy, dx);
        const speed   = 15;   // tweak for faster/slower shot

        vx = speed * Math.cos(angleRad);
        vy = speed * Math.sin(angleRad);

        this.direction = angleRad * 180 / Math.PI; // orient arrow
      }

      /* -- update motion each frame -------------------------------- */
      if (shooting) {
        this.x += vx;
        this.y += vy;
        vy     -= 0.6;        // gravity

        /* reset once the arrow leaves the stage */
        if (this.x > 260 || this.x < -260 || this.y > 200 || this.y < -200) {
          shooting = false;
          vx = vy = 0;
          this.goTo(-220, 0);
          this.direction = 90;
        }
      }

      this.wait(0.03);        // ~33 fps
    }
  }
}
