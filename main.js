var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");


var rightPressed = false;
var leftPressed = false;
var lastShoot = new Date().getTime();
var items = [];
var lastItemMake = new Date().getTime();

var itemMakeDelay = Math.floor((Math.random()*3000)+1500);


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
  //  printData();
  }
  else if (key == KEY.DOWN){
  //  player.bulletSpeedDown(3);
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
function showInfo(){
  document.getElementById("score").innerHTML = player.score;
  document.getElementById("life").innerHTML = player.life;
  document.getElementById("moveSpeed").innerHTML = player.moveSpeed;
  document.getElementById("shootDelay").innerHTML = player.shootDelay;
  document.getElementById("bulletSpeed").innerHTML = player.bulletSpeed;
  document.getElementById("shooted").innerHTML = player.shooted;
  document.getElementById("equipItems").innerHTML = player.equipItems;
  document.getElementById("catched").innerHTML = player.catched;
  var accuracy = Math.floor(player.catched /player.shooted *100) + "%";
  if(player.shooted === 0){
    accuracy = "0%";
  }
  document.getElementById("accuracy").innerHTML = accuracy;
}
function drawPlayer(){
  ctx.beginPath();
  ctx.fillStyle = "#ffffff"
  ctx.rect(player.x,canvas.height-30,player.width,player.height);
  ctx.fill();
  ctx.closePath();
}
function drawBullets(){
  ctx.beginPath();
  var bullets = player.bullets;
  ctx.fillStyle = "#ffffff"
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

function makeItem(){
  var now = new Date().getTime();
  if(now -lastItemMake >= itemMakeDelay ){
    items.push(new Item(Math.floor( Math.random() * (canvas.width-ITEM_WIDTH))));
    lastItemMake = now;
    itemMakeDelay = Math.floor((Math.random()*3000)+5300);
  }

}

function drawItem(){
  ctx.beginPath();

  for(var i = 0; i < items.length;i++){
    var item = items[i];
    ctx.fillStyle = item.color
    ctx.rect(item.x,item.y,item.width,item.height);
    ctx.fill();
    item.move();
    item.rotateColor();
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

      player.getItemEffect(item.itemEffect,item.score);
      items.splice(i,1);
      //아이템 획득 소리 추가
      itemSound.play();
    }
  }
}

function hitBulletDectectEnemy(){
  var bullets =  player.bullets;
  for(var i = 0; i < bullets.length;i++){

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
  showInfo();
  ctx.clearRect(0, 0, canvas.width, canvas.height);



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
draw();
