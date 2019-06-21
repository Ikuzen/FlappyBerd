// function drawRotated(degrees,context,canvas,image){
//   context.clearRect(0,0,canvas.width,canvas.height);

//   // save the unrotated context of the canvas so we can restore it later
//   // the alternative is to untranslate & unrotate after drawing
//   context.save();

//   // move to the center of the canvas
//   context.translate(canvas.width/2,canvas.height/2);

//   // rotate the canvas to the specified degrees
//   context.rotate(degrees*Math.PI/180);

//   // draw the image
//   // since the context is rotated, the image will be rotated also
//   context.drawImage(image,-image.width/2,-image.width/2);

//   // we’re done with the rotating so restore the unrotated context
//   context.restore();
// }

class UI {
  // constructor starts the display
  constructor() {
    this.start = new Background()
    this.start.initialize()
    this.start.animate()
  }
  button() {
    window.addEventListener("keypress", () => {
      this.start.jump()
    })
  }
}
class Pipe {
  constructor() {
    this.x = 0
    this.y = 100 * Math.random();
    this.w = 100;
    this.h = 50;
  }
}
// creates background canvas

class Background {
  constructor() {
    this.image = document.getElementById("play-screen").getContext("2d")
    this.splatSound = document.getElementById("splat")
    /// values of berd coordinates
    this.x = 100;
    this.y = 50;
    this.w = 80;
    this.h = 20;
    ///
    ///values of pipes positions
    this.px = 0
    this.py = 100
    this.pw = 50
    this.ph = 100

    this.play
    this.isReseted = false
    this.isJumping = false
    this.jumpingDuration = 0
    this.freeFallDuration = 0
    this.pipeDelay = 0
  }
  initialize() {
    this.berdIdle = new Image()
    this.berdDancing = new Image()
    this.berdCourage = new Image()
    this.splatBerd = new Image()
    this.pipe = new Image
    this.reversePipe = new Image
    this.splatBerd.crossOrigin
    this.berdIdle.crossOrigin
    this.berdDancing.crossOrigin
    this.berdCourage.crossOrigin
    this.pipe.crossOrigin
    this.reversePipe.crossOrigin
    this.splatBerd.src = "assets/image/splatberd.png"
    this.berdIdle.src = "assets/image/newberd.png"
    this.berdDancing.src = "assets/image/dancingberd.png"
    this.berdCourage.src = "assets/image/courageousberd.png"
    this.pipe.src = "assets/image/pipe.png"
    this.reversePipe.src = "assets/image/reversepipe"
    this.newpos()
    this.isReseted = false

  }


  ///
  /// Position functions
  ///
  newpos() {

    let image = this.image
    let x = this.x;
    let y = this.y;
    let w = this.w;
    let h = this.h;
    
    image.drawImage(this.berdIdle, x, y, w, h)
    // if(this.isJumping){
    //   drawRotated(Math.PI,image,this.berdIdle)
    // }
  
    image.drawImage(this.berdDancing, 200, 100, 100, 50)
    image.drawImage(this.berdCourage, 0, 100, 100, 50)
    // image.drawImage(this.pipe, this.px, this.py, this.pw, this.ph)


  }
  speed() {

    if (this.y + this.h < this.image.canvas.height && !this.isJumping) {
      //adds acceleration
      this.y += 1.5 + this.freeFallDuration
      this.freeFallDuration += 0.05
      
    }
    //alter speed during jumps
    else if (this.isJumping) {
      this.freeFallDuration = 0
      if (this.jumpingDuration <= 10) {
        this.y -= 2
        this.jumpingDuration++
      } else if (this.jumpingDuration > 10 && this.jumpingDuration <= 20 && this.isJumping == true) {
        this.y += 0.5
        this.jumpingDuration++
      } else if (this.jumpingDuration > 20 && this.jumpingDuration <= 30 && this.isJumping == true) {
        this.y += 1
        this.jumpingDuration++
      } else {
        this.jumpingDuration = 0
        this.isJumping = false
      }

    }
    // when berd dies
  }
  animate() {
    this.play = window.requestAnimationFrame(this.animate.bind(this))
    this.mvpipe()
    this.speed()
    this.refresh()
    if (this.y + this.h >= this.image.canvas.height) {
      this.splat()
      this.reset()
    }
  }
  jump() {
    if (this.y + this.h > 0) {
      this.isJumping = true
      this.jumpingDuration = 0
    }

    if (this.isReseted === true) {
      this.initialize()
      this.animate()
    }
  }

  mvpipe() {
    function genpipe(){
      return new Pipe
    }
    // image.drawImage(this.pipe, this.px, this.py, this.pw, this.ph)
    if(this.pipeDelay===500){
      this.pipeDelay=0
      let newPipe = genpipe()

      
    }
    this.pipeDelay++
    
  }

  // generates pipe randomly
genpipe(){
  // let newPipe = new Pipe
}

  //
  // display functions
  //
  refresh() {
    this.clear()
    this.newpos()
  }

  boxCollide() {

  }


  save() {
    let newX = this.x;
    let newY = this.y;
  }
  clear() {
    this.image.clearRect(0, 0, 1000, 1000)
  }

  reset() {
    window.cancelAnimationFrame(this.play)
    //delayed for the game over animation
    setTimeout(() => {
      this.clear()
      this.x = 100;
      this.y = 50;
      this.w = 80;
      this.h = 20;


      this.image.drawImage(this.berdIdle, this.x, this.y, this.w, this.h)
      this.image.drawImage(this.berdDancing, 200, 100, 100, 50)
      this.image.drawImage(this.berdCourage, 0, 100, 100, 50)
      this.isReseted = true
      console.log("reseted")
    }, 1000)

    this.isJumping = false
    this.jumpingDuration = 0

  }
  splat() {
    this.splatBerd = new Image()
    this.splatBerd.crossOrigin
    this.splatBerd.src = "assets/image/splatberd.png"
    this.clear()

    this.splatSound.currentTime = 0
    this.splatSound.play()
    this.image.drawImage(this.splatBerd, this.x, this.y, this.w, this.h)


  }
}

let begin = new UI
begin.button()