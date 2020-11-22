class Sound { //사운드 클래스
    constructor(src){
      var audio = document.createElement("audio"); //audio 요소 생성
      audio.src = src; //audio 의 src 는 받아온 src
      return audio; //생성된 오디오 반환
    }

}

var shootSound = new Sound("sound/shoot.mp3"); //발사 효과음 생성
var itemSound = new Sound("sound/getItem.mp3"); //아이템 획득 효과음 생성
var damageSound = new Sound("sound/damage.mp3"); //데미지 받은 효과음 생성
