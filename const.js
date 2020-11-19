
const KEY = {
  ESC: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  P: 80,
  Q: 81
};
const ITEM_EFFECT = {
  MOVE_SPEED_UP : 0,
  BULLET_SHOOT_SPEED_UP : 1,
  BULLET_SHOOT_DELAY_DOWN : 2,
  LIFE_UP : 3,
};
const COLOR =[
  "#FF0000",//빨간색
  "#FF7F00",
  "#FFFF00",
  "#00FF00",
  "#0000FF",
  "#4B0082",
  "#9400D3"

]
const ITEM_WIDTH = 20;
const HEART_IMG = new Image();
HEART_IMG.src = "image/heart.png";
const MOVE_SPEED_IMG = new Image();
MOVE_SPEED_IMG.src = "image/move.png";
const SHOOT_DELAY_IMG = new Image();
SHOOT_DELAY_IMG.src = "image/shoot-delay.png";
const BULLET_SPEED_IMG = new Image();
BULLET_SPEED_IMG.src = "image/bullet-speed.png";
const MAX_ENEMY_SIZE = 30;
const DEFAULT_ENEMY_SIZE = 20;

const ITEM_IMAGES =[
  MOVE_SPEED_IMG,
  BULLET_SPEED_IMG,
  SHOOT_DELAY_IMG,
  HEART_IMG
];

const ENEMY_IMG_1 = new Image();
ENEMY_IMG_1.src = "image/enemy1.png"
const ENEMY_IMG_2 = new Image();
ENEMY_IMG_2.src = "image/enemy2.png"
const ENEMY_IMG_3 = new Image();
ENEMY_IMG_3.src = "image/enemy3.png"
const ENEMY_IMG_4 = new Image();
ENEMY_IMG_4.src = "image/enemy4.png"
const ENEMY_IMAGES = [
  ENEMY_IMG_1,
  ENEMY_IMG_2,
  ENEMY_IMG_3,
  ENEMY_IMG_4
];
