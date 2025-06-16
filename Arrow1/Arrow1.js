import {
  Sprite,
  Trigger,
  Costume,
  Sound
} from "https://unpkg.com/leopard@1.30.1/dist/index.esm.js";

export default class Arrow1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("arrow", "./Arrow1/costumes/arrow.svg", { x: 0, y: 0 })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  whenGreenFlagClicked() {
    this.goto(-220, 0);
    this.direction = 90;
    this.visible = true;

    let vx = 0;
    let vy = 0;
    let shooting = false;

    while (true) {
      if (this.mouse.down && !shooting) {
        shooting = true;

        const dx = this.mouse.x - this.x;
        const dy = this.mouse.y - this.y;
        const angleRad = Math.atan2(dy, dx);
        const speed = 15;

        vx = speed * Math.cos(angleRad);
        vy = speed * Math.sin(angleRad);
        this.direction = angleRad * 180 / Math.PI;
      }

      if (shooting) {
        this.x += vx;
        this.y += vy;
        vy -= 0.6;

        if (this.x > 260 || this.x < -260 || this.y > 200 || this.y < -200) {
          shooting = false;
          vx = vy = 0;
          this.goto(-220, 0);
          this.direction = 90;
        }
      }

      this.wait(0.03);
    }
  }
}
