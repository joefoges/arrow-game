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

  *whenGreenFlagClicked() {
    this.visible = false;
    while (true) {
      this.goto(this.sprites["AppleCatcher"].x, this.sprites["AppleCatcher"].y);
      this.direction = this.radToScratch(
        Math.atan2(this.mouse.y - this.y, this.mouse.x - this.x)
      );
      yield;
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
