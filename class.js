class Enemy{
  static bullets = [];
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.size = DEFAULT_ENEMY_SIZE;
    this.score = Math.floor( Math.random() * 150+100 );// 100~250 까지 랜덤
    var img_index = Math.floor(Math.random()*ENEMY_IMAGES.length);
    this.img = ENEMY_IMAGES[img_index];
    this.lastShoot = new Date().getTime();
    this.delay = Math.floor((Math.random()*1500))+Math.floor((Math.random()*2000))+2000;
    console.log(this.delay);
    this.isShoot = false;
    this.MAX_MOVE = this.x + 15;
    this.START_X = x;
    this.moveSpeed = 1;
    this.lastMove = new Date().getTime();
    this.isAttack = false;
  }
  shoot(){

    var now = new Date().getTime();
    if(now-this.lastShoot >this.delay && Math.floor(Math.random()*1000)==1 ){
      this.isShoot = !this.isShoot;
    //if((now - lastShoot) > 1000){
      Enemy.bullets.push(new Bullet(this.x+this.size/2,this.y));
      this.lastShoot = now;
      this.delay = Math.floor((Math.random()*1500))+Math.floor((Math.random()*2000))+2000;
    }
    //확률적으로 쏘게 만들기, 생성된지 3초가 지나고 마지막으로 쏜게 3초가 지나고 5000분의1
  }
  isHit(x,y,width,height){
    if(this.x < x+width && this.x+this.size > x && this.y > y-this.size && y < this.y){
      return true;
    }
    return false;
  }
  move(){
    if(this.isAttack){
      this.y++;
      return;
    }
    var now = new Date().getTime();
    if(now - this.lastMove > 100){
      this.x+=this.moveSpeed;
      if(this.x > this.MAX_MOVE){
        this.moveSpeed = -(this.moveSpeed);
      }
      if(this.x < this.START_X){
        this.moveSpeed = -(this.moveSpeed);
      }
      this.lastMove = now;
    }

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
  isHit(x,y,width,height){
    if((x-this.width)<this.x && this.x < (x +width) &&
  (y+height)>this.y-30 && (y-this.height)<this.y-30){
    return true;
  }
  return false;
  }
}
class Bullet{
    constructor(x,y,bulletSize=10,speed=1){
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
    this.y = 150;
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
