class Enemy{
  static bullets = [];
  constructor(x,y){
    this.x = x;
    this.y = y;
    var jbRandom = Math.random();
    this.score = Math.floor( jbRandom * 150+100 );// 100~250 까지 랜덤
  }
  shoot(){
    //확률적으로 쏘게 만들기
    Enemy.bullets.push(new Bullet(this.x,this.y));
  }
}

class Player{
  constructor(x,y){
    this.life = 3;
    this.moveSpeed = 3;
    this.x = x;
    this.y = y;
    this.width = 30;
    this.bulletSpeed = 2;
    this.bulletSize = 10;
    this.score = 0;
    this.shootDelay = 300;
    this.lastShoot = new Date().getTime();
    this.bullets = [];
    this.height = 30;
    this.shooted = 0;
    this.equipItems = 0;
    this.catched = 0;
    this.lastEquipItem = "NONE";
    this.img = new Image();
    this.img.src = "image/player.png"
  }
  getDamage(){
    this.life--;
    this.moveSpeed = 5;
    this.bulletSpeed = 1;
    this.bulletSize = 10;
    this.width = 50;
    this.shootDelay = 300;
  }
  moveSpeedUp(){
    this.moveSpeed += 1;
    if(this.moveSpeed > 10){
      this.moveSpeed = 10;
    }
  }
  bulletSpeedUp(){
    this.bulletSpeed += 1
    if(this.bulletSpeed > 15){
      this.bulletSpeed = 15;
    }
  }
  bulletSpeedDown(down=1){
    this.bulletSpeed -= down
    if (this.bulletSpeed <=2){
      this.bulletSpeed =2;
    }
  }
  moveRight(MAX){
    if (this.x < MAX-this.width){
      this.x += this.moveSpeed;
    }
  }
  moveLeft(){
    if(this.x > 0){
      this.x -= this.moveSpeed;
    }
  }
  scoreUp(score){
    this.score+=score;
  }
  shoot(){
    var now = new Date().getTime();
    var elapsed = now - this.lastShoot;
    if(elapsed > this.shootDelay){
      shootSound.play();
      //sound.create("sound/shoot.mp3", "shoot_sound").play();
      this.lastShoot = now;
      this.shooted++;
      this.bullets.push(
        new Bullet(
          this.x+(this.width/2),this.y-this.height-20,
          this.bulletSize,
          this.bulletSpeed
        )
      )
    }
  }

  bulletShootDelayDown(){
    this.shootDelay-=50;
    if (this.shootDelay <=50){
      this.shootDelay = 50;
    }
  }
  lifeUp(){
    this.life++;
  }
  getItemEffect(effect,score){
    this.equipItems++;
    this.scoreUp(score);
    if(effect === ITEM_EFFECT.MOVE_SPEED_UP){
      this.moveSpeedUp();
      this.lastEquipItem = "MOVE SPEED";
    }
    else if(effect === ITEM_EFFECT.BULLET_SHOOT_SPEED_UP){
      this.bulletSpeedUp();
      this.lastEquipItem = "BULLET SPEED";
    }
    else if(effect === ITEM_EFFECT.BULLET_SHOOT_DELAY_DOWN){
      this.bulletShootDelayDown();
      this.lastEquipItem = "SHOOT DELAY";
    }
    else if(effect === ITEM_EFFECT.LIFE_UP){
      this.lastEquipItem = "LIFE UP";
      this.lifeUp();
    }
  }
}
class Bullet{
    constructor(x,y,bulletSize=10,speed=2){
      this.x = x;
      this.y = y;
      this.size = bulletSize;
      this.speed = speed;
      this.x = this.x - bulletSize/2;
    }
    move(){
      this.y -= this.speed;
    }
    moveEnemy(){
      this.y += this.speed;
    }
}
class Item{
  static ctx = null;
  static MAX_WIDTH = 0;
  static canvas = null;
  constructor(x){
    this.x = x;
    this.y = 0;
    this.width = ITEM_WIDTH;
    this.height = ITEM_WIDTH;
    var jbRandom = Math.random();
    this.itemEffect = Math.floor( jbRandom * 4 );// 0~3 까지 랜덤
    this.score = Math.floor(Math.random()*300+100);

    this.lastChanged = new Date().getTime();
    this.speedY = Math.floor(Math.random()*2+1);
    this.speedX = Math.floor(Math.random()*2+1);
    this.img = ITEM_IMAGES[this.itemEffect];
  }
  move(){
    this.y += this.speedY;
    this.x += this.speedX;
    if(this.x > Item.MAX_WIDTH){
      this.speedX = - (this.speedX);
    }
    if(this.x < 0){
      this.speedX = - (this.speedX);
    }
  }

  static setStatic(ctx,canvas){
    Item.ctx = ctx;
    Item.MAX_WIDTH = canvas.width;
    Item.canvas = canvas;
  }
}
