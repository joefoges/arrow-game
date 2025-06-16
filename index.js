import {
  Project,
  Sprite,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import KittyCcat from "./KittyCcat/KittyCcat.js";
import AppleCatcher from "./AppleCatcher/AppleCatcher.js";
import Arrow1 from "./Arrow1/Arrow1.js";
import Apple from "./Apple/Apple.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  KittyCcat: new KittyCcat({
    x: -190,
    y: 0,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 1,
  }),
  AppleCatcher: new AppleCatcher({
    x: -190,
    y: 0,
    direction: -33.34070734647699,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 4,
  }),
  Arrow1: new Arrow1({
    x: -190,
    y: 0,
    direction: -33.34070734647699,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 3,
  }),
  Apple: new Apple({
    x: 203.05882352941177,
    y: 144.58823529411765,
    direction: 90,
    rotationStyle: Sprite.RotationStyle.ALL_AROUND,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 2,
  }),
};

const project = new Project(stage, sprites, {
  frameRate: 30, // Set to 60 to make your project run faster
});
export default project;
