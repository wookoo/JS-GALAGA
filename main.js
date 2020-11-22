var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");


var rightPressed = false;
var leftPressed = false;
var items = []; //생성된 아이템을 담는 변수
var lastItemMake = new Date().getTime();

var itemMakeDelay = Math.floor((Math.random()*3000)+1500);
var requestId = null;

var enemys = []; //생성된 적을 담는 변수

Item.setStatic(ctx,canvas); //Item클래스의 setStatic메소드로 static 변수 설정


document.addEventListener("keydown", keyDownHandler, false); //키다운 이벤트 리스너생성
document.addEventListener("keyup", keyUpHandler, false); //키업 이벤트 리스너 생성

var player = new Player(canvas.width/2-25,canvas.height); //player 객체 생성,캔버스 중앙 및 캔버스의 높히
function keyDownHandler(event){ //키가 눌렸을때 할 일
  var key = event.keyCode;
  if(key == KEY.SPACE){ //스페이스바를 누르면
    player.shoot(); //player의 shoot 메소드 호출
  }
  if (key == KEY.RIGHT){ //오른쪽 방향키를 누르면
    rightPressed = true; //rightPressed 를 true 로 설정
  }
  if (key == KEY.LEFT){ //왼쪽 방향키를 누르면
    leftPressed = true; //leftPressed 를 true 로 설정
  }
  if (key == KEY.ESC){ //esc 키를 누르면
    pause(); //pause 호출로 게임 일시 중지
  }
}
function keyUpHandler(event){ //키가 떼어질때 할 일
  var key = event.keyCode;
  if (key == KEY.RIGHT){ //오른쪽 버튼을 떼면
    rightPressed = false; //rightPressed 를 false 로 설정
  }
  if (key == KEY.LEFT){ //왼쪽 버튼을 떼면
    leftPressed = false; //leftPressed 를 false 로 설정
  }
}
function showInfo(){ //오른쪽에 정보 창 설정
  document.getElementById("score").innerHTML = player.score; //페이지의 id 가 score 인 태그 안의 내용을 player 멤버 score 로 설정 / 획득점수
  document.getElementById("life").innerHTML = player.life; //페이지의 id 가 life 인 태그 안의 내용을 player 멤버 life 로 설정 / 남은 목숨
  document.getElementById("moveSpeed").innerHTML = player.moveSpeed;  //페이지의 id 가 moveSpeed 인 태그 안의 내용을 player 멤버 moveSpeed 로 설정 / 이동속도
  document.getElementById("shootDelay").innerHTML = player.shootDelay; //페이지의 id 가 shootDelay 인 태그 안의 내용을 player 멤버 shootDelay 로 설정 / 발사지연
  document.getElementById("bulletSpeed").innerHTML = player.bulletSpeed; //페이지의 id 가 bulletSpeed 인 태그 안의 내용을 player 멤버 bulletSpeed 로 설정 / 발사속도
  document.getElementById("shooted").innerHTML = player.shooted; //페이지의 id 가 shooted 인 태그 안의 내용을 player 멤버 shooted 로 설정 / 총 발사한 총알 수
  document.getElementById("equipItems").innerHTML = player.equipItems; //페이지의 id 가 equipItems 인 태그 안의 내용을 player 멤버 equipItems 로 설정 / 획득한 총 아이템 수
  document.getElementById("catched").innerHTML = player.catched; //페이지의 id 가 catched 인 태그 안의 내용을 player 멤버 catched 로 설정 / 처치한 적의 수
  document.getElementById("lastEquipItem").innerHTML = player.lastEquipItem; //페이지의 id 가 lastEquipItem 인 태그 안의 내용을 player 멤버 lastEquipItem 로 설정 /마지막으로 획득한 아이템
  var accuracy = Math.floor(player.catched /player.shooted *100) + "%"; //명중률 계산, 명중률 = 잡은수 / 총 발사수
  if(player.shooted == 0){ //만약에 발사를 한게 없으면 , 명중률은 0%
    accuracy = "0%";
  }
  document.getElementById("accuracy").innerHTML = accuracy; //페이지의 id 가 accuracy 인 태그 안의 내용을 accuracy 로 설정 / 명중률
}

function drawPlayer(){ //플레이어를 그리는 함수
  ctx.beginPath(); //그리기 시작
  ctx.drawImage(player.img,player.x,canvas.height-player.height-20,player.width,player.height);
  //player 멤버 img 를, player 멤버 x , canvas.height-player 위치에 가로크기 player.width, 세로크기 player.height 를 그림
  ctx.closePath(); //그리기 끝
}
function drawBullets(){ //플레이어가 쏜 총알을 그리는 함수
  ctx.beginPath(); //그리기 시작
  var bullets = player.bullets; //bullets 는 player 의 bullets 멤버로 설정, player 의 bullets 엔 사용자가 발사한 총알이 저장되어있음
  ctx.fillStyle = "#ffffff" //채우는색은 하얀색으로 설정
  for(var i = 0; i < bullets.length;i++){ //생성된 bullets 만큼 for 문 반복
    var bullet = bullets[i]; //bullets 의 i 번째 인덱스를 bullet 으로 설정
    ctx.rect(bullet.x,bullet.y,bullet.size,bullet.size); //bullet 객체의x ,y 에 가로크기 bullet.size, 세로크기 bullet.size 로 사각형그리기
    ctx.fill(); //그린 사각형 채우기
    bullet.move(); //총알을 그렸으면 총알이 가진 move 메소드 수행하여 총알이 위로 올라가는것으로 설정
    if(bullet.y <= 0){ //만약 bullet 의 y 좌표가 스크린을 넘어가면
      bullets.splice(i,1); //bullets 의 i번째 인덱스에서 1개 삭제하여 넘어간 총알 삭제
    }
  }
  ctx.closePath();
}

function drawEnemyBullets(){ //적이 쏜 총알을 그리는 함수
  ctx.beginPath(); //그리기 시작
  var bullets = Enemy.bullets; //bullets 는 Enemy 클래스의 스태틱변수 bullets로 설정
  ctx.fillStyle = "#f00" //채우는 색은 빨간색으로 설정
  for(var i = 0; i < bullets.length;i++){//생성된 bullets 만큼 for 문 반복
    var bullet = bullets[i]; //bullets 의 i 번째 인덱스를 bullet 으로 설정
    ctx.rect(bullet.x,bullet.y,bullet.size,bullet.size);//bullet 객체의x ,y 에 가로크기 bullet.size, 세로크기 bullet.size 로 사각형그리기
    ctx.fill();//그린 사각형 채우기
    bullet.moveEnemy();//총알을 그렸으면 총알이 가진 moveEnemy 메소드 수행하여 총알이 내려가는것으로 설 올라가는것으로 설정
    if(bullet.y >= canvas.height){//만약 총알의 y 좌표가 스크린을 넘어가면
      bullets.splice(i,1);//bullets 의 i번째 인덱스에서 1개 삭제하여 넘어간 총알 삭제
    }
  }
  ctx.closePath();
}

function createItem(){//아이템 생성함수
  var now = new Date().getTime(); //현재시간을 밀리초로 받아옴
  if(now -lastItemMake >= itemMakeDelay ){ //만약 마지막으로 생성된 시간이 itemMakeDelay 를 지난 경우
    items.push(new Item(Math.floor( Math.random() * (canvas.width-ITEM_WIDTH))));
    //itmes 리스트에 x 좌표가 0~스크린 최대 가로크기 값을 가지는 Item 생성해서 추가
    lastItemMake = now; //아이템이 생성되었으므로 마지막 생성시간은 now 로 설정
    itemMakeDelay = Math.floor((Math.random()*3000)+5300);//다음 아이템 생성시간 설정, 5.3초~8.3 초 내로 생성
  }
}

function drawItem(){ //생성된 아이템 그리기
  ctx.beginPath();

  for(var i = 0; i < items.length;i++){//생성된 아이템 갯수만큼 반복
    var item = items[i];
    ctx.drawImage(item.img,item.x,item.y,item.width,item.height); //아이템이 가진 img 를
    //아이템이 가진 x y 좌표에 가로 아이템의 width, 세로 아이템의 height 로 설정
    ctx.fill();
    item.move(); //아이템이 가진 move 메소드를 호출하여 아이템 이동
    if(item.y >= canvas.height){ //만약 아이템이 캔버스 크기를 벗어나면
      items.splice(i,1); //아이템 삭제
    }
  }
  ctx.closePath();
}

function hitItemDectect(){//사용자가 아이템을 획득했는지 검사
  for(var i = 0; i < items.length;i++){ //생성된 아이템전부 확인
    var item = items[i];
    if(player.isHit(item.x,item.y,item.width,item.height)){//만약 아이템이 플레이어와 부딪힌 경우
      player.getItemEffect(item.itemEffect,item.score);//player 에 getItemEffect 메소드를 호출하여, 아이템과 점수 획득
      items.splice(i,1); //획득한 아이템 삭제
      itemSound.play();//아이템 획득 사운드 재생
    }
  }
}
function hitBulletDectect(){ //플레이어가 총알에 맞는지 검사
  var bullets = Enemy.bullets;
  for(var i = 0; i < bullets.length; i++){//적이 생성한 총알 전부 확인
    var bullet = bullets[i];
    if(player.isHit(bullet.x,bullet.y,bullet.size,bullet.size)){//만약 적이 생성한 총알이 플레이어와 부딪히면
      player.getDamage(); //player 의 getDamage 메소드를 호출하여 라이프 감소
      bullets.splice(i,1); //부딪힌 총알 삭제
      damageSound.play(); //충돌 사운드 재생
    }
  }
}
function hitAttackDetect(){//적이 몸으로 공격한거 맞는지 검사
    for(var i = 0; i < enemys.length;i++){ //생성된 적들 전부 확인
      var enemy = enemys[i];
      if(player.isHit(enemy.x,enemy.y,enemy.size,enemy.size)){ //만약 적이 플레이어와 부딪히면
        player.getDamage(); //player 의 getDamage 메소드를 호출하여 라이프 감소
        enemys.splice(i,1); //부딪힌 적 삭제
        damageSound.play(); //충돌 사운드 재생
        return;
      }
      if(enemy.y >= canvas.height){ //적이 스크린을 벗어나면
        enemys.splice(i,1); //적 삭제
      }
    }
}

function hitBulletDectectEnemy(){//적이 내가 쏜 총알에 맞았나 검사
  var bullets =  player.bullets;
  for(var i = 0; i < bullets.length;i++){ //내가쏜 모든 총알 확인
    for(var j = 0; j < enemys.length;j++){ //생성된 적 모두 확인
      var enemy = enemys[j];
      var bullet = bullets[i];
      if(enemy.isHit(bullet.x,bullet.y,bullet.size)){ //만약 적이 내가 쏜 총알에 맞으면
        player.catched++; //player 의 catched 1 을 증가하여 잡은 적 추가
        player.scoreUp(enemy.score); //적이 가지고 있는 점수를 획득한다
        bullets.splice(i,1); //맞은 총알 삭제
        enemys.splice(j,1); //맞은 적 삭제
        return; //함수 탈출
      }
    }
  }
}


function createEnemy(){
  var ENEMY_CREATE_WIDTH = (canvas.width/MAX_ENEMY_SIZE) - 1; //가로줄에 배칠할 적 수

  if(!Boolean(enemys.length)){ //만약 생성된 적이 없다면
    //var tempArr = [];
    for(var i = 0; i < ENEMY_CREATE_WIDTH*5;i++){ //적을 ENEMY_CREATE_WIDTH* 5만큼 생성
      var flag = Math.floor(Math.random()*2); //0과 1 중 랜덤으로 생성
      var row = Math.floor(i/ENEMY_CREATE_WIDTH); //2차원배열의 행
      var col = i%ENEMY_CREATE_WIDTH; //2차원배열의 열
      if(flag == 1){ //50% 확률로 적 생성
        enemys.push(new Enemy(col*MAX_ENEMY_SIZE+10,row*MAX_ENEMY_SIZE+10)); //적을 생성한다.
        //적의 x 좌표는 col*적의크기+10, y 좌표는 row * 적의크기 + 10
        //가령 i 가 10 이고 ENEMY_CREATE_WIDTH 가 3 이면, 100 / 40 이 x y 좌표로 생성
      }

    }
  }
}

function drawEnemy(){ //적을 그리는 함수
  ctx.beginPath();
  for(var i = 0; i < enemys.length;i++){
    var enemy = enemys[i];
    ctx.drawImage(enemy.img,enemy.x,enemy.y,enemy.size,enemy.size);
    //enemy 가 가진 이미지를 enemy 가 가진 x y 좌표에 size 만큼 크기로 그림
    enemy.shoot(); //enemy 가 가진 shoot() 메소드 호출하여 확률적으로 총알 발사
    enemy.move(); //enemy 가 가진 move() 메소드를 호출하여 좌우로 이동
  }

  ctx.fill();
  ctx.closePath();
}

function pause(){ //일시중지 함수
  if(!requestId){ //requestId 가 null 이면
    draw(); //그리기 반복
    return;
  }
  cancelAnimationFrame(requestId); //마지막으로 그린 requestId 를 취소하여 안그린것처럼 설정
  requestId = null; //requestId null 로 설정, pause 여부 결정짓는데 사용

  ctx.beginPath();
  ctx.rect(canvas.width/2-50, canvas.height/2-30, 110, 40);
  //canvas.width/2-50, canvas.height/2-30 에 가로 110, 세로 40 으로 하얀 사각형 그림
  ctx.fillStyle = "#fff";
  ctx.fill();

  ctx.font = '30px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText('Pause', canvas.width/2-40, canvas.height/2);
  //canvas.width/2-40, canvas.height/2 에 Pause 라는 글자 그림
  ctx.closePath();
}

function gameOver(){ //게임종료

  cancelAnimationFrame(requestId); //더이상 그릴 필요 없으므로 마지막으로 그린것 종료
  ctx.beginPath();
  ctx.rect(canvas.width/2-80, canvas.height/2-30, 160, 40);
  //canvas.width/2-80, canvas.height/2-30 에 가로 160 세로 40 크기 설정
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.font = '30px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText('GameOver', canvas.width/2-80, canvas.height/2);
  ctx.closePath();
  checkHighScore(player.score); //획득한 점수를 스코어보드에 올릴수 있는지 확인
}

function checkHighScore(score) {
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  //localStorage 의 highScores 파일을 json 형식의 배열로 읽어온다.
  const lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.score ?? 0;
  //갯수가 NO_OF_HIGH_SCORES개 미만이면 최저점은 0으로 설정한다

  if (score > lowestScore) { //획득 점수가 최저점보다 높은 경우
    const name = prompt('You got a highscore! Enter name:'); //사용자에게 이름 입력 받음
    const newScore = { score, name };
    saveHighScore(newScore, highScores);//새 스코어 저장함수 호출
    showHighScores(); //스코어 보드 출력
  }
}

function saveHighScore(score, highScores) {
  highScores.push(score); //highscores 에 score 삽입
  highScores.sort((a, b) => b.score - a.score); //스코어를 높은순서대로 정렬
  highScores.splice(NO_OF_HIGH_SCORES); //마지막 최소값 삭제

  localStorage.setItem('highScores', JSON.stringify(highScores));
  //로컬 스토리지에 highScores 이름으로 highScores 를 string 으로 바꿔서 저장
}



function draw(){
  showInfo();
  ctx.clearRect(0, 0, canvas.width, canvas.height); //그릴때마다 투명 판을 올려, 이전에 그린 그림들 삭제


  drawEnemyBullets(); //적 총알 그리기
  createItem(); //아이템 생성
  drawItem(); //아이템 그리기
  drawBullets(); //플레이어 총알 그리기
  drawPlayer(); //플레이어 그리기
  createEnemy(); //적 생성
  drawEnemy(); //적 그리기
  hitItemDectect(); //아이템이 플레이어와 부딪혔는지 확인
  hitBulletDectectEnemy(); //내가 쏜 총알이 적을 맞췄는지 검사
  hitBulletDectect(); //적이 쏜 총알이 내가 맞았나 검사
  hitAttackDetect(); //적이 몸으로 공격한걸 맞았나 검사


  if(rightPressed){ //rightPressed가 참이면
    player.moveRight(canvas.width); //player 의 moveRight 메소드 호출해서 player 위치 변경
  }
  else if(leftPressed){ //leftPressed 가 참이면
    player.moveLeft(); //player 의 moveLeft 메소드 호출해서 player 위치 변경
  }
  requestId = requestAnimationFrame(draw);//draw 함수를 호출하고 반환값을 requestId에 저장, pause gameOver 때 사용
  if(player.life<=0 ){ //체력이 0이 되면
    gameOver(); //게임오버 함수 호출
  }
}
function showHighScores(){
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  //로컬스토리지의 highScores 파일을 가져와서 json array 형식으로 읽음
  const highScoreList = document.getElementById('highScores'); //id 가 highScores 인 페이지 요소를 가져옴

  highScoreList.innerHTML = ""; //highScoreList의 내부 내용 초기화
  for(var i = 0; i < highScores.length;i++){
    highScoreList.innerHTML += `<li>${highScores[i].name} - ${highScores[i].score}</li>`
    //highScoreList에 <li>highScores[i].name - highScores[i].score</li> 추가
    //즉 <li>이름 - 스코어 </li> 추가
  }

}
draw(); //게임실행
showHighScores(); //최고점수 표기
