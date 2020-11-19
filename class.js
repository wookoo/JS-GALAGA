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
    this.width = 50;
    this.bulletSpeed = 2;
    this.bulletSize = 10;
    this.score = 0;
    this.shootDelay = 300;
    this.lastShoot = new Date().getTime();
    this.bullets = [];
    this.height = 20;
    this.shooted = 0;
    this.equipItems = 0;
    this.catched = 0;
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
    this.moveSpeed += 2;
    if(this.moveSpeed > 20){
      this.moveSpeed = 20;
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
          this.x+(this.width/2),this.y-20,
          this.bulletSize,
          this.bulletSpeed
        )
      )
    }
  }

  bulletShootDelayDown(){
    this.shootDelay-=100;
    if (this.shootDelay <=0){
      this.shootDelay = 0;
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
      console.log("이동 속도 업");
    }
    else if(effect === ITEM_EFFECT.BULLET_SHOOT_SPEED_UP){
      this.bulletSpeedUp();
      console.log("발사속도 업");
    }
    else if(effect === ITEM_EFFECT.BULLET_SHOOT_DELAY_DOWN){
      this.bulletShootDelayDown();
      console.log("발사 딜레이 다운");
    }
    else if(effect === ITEM_EFFECT.LIFE_UP){
      console.log("생명 업");
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
    this.width = 20;
    this.height = 20;
    var jbRandom = Math.random();
    this.itemEffect = Math.floor( jbRandom * 4 );// 0~3 까지 랜덤
    this.score = Math.floor(Math.random()*300+100);
    this.colorIndex = Math.floor(Math.random()*7);
    console.log(this.colorIndex);
    this.color = COLOR[this.colorIndex];
    this.lastChanged = new Date().getTime();
  }
  move(){
    this.y += 1;
  }
  rotateColor(){
    var now = new Date().getTime();
    if(now - this.lastChanged > 200){
      this.colorIndex = (this.colorIndex+1)%7;
      this.color = COLOR[this.colorIndex];
      this.lastChanged = now;
    }

  }
}
