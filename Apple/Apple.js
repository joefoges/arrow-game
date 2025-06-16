/* eslint-disable require-yield, eqeqeq */
import {
  Sprite,
  Trigger,
  Costume,
  Sound
} from "https://unpkg.com/leopard@1.30.1/dist/index.esm.js";

export default class Apple extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("apple", "./Apple/costumes/apple.svg", { x: 31, y: 31 }),
    ];

    this.sounds = [new Sound("Chomp", "./Apple/sounds/Chomp.wav")];

    this.triggers = [];
  }
}
