/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Arrow1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("arrow1-a", "./Arrow1/costumes/arrow1-a.svg", {
        x: 28.14483903477199,
        y: 23.163332787810276,
      }),
    ];

    this.sounds = [new Sound("pop", "./Arrow1/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
    ];
  }

 whenGreenFlagClicked() {
  this.goto(-50, 0);
  this.setDirection(90);
  this.show();

  let vx = 0;
  let vy = 0;
  let shooting = false;

  while (true) {
    if (this.mouse.down && !shooting) {
      shooting = true;

      const dx = 240 - this.x;
      const dy = this.mouse.y - this.y;
      const angle = Math.atan2(dy, dx);
      const speed = 15;

      vx = speed * Math.cos(angle);
      vy = speed * Math.sin(angle);

      this.setDirection(angle * 180 / Math.PI);
    }

    if (shooting) {
      this.x += vx;
      this.y += vy;
      vy -= 0.6; // gravity

      // Reset when off screen
      if (this.x > 260 || this.x < -260 || this.y < -200 || this.y > 200) {
        shooting = false;
        vx = vy = 0;
        this.goto(-50, 0);
        this.setDirection(90);
      }
    }

    this.wait(0.03);
  }
}

  *whenGreenFlagClicked2() {
    while (true) {
      if (this.mouse.down) {
        this.createClone();
      }
      yield;
    }
  }

  *startAsClone() {
    this.visible = true;
    while (
      !(
        this.touching("edge") ||
        this.touching(this.sprites["Apple"].andClones())
      )
    ) {
      this.move(10);
      yield;
    }
    yield* this.wait(1);
    this.deleteThisClone();
  }

  *startAsClone2() {
    while (true) {
      if (this.touching(this.sprites["Apple"].andClones())) {
        this.say("you win");
      }
      yield;
    }
  }
}
