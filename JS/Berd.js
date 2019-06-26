// import { declareModule } from "babel-types";

class Berd extends TangibleElement {
  // static makes the object accessible anywhere
  static get sprites() {
    return Object.freeze({
      flyingBerd: generateImage(100, 100, 'assets/image/newberd.png'),
      fallingBerd1: generateImage(100, 100, 'assets/image/berdleft.png'),
      fallingBerd2: generateImage(100, 100, 'assets/image/berddown.png'),
      splatBerd: generateImage(100, 100, 'assets/image/splatberd.png'),
      jumpingBerd: generateImage(100, 100, 'assets/image/berdright.png'),
      courageousBerd: generateImage(100,150,'assets/image/courageousberd.png')
    }
    ) 
  }
  static get audio(){
    return Object.freeze({
      splatSound: generateSound('assets/sound/Cartoon-splat-sound effect.mp3'),
      jumpSound : generateSound('assets/sound/Mario-Jump.wav'),
      hell : generateSound('assets/sound/uboa.mp3')
    })
  }
  
  constructor(initialY) {
    super(100, initialY,80,20);

    this.freeFallDuration = 0
    this.jumpingDuration = 0

  }

}

