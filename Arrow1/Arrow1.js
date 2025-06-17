import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

/*  Arrow1.js  –  projectile version
    • Fires toward the mouse once per click
    • Simple gravity (vy -= 0.6)
    • Resets to the bow when it leaves the stage
*/
export default class Arrow1 extends Sprite {
  constructor(...args) {
    super(...args);

    /* ---- assets --------------------------------------------------- */
    this.costumes = [
      // Adjust the file name / path if yours differs
      new Costume("arrow1-a", "./arrow1-a.svg", { x: 8, y: 0 })
    ];
    this.sounds = [];

    /* ---- event triggers ------------------------------------------ */
    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  /* --------------------------------------------------------------- */
  *whenGreenFlagClicked() {        // ← generator (note the asterisk *)
    /* set-up */
    this.goto(-50, 0);            // start just left of the cat’s bow
    this.direction = 90;          // point right
    this.visible = true;

    /* state */
    let vx = 0;                   // horizontal velocity
    let vy = 0;                   // vertical   velocity
    let shooting = false;

    while (true) {
      /* fire on a fresh mouse-down */
      if (this.mouse.down && !shooting) {
        shooting = true;

        const dx = this.mouse.x - this.x;
        const dy = this.mouse.y - this.y;
        const angle = Math.atan2(dy, dx);
        const speed = 15;         // tweak for faster / slower shot

        vx = speed * Math.cos(angle);
        vy = speed * Math.sin(angle);
        this.direction = angle * 180 / Math.PI;   // orient the arrow
      }

      /* per-frame motion while in flight */
      if (shooting) {
        this.x += vx;
        this.y += vy;
        vy -= 0.6;                // gravity

        /* reset when the arrow leaves the visible stage */
        if (
          this.x > 260 || this.x < -260 ||
          this.y > 200 || this.y < -200
        ) {
          shooting = false;
          vx = vy = 0;
          this.goto(-50, 0);
          this.direction = 90;
        }
      }

      /* advance one frame (~33 fps) */
      yield* this.wait(0.03);
    }
  }
}
