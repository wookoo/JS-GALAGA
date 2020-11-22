//상수 정의
const KEY = { //키보드 관련 상수
  ESC: 27,
  SPACE: 32,
  LEFT: 37,
  RIGHT: 39,

};
const ITEM_EFFECT = { //아이템 효과관련상수
  MOVE_SPEED_UP : 0,
  BULLET_SHOOT_SPEED_UP : 1,
  BULLET_SHOOT_DELAY_DOWN : 2,
  LIFE_UP : 3,
};
const ITEM_WIDTH = 20; //기본 아이템 크기
//아이템의 기본 이미지들
const HEART_IMG = new Image();
HEART_IMG.src = "image/heart.png";
const MOVE_SPEED_IMG = new Image();
MOVE_SPEED_IMG.src = "image/move.png";
const SHOOT_DELAY_IMG = new Image();
SHOOT_DELAY_IMG.src = "image/shoot-delay.png";
const BULLET_SPEED_IMG = new Image();
BULLET_SPEED_IMG.src = "image/bullet-speed.png";
//아이템의 기본 이미지들 끝
const MAX_ENEMY_SIZE = 30; //적의 최대 크기
const DEFAULT_ENEMY_SIZE = 20; //적의 기본 크기

const ITEM_IMAGES =[ //아이템 이미지 배열
  MOVE_SPEED_IMG,
  BULLET_SPEED_IMG,
  SHOOT_DELAY_IMG,
  HEART_IMG
];
const NO_OF_HIGH_SCORES = 10; //최고점수 저장 갯수

//적의 이미지들
const ENEMY_IMG_1 = new Image();
ENEMY_IMG_1.src = "image/enemy1.png"
const ENEMY_IMG_2 = new Image();
ENEMY_IMG_2.src = "image/enemy2.png"
const ENEMY_IMG_3 = new Image();
ENEMY_IMG_3.src = "image/enemy3.png"
const ENEMY_IMG_4 = new Image();
ENEMY_IMG_4.src = "image/enemy4.png"
const ENEMY_IMAGES = [ //적 이미지 배열
  ENEMY_IMG_1,
  ENEMY_IMG_2,
  ENEMY_IMG_3,
  ENEMY_IMG_4
];
