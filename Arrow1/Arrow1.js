import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

/*  Arrow1.js  –  projectile version
    – Fires toward the mouse once per click
    – Simple gravity (vy -= 0.6)
    – Resets to the bow when it leaves the stage
*/

export default class Arrow1 extends Sprite {
  constructor(...args) {
    super(...args);

    /* ---- assets --------------------------------------------------- */
    this.costumes = [
      new Costume("arrow1-a", "./arrow1-a.svg", { x: 8, y: 0 })
    ];
    this.sounds = [];

    /* ---- debug watchers ------------------------------------------- */
    this.watchers = [
      new Watcher({
        label: "shooting?",
        target: this,
        getter: () => this._shooting
      })
    ];

    /* ---- event triggers ------------------------------------------- */
    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  /* --------------------------------------------------------------- */
  *_reset() {
    this.goto(-50, 0);          // start just left of the bow
    this.direction = 90;        // point right
    this.visible = true;
    this.moveAhead();           // bring arrow to the front layer
  }

  *whenGreenFlagClicked() {
    /* state */
    let vx = 0;
    let vy = 0;
    this._shooting = false;     // exposed via watcher

    yield* this._reset();

    while (true) {
      const mouse = this.stage.mouse;   // reliable mouse reference

      /* fire on a fresh mouse‑down */
      if (mouse.down && !this._shooting) {
        this._shooting = true;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const angle = Math.atan2(dy, dx);
        const speed = 15;

        vx = speed * Math.cos(angle);
        vy = speed * Math.sin(angle);
        this.direction = (angle * 180) / Math.PI;
      }

      /* per‑frame motion while in flight */
      if (this._shooting) {
        this.x += vx;
        this.y += vy;
        vy -= 0.6;              // gravity

        /* reset when the arrow leaves the visible stage */
        if (
          this.x > 260 || this.x < -260 ||
          this.y > 200 || this.y < -200
        ) {
          this._shooting = false;
          vx = vy = 0;
          yield* this._reset();
        }
      }

      yield* this.wait(0.03);
    }
  }
}
