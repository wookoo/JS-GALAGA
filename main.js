var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");


var rightPressed = false;
var leftPressed = false;
var lastShoot = new Date().getTime();
var items = [];
var lastItemMake = new Date().getTime();

var itemMakeDelay = Math.floor((Math.random()*3000)+1500);
var requestId = null;

var enemys = [];

Item.setStatic(ctx,canvas);


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
    pause();
  }
  else if (key == KEY.DOWN){
  //  player.bulletSpeedDown(3);
  createEnemy();
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
  document.getElementById("lastEquipItem").innerHTML = player.lastEquipItem;
  var accuracy = Math.floor(player.catched /player.shooted *100) + "%";
  if(player.shooted === 0){
    accuracy = "0%";
  }
  document.getElementById("accuracy").innerHTML = accuracy;
}

function drawPlayer(){
  var img = player.img;
  ctx.beginPath();
  ctx.drawImage(img,player.x,canvas.height-player.height-20,player.width,player.height);
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

function createItem(){
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
    ctx.drawImage(item.img,item.x,item.y,item.width,item.height);
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
    if(player.isHit(item.x,item.y,item.width,item.height)){
      player.getItemEffect(item.itemEffect,item.score);
      items.splice(i,1);
      itemSound.play();
    }
  }
}
function hitBulletDectect(){ //내가 맞는지 검사
  var bullets = Enemy.bullets;
  for(var i = 0; i < bullets.length; i++){
    var bullet = bullets[i];
    if(player.isHit(bullet.x,bullet.y,bullet.size,bullet.size)){
      bullets.splice(i,1);
      player.getDamage();
      damageSound.play();
    }
  }
}

function hitBulletDectectEnemy(){
  var bullets =  player.bullets;
  for(var i = 0; i < bullets.length;i++){
    for(var j = 0; j < enemys.length;j++){
      var enemy = enemys[j];
      var bullet = bullets[i];
      var isHit = enemy.isHit(bullet.x,bullet.y,bullet.size);
      if(isHit){
        player.catched++;
        player.scoreUp(enemy.score);
        bullets.splice(i,1);
        enemys.splice(j,1);

        return;
      }
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

function createEnemy(){
  var ENEMY_CREATE_WIDTH = (canvas.width/MAX_ENEMY_SIZE) - 1;

  if(!Boolean(enemys.length)){
    //var tempArr = [];
    for(var i = 0; i < ENEMY_CREATE_WIDTH*5;i++){
      var flag = Math.floor(Math.random()*2);
      var row = Math.floor(i/ENEMY_CREATE_WIDTH);
      var col = i%ENEMY_CREATE_WIDTH;
      if(flag == 1){
        //생성되었으면
        enemys.push(new Enemy(col*MAX_ENEMY_SIZE+10,row*MAX_ENEMY_SIZE+10));
        console.log("create");
      }

    }
  }


}

function drawEnemy(){
  ctx.beginPath();
  for(var i = 0; i < enemys.length;i++){
    var enemy = enemys[i];
    var img = enemy.img;//enemy.img;
  //  console.log(img);
    ctx.drawImage(img,enemy.x,enemy.y,enemy.size,enemy.size);
    //ctx.rect(enemy.x, enemy.y, enemy.size, enemy.size);
    //console.log(enemy.score);
    enemy.shoot();
    enemy.move();
  }

  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}

function pause(){
  if(!requestId){
    draw();
    return;
  }
  cancelAnimationFrame(requestId);
  requestId = null;

  ctx.beginPath();
  ctx.rect(canvas.width/2-50, canvas.height/2-30, 110, 40);
  ctx.fillStyle = "#fff";
  ctx.fill();

  ctx.font = '30px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText('Pause', canvas.width/2-40, canvas.height/2);
  ctx.closePath();
}

function gameOver(){

  cancelAnimationFrame(requestId);
  ctx.beginPath();
  ctx.rect(canvas.width/2-80, canvas.height/2-30, 160, 40);
  ctx.fillStyle = "#fff";
  ctx.fill();

  ctx.font = '30px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText('GameOver', canvas.width/2-80, canvas.height/2);
  ctx.closePath();
  alert("게임 오버");
  document.location.reload();
}


function draw(){
  showInfo();
  ctx.clearRect(0, 0, canvas.width, canvas.height);



  drawEnemyBullets();
  createItem();
  drawItem();
  drawBullets();
  drawPlayer();
  createEnemy();
  drawEnemy();
  hitItemDectect();
  hitBulletDectectEnemy();
  hitBulletDectect();


  if(rightPressed){
    player.moveRight(canvas.width);
  }
  else if(leftPressed){
    player.moveLeft();
  }
  requestId = requestAnimationFrame(draw);
  if(player.life<=0 ){
    //alert("게임 오버");
    gameOver();
    //document.location.reload();
  }
}
draw();
