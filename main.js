var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");


var rightPressed = false;
var leftPressed = false;
var lastShoot = new Date();
var items = [];
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
    //player.bulletSpeedUp();
    printData();
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
var create = false;
function makeItem(){
  //아이템 생성부
  if(create){
    return;
  }
  var jbRandom = Math.random();
  items.push(new Item(Math.floor( jbRandom * canvas.width)));
  console.log("아이템생성");
  create = true;
}

function drawItem(){
  ctx.beginPath();
  ctx.fillStyle = "#00f"
  for(var i = 0; i < items.length;i++){
    var item = items[i];
    //ctx.rect(bullet.x,bullet.y,10,10);
    ctx.rect(item.x,item.y,item.width,item.height);
    ctx.fill();
    item.move();
    if(item.y >= canvas.height){
      items.splice(i,1);
    }
  }
  ctx.closePath();
}

function hitItemDectect(){
  for(var i = 0; i < items.length;i++){
    var item = items[i];
    if((item.x-player.width)<player.x && player.x < (item.x + item.width) &&
  (item.y+item.height)>player.y-30 && (item.y-player.height)<player.y-30){
      //아이템 정보 가져오기
      var effect = item.itemEffect;
      console.log(effect)
      player.getItemEffect(effect);
      items.splice(i,1);

    }
  }
}

function printData(){
  //console.log(items[0].x);
  console.log("아이템 :" ,items[0].y);
  //console.log(player.x);
  var item = items[0];
  console.log("플레이어 y :",player.y-30);
  console.log(item.y+item.height);
}


function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  drawInfo();
  drawEnemyBullets();
  makeItem();
  drawItem();
  drawBullets();
  drawPlayer();
  hitItemDectect();

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
