/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class AppleCatcher extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./AppleCatcher/costumes/costume1.svg", {
        x: 106.84309309309305,
        y: 96.82228579862127,
      }),
    ];

    this.sounds = [new Sound("pop", "./AppleCatcher/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];
  }

  *whenGreenFlagClicked() {
    while (true) {
      this.goto(this.sprites["KittyCcat"].x, this.sprites["KittyCcat"].y);
      this.direction = this.radToScratch(
        Math.atan2(this.mouse.y - this.y, this.mouse.x - this.x)
      );
      yield;
    }
  }
}
