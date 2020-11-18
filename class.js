class Enemy{

}

class Player{
  constructor(x,y){
    this.life = 3;
    this.moveSpeed = 5;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.bulletSpeed = 1;
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
  moveSpeedUp(speed=3){
    this.moveSpeed += speed;
    if(this.moveSpeed < 20){
      this.moveSpeed = 20;
    }
  }
  bulletSpeedUp(up=2){
    this.bulletSpeed += up
    if(this.bulletSpeed <15){
      this.bulletSpeed = 15;
    }
  }
  bulletSpeedDown(down=2){
    this.bulletSpeed -= down
    if (this.bulletSpeed <=0){
      this.bulletSpeed =1;
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


}
class Bullet{
    constructor(x,y,bulletSize,speed){
      this.x = x;
      this.y = y;
      this.size = bulletSize;
      this.speed = speed;
    }
    move(){
      this.y -= this.speed;
    }
}
class Item{
  
}
