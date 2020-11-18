var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");


var rightPressed = false;
var leftPressed = false;
var lastShoot = new Date();
lastShoot = lastShoot.getTime();


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var player = new Player(canvas.width/2-25,canvas.height);
function keyDownHandler(event){
  var key = event.keyCode;
  if(key == KEY.SPACE){
    player.shoot();
  }
  else if (key == KEY.RIGHT){
    rightPressed = true;
  }
  else if (key == KEY.LEFT){
    leftPressed = true;
  }
  else if (key == KEY.UP){
    player.bulletSpeedUp();
  }
  else if (key == KEY.DOWN){
    player.bulletSpeedDown(3);
  }
}
function keyUpHandler(event){
  var key = event.keyCode;
  if(key == KEY.SPACE){
  }
  else if (key == KEY.RIGHT){
    rightPressed = false;
  }
  else if (key == KEY.LEFT){
    leftPressed = false;
  }
}
function drawInfo(){
  ctx.font = "16px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText("생명 : "+player.life, canvas.width-65, 20);
  ctx.font = "16px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText("획득점수 : "+player.score, 8, 20);
}
function drawPlayer(){
  ctx.beginPath();
  ctx.fillStyle = "#fff"
  ctx.rect(player.x,canvas.height-30,player.width,player.height);
  ctx.fill();
  ctx.closePath();
}
function drawBullets(){
  ctx.beginPath();
  var bullets = player.bullets;
  ctx.fillStyle = "#fdf"
  for(var i = 0; i < bullets.length;i++){
    var bullet = bullets[i];
    //ctx.rect(bullet.x,bullet.y,10,10);
    ctx.rect(bullet.x,bullet.y,bullet.size,bullet.size);
    ctx.fill();
    bullet.move();
    if(bullet.y <= 0){
      bullets.splice(i,1);
    }
  }
  ctx.closePath();
}

function drawEnemyBullets(){
  ctx.beginPath();
  var bullets = Enemy.bullets;
  ctx.fillStyle = "#f00"
  for(var i = 0; i < bullets.length;i++){
    var bullet = bullets[i];
    //ctx.rect(bullet.x,bullet.y,10,10);
    ctx.rect(bullet.x,bullet.y,bullet.size,bullet.size);
    ctx.fill();
    bullet.moveEnemy();
    if(bullet.y >= canvas.height){
      bullets.splice(i,1);
    }
  }
  ctx.closePath();
}


function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  drawInfo();
  drawEnemyBullets();

  drawBullets();
  drawPlayer();

  if(rightPressed){
    player.moveRight(canvas.width);
  }
  else if(leftPressed){
    player.moveLeft();
  }
  requestAnimationFrame(draw);
}
var k = new Enemy(15,0);
k.shoot();
draw();
