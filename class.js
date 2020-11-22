class Enemy{ //적 정보 클래스
  static bullets = []; //적이 쏜 총알 배열
  constructor(x,y){ //생성자
    this.x = x; //x 좌표는 받아온 x 좌표
    this.y = y;//y 좌표는 받아온 y 좌표
    this.size = DEFAULT_ENEMY_SIZE; //기본크기는 DEFAULT_ENEMY_SIZE
    this.score = Math.floor( Math.random() * 150+100 );// 100~250 까지 랜덤
    var img_index = Math.floor(Math.random()*ENEMY_IMAGES.length); //이미지 인덱스 설정, 0~3의 랜덤값
    this.img = ENEMY_IMAGES[img_index]; //적 이미지 설정
    this.createdTime = new Date().getTime(); //생성된 시간 설정
    this.delay = Math.floor((Math.random()*1500))+Math.floor((Math.random()*Math.random()*1000))+2000;
    //적이 발사하는 딜레이, 2000~4500 밀리세컨드 마다 발사하게됨
    this.MAX_MOVE = this.x + 15; //최대 이동 가능 범위, 15 만큼 좌우로 이동 가능
    this.START_X = x; //생성됬을때 x 위치
    this.moveSpeed = 1; //적 이동 속도, 1
    this.lastMove = this.createdTime; //마지막 이동 속도는 생성된 시간
    this.lastShoot = this.createdTime; //적이 마지막 발사 시간은 생성된 시간
    var percentage = Math.floor(Math.random()*100+1); //적의 공격 여부 설정
    if(percentage <= 30){ //30%의 확률로 적이 몸으로 공격하게 설정
      this.isAttack = true; //몸으로 이동해서 공격하게 설정
      this.moveTime = 1; //몸으로 이동하는 시간 설정
      var multiCount = Math.floor(Math.random()*10)+2;
      for(var i = 0; i < multiCount; i++){
        this.moveTime += Math.floor(Math.random()*1000)+300; //몸으로 이동하는 시간 설정
      }
      this.moveTime += Math.floor(Math.random()*1000)+300; //몸으로 이동하는 시간 설정
    }
    else{//30%확률이 아니면
      this.isAttack = false;//몸으로 이동해서 공격하게 설정해제
    }

  }
  shoot(){ //적 발사 메소드

    var now = new Date().getTime();
    if(now-this.lastShoot >this.delay && Math.floor(Math.random()*1000)==1 ){ //마지막 발사시간이 발사 딜레이가 지났고, 확률이 0.1%일경우
      Enemy.bullets.push(new Bullet(this.x+this.size/2,this.y)); //총알 생성 즉, 발사
      this.lastShoot = now; //마지막 발사시점은 현재로 설정
      this.delay = Math.floor((Math.random()*1500))+Math.floor((Math.random()*2000))+2000;
      //발사 가능 딜레이 재설정
    }
  }
  isHit(x,y,width,height){ //충돌 감지 함수
    if(this.x < x+width && this.x+this.size > x && this.y > y-this.size && y < this.y){
      //입력한 x y widt height 사각형이 적이 가지고있는 사각형 정보와 겹치면
      return true; //충돌된것
    } //사각형이 겹치지 않으면
    return false; //충돌되지 않은것
  }
  move(){
    var now = new Date().getTime();
    if(this.isAttack && now - this.createdTime > this.moveTime){ //만약 공격이 가능하고, 생성된 시간이 moveTime 을 지나면
      this.y++; //y 좌표 증가로 적이 위에서 떨어지게 설정
      return; //좌우로 움직일 필요 없으므로 메소드 종료
    }

    if(now - this.lastMove > 100){ //이동시간이 100 밀리초가 지나면
      this.x+=this.moveSpeed; //moveSpeed 만큼 이동
      if(this.x > this.MAX_MOVE){ //만약 현재 좌표가 최대로 움직일수 있는 거리 즉, 초기값 + 10 보다 커지면
        this.moveSpeed = -(this.moveSpeed); //왼쪽으로 이동하게 설정
      }
      if(this.x < this.START_X){ //만약 현재 좌표가 사적점보다 작으면, 즉 초기값보다 작으면
        this.moveSpeed = -(this.moveSpeed); //오른쪽으로 이동하게 설정
      }
      this.lastMove = now; //마지막 이동시간 재설정
    }

  }
}

class Player{ //유저 정보 클래스
  constructor(x,y){
    this.life = 3; //기본 체력
    this.moveSpeed = 3; //기본 이동속도
    this.x = x; //플레이어의 위치 x
    this.y = y; //플레에어의 위치 y
    this.width = 30; //플레이어의 가로 크기
    this.bulletSpeed = 1; //플레이어의 발사 속도
    this.bulletSize = 10; //플레이어의 총알 크기, 사용하지 않는 멤버
    this.score = 0; //플레이어의 점수
    this.shootDelay = 300; //플레이어의 발사 속도, 300밀리초당 1개
    this.lastShoot = new Date().getTime(); //마지막 발사 시간
    this.bullets = []; //발사된 총알 담는 배열
    this.height = 30; //플레이어의 크기
    this.shooted = 0; //게임을 하면서 발사한 총알의 합
    this.equipItems = 0; //게임을 하면서 얻은 아이템의 합
    this.catched = 0;//게임을 하면서 잡은 적의 합
    this.lastEquipItem = "NONE"; //마지막 얻은 아이템
    this.img = new Image();//플레이어의 이미지
    this.img.src = "image/player.png"
  }
  getDamage(){ //데미지 받는 메소드
    this.life--; //체력 1 감소
  }
  moveSpeedUp(){ //플레이어 이동속도 올리는 메소드
    this.moveSpeed += 1; //플레이어 이동속도 1 증가
    if(this.moveSpeed > 10){ //플레이어 이동속도의 최대 크기는 10으로 고정
      this.moveSpeed = 10;
    }
  }
  bulletSpeedUp(){ //총알의 이동 속도 올리는 메소드
    this.bulletSpeed += 1 //총알의 이동 속도 1 증가
    if(this.bulletSpeed > 7){ //총알의 이동 속도 최대는 7
      this.bulletSpeed = 7;
    }
  }
  bulletSpeedDown(down=1){//총알의 이동속도 감소하는 메소드, 사용 X
    this.bulletSpeed -= down //총알의 이동속도 는 down 만큼 감소
    if (this.bulletSpeed <=1){ //총알 이독속도 최저는 1
      this.bulletSpeed =1;
    }
  }
  moveRight(MAX){ //오른쪽으로 이동하는 메소드
    if (this.x < MAX-this.width){ //만약 캔버스 크기를 벗어나지 않았으면
      this.x += this.moveSpeed; //moveSpeed 만큼 x 증가, 오른쪽으로 이동
    }
  }
  moveLeft(){ //왼쪽으로 이동하는 메소드
    if(this.x > 0){ //만약 캔버스 크기를 벗어나지 않았으면
      this.x -= this.moveSpeed; //moveSpeed 만큼 x 갑소, 왼쪽으로 이동
    }
  }
  scoreUp(score){ //점수 획등 메소드
    this.score+=score;
  }
  shoot(){
    var now = new Date().getTime(); //현재시간
    var elapsed = now - this.lastShoot; //경과시간
    if(elapsed > this.shootDelay){ //경과된 시간이 shootDelay 를 지난경우
      shootSound.play(); //총알 발사 소리 재생
      this.lastShoot = now; //발사를 했으므로 마지막 발사시간은 현재시간으로 설정
      this.shooted++; //발사된 총알 갯수 증가
      this.bullets.push(
        new Bullet( //this.x + this.width/2 를 해서 x 좌표는 플레이어의 중앙
          this.x+(this.width/2),this.y-this.height-20, //y좌표는 우주선 바로 위
          this.bulletSize, //현재 총알크기
          this.bulletSpeed //현재 발사 속도
        )
      )
    }
  }

  bulletShootDelayDown(){ //발사딜레이 감소
    this.shootDelay-=50; //50밀리초 만큼 감소
    if (this.shootDelay <=50){ //발사 딜레이 최저는 50 밀리초
      this.shootDelay = 50;
    }
  }
  lifeUp(){//목숨 증가
    this.life++; //목숨 1 업
  }
  getItemEffect(effect,score){ //아이템 효과 획득, 아이템효과와 스코어를 받아옴
    this.equipItems++; //획득 아이템 증가
    this.scoreUp(score);//받아온 스코어 증가
    if(effect === ITEM_EFFECT.MOVE_SPEED_UP){ //effect 가 MOVE_SPEED_UP 이면
      this.moveSpeedUp(); //움직이는 속도 증가
      this.lastEquipItem = "MOVE SPEED"; //마지막 획득 아이템 효과 설정
    }
    else if(effect === ITEM_EFFECT.BULLET_SHOOT_SPEED_UP){ //effect 가 BULLET_SHOOT_SPEED_UP 이면
      this.bulletSpeedUp(); //총알이 올라가는 속도 증가
      this.lastEquipItem = "BULLET SPEED";//마지막 획득 아이템 효과 설정
    }
    else if(effect === ITEM_EFFECT.BULLET_SHOOT_DELAY_DOWN){ //effect 가 BULLET_SHOOT_DELAY_DOWN 이면
      this.bulletShootDelayDown(); //총알 발사 딜레이 감소
      this.lastEquipItem = "SHOOT DELAY";//마지막 획득 아이템 효과 설정
    }
    else if(effect === ITEM_EFFECT.LIFE_UP){ //effect 가 LIFE_UP 이면
      this.lastEquipItem = "LIFE UP";//마지막 획득 아이템 효과 설정
      this.lifeUp(); //목숨 증가
    }
  }
  isHit(x,y,width,height){//충돌 감지 메소드
    if((x-this.width)<this.x && this.x < (x +width) &&
  (y+height)>this.y-30 && (y-this.height)<this.y-30){ //플레이어 사각형과 매개변수로 넣은 사각형이 겹치면
    return true; //충돌된것
  } //겁치지 않으면
  return false; //충돌되지 않은것
  }
}


class Bullet{ //총알 정보 클래스
    constructor(x,y,bulletSize=10,speed=1){ //x 좌표 y 좌표,총알크기,속도 를 받아온다.
      //총알크기 속도에 매개변수가 들어가지 않으면 자동으로 10 과 1 로 설정해줌
      this.x = x; //총알의 x 좌표는 받아온 x
      this.y = y; //총알의 y 좌표는 받아온 y
      this.size = bulletSize; //총알의 크기는 받아온 bulletSuze
      this.speed = speed; //총알의 속도는 받아온 속도
      this.x = this.x - bulletSize/2; //x 좌표 보정해서 위치 조정,
      //적이 발사나 플레이어 발사시 그 객체 중간에서 그려지게끔
    }
    move(){ //플레이어가 발사했을떄 이동하는 메소드
      this.y -= this.speed; //아래에서 위로 올라가야 함으로 y 좌표 감소
    }
    moveEnemy(){ //적이 발사했을때 이동하는 메소드
      this.y += this.speed; //위에서 아래로 내려가야 함으로 y 증가
    }
}
class Item{
  static ctx = null; //스태틱변수 ctx
  static MAX_WIDTH = 0; //스태틱변수 최대 스크린 크기
  static canvas = null; //스태틱변수 canvas
  constructor(x){ //x 좌표만 받아옴
    this.x = x; //x 좌표는 받아온 x 좌표
    this.y = 150; //y 좌표는 150으로 적이 없는부분에서 시작됨
    this.width = ITEM_WIDTH; //가로 크기 설정
    this.height = ITEM_WIDTH; //세로 크기 설정
    var jbRandom = Math.random();
    this.itemEffect = Math.floor( jbRandom * 4 );// 0~3 까지 랜덤
    this.score = Math.floor(Math.random()*300+100);//아이템 획득시 얻는 점수, 100~400 의 값을 획득

    this.speedY = Math.floor(Math.random()*2+1);//y 좌표 이동속도는 1~2 랜덤
    this.speedX = Math.floor(Math.random()*2+1);//x 좌표 이동 속도는 1~2 랜덤
    this.img = ITEM_IMAGES[this.itemEffect]; //이미지 설정, 이미지는 아이템 효과에 맞게 설정
  }
  move(){ //아이템이 움작이는 메소드
    this.y += this.speedY; //y 좌표는 랜덤으로 생성된 스피드 만큼 증가
    this.x += this.speedX; //x 좌표는 랜덤으로 생성된 스피드 만큼 증가
    if(this.x > Item.MAX_WIDTH){ //아이템이 오른쪽 벽에 부딪히면
      this.speedX = - (this.speedX); //왼쪽으로 튕기게 설정
    }
    if(this.x < 0){ //아이템이 왼쪽 벽에 부딪히면
      this.speedX = - (this.speedX); //오른쪽으로 튕기게 설정
    }
  }

  static setStatic(ctx,canvas){ //스태틱 변수 설정 메소드
    Item.ctx = ctx; //ctx 변수 설정
    Item.MAX_WIDTH = canvas.width; //최대 크기 설정
    Item.canvas = canvas;//캔버스 설정
  }
}
