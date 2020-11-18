class Enemy{
  static bullets = [];
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  shoot(){
    Enemy.bullets.push(new Bullet(this.x,this.y));
  }
}

class Player{
  constructor(x,y){
    this.life = 3;
    this.moveSpeed = 5;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.bulletSpeed = 2;
    this.bulletSize = 10;
    this.score = 0;
    this.shootDelay = 300;
    this.lastShoot = new Date().getTime();
    this.bullets = [];
    this.height = 20;
  }
  getDamage(){
    this.life--;
    this.moveSpeed = 5;
    this.bulletSpeed = 1;
    this.bulletSize = 10;
    this.width = 50;
    this.shootDelay = 300;
  }
  moveSpeedUp(speed=2){
    this.moveSpeed += speed;
    if(this.moveSpeed < 20){
      this.moveSpeed = 20;
    }
  }
  bulletSpeedUp(up=1){
    this.bulletSpeed += up
    if(this.bulletSpeed <15){
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
      this.lastShoot = now;
      this.bullets.push(
        new Bullet(
          this.x+(this.width/2),this.y-20,
          this.bulletSize,
          this.bulletSpeed
        )
      )
    }
  }

  bulletShootDelayDown(){
    this.shootDelay-=50;
    if (this.shootDelay <=0){
      shootDelay = 0;
    }
  }
  lifeUp(){
    this.life++;
  }
  getItemEffect(effect){
    if(effect === ITEM_EFFECT.MOVE_SPEED_UP){
      this.moveSpeedUp();
    }
    else if(effect === ITEM_EFFECT.BULLET_SHOOT_SPEED_UP){
      this.bulletSpeedUp();
    }
    else if(effect === ITEM_EFFECT.BULLET_SHOOT_DELAY_DOWN){
      this.bulletShootDelayDown();
    }
    else if(effect === ITEM_EFFECT.LIFE_UP){
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
    }
    move(){
      this.y -= this.speed;
    }
    moveEnemy(){
      this.y += this.speed;
    }
}
class Item{
  constructor(x){
    this.x = x;
    this.y = 0;
    var jbRandom = Math.random();
    this.itemEffect = Math.floor( jbRandom * 4 );// 0~3 까지 랜덤
  }
}
