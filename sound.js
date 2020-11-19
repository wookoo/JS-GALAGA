class Sound {
    constructor(parent){
        this.parent = parent;
        this.sounds = [];
        this.muted = true;
    }

    create(src, id, loop = false){
        let audio = document.createElement("audio");
        audio.src = src;
        audio.id = id;
        audio.muted = true;
        this.sounds.push(audio);
        this.parent.append(audio);

        if(loop){
            audio.setAttribute("loop", "")
        }

        return audio;
    }

}

Sound.prototype.soundSetting = function(){
    let soundItems = document.querySelectorAll(".sound-item");
    for(let soundItem of soundItems){
        soundItem.addEventListener("click", (e)=>{
            this.muteToggle();
        });
    }
};

Sound.prototype.muteToggle = function(){
    if(!this.muted){
        for(let sound of this.sounds){
            sound.muted = true;
        }
        document.querySelector("#sound-speaker").innerHTML = "\u{1F507}";
        document.querySelector("#sound-description").innerHTML = "off";
        this.muted = true;
    }else{
      for(let sound of this.sounds){
          sound.muted = false;
      }
      this.muted = false;
    }
};

Sound.prototype.pause = function(){
    for(let sound of this.sounds){
        sound.pause();
    }
}

Sound.prototype.play = function(){
    for(let sound of this.sounds){
        sound.play();
    }
}

let sound = new Sound(document.querySelector("#sound"));
let shootSound = sound.create("sound/shoot.mp3", "shoot_sound");
let itemSound = sound.create("sound/getItem.mp3", "item_sound");
let damageSound = sound.create("sound/damage.mp3","damage_sound");

sound.muteToggle();
sound.soundSetting();
