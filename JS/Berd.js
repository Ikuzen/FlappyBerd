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
    }
    ) 
  }
  static get audio(){
    return Object.freeze({
      splatSound: generateSound('assets/sound/Cartoon-splat-sound effect.mp3'),
      jumpSound : generateSound('assets/sound/Mario-Jump.wav')
    })
  }
  
  constructor(initialY) {
    super(100, initialY,80,20);

    this.freeFallDuration = 0
    this.jumpingDuration = 0

  }

}


// jumping(){

//   //alter speed during jumps
//     this.freeFallDuration = 0
//     if (this.jumpingDuration <= 10) {
//       this.y -= 2
//       this.jumpingDuration++

//     } else if (this.jumpingDuration > 10 && this.jumpingDuration <= 20 && this.isJumping == true) {
//       this.y += 0.5
//       this.jumpingDuration++

//     } else if (this.jumpingDuration > 20 && this.jumpingDuration <= 30 && this.isJumping == true) {
//       this.y += 1
//       this.jumpingDuration++

//     } else {
//       this.jumpingDuration = 0
//       this.isJumping = false

//     }

//   }
// }
// falling(){

// }
// splat(){

// }
// }