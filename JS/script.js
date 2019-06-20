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
    //
    this.gravityFunc
    this.isReseted = false
    this.isJumping = false
    this.jumpingDuration = 0
    this.freeFallDuration = 0
  }
  initialize() {
    this.berdIdle = new Image()
    this.berdDancing = new Image()
    this.berdCourage = new Image()
    this.splatBerd = new Image()
    this.splatBerd.crossOrigin
    this.berdIdle.crossOrigin
    this.berdDancing.crossOrigin
    this.berdCourage.crossOrigin
    this.splatBerd.src = "assets/image/splatberd.png"
    this.berdIdle.src = "assets/image/newberd.png"
    this.berdDancing.src = "assets/image/dancingberd.png"
    this.berdCourage.src = "assets/image/courageousberd.png"
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
    image.drawImage(this.berdDancing, 200, 100, 100, 50)
    image.drawImage(this.berdCourage, 0, 100, 100, 50)

  }
  speed(){

    if (this.y + this.h < this.image.canvas.height && !this.isJumping) {
      //adds acceleration
      this.y += 1.5+this.freeFallDuration
      this.freeFallDuration+= 0.05
      this.refresh()
    }
    //alter speed during jumps
    else if (this.isJumping) {
      this.freeFallDuration = 0
      if (this.jumpingDuration <= 10) {
        this.y -= 2
        this.jumpingDuration++
      }
      else if (this.jumpingDuration > 10 && this.jumpingDuration <= 20 && this.isJumping == true) {
        this.y += 0.5
        this.jumpingDuration++
        console.log("slow fall")
      }
      else if (this.jumpingDuration > 20 && this.jumpingDuration <= 30 && this.isJumping == true) {
        this.y += 1
        this.jumpingDuration++
      }
      else {
        this.jumpingDuration = 0
        this.isJumping = false
      }
      console.log(this.jumpingDuration)
      console.log(this.isJumping)
      this.refresh()
    }
    // when berd dies
    else if (this.y + this.h >= this.image.canvas.height) {
      this.splat()
      this.reset()
    }
  }
  gravity() {
    this.gravityFunc = window.requestAnimationFrame(this.gravity.bind(this))
    this.speed()
  }
  jump() {
    if(this.y + this.h > 0){
    this.isJumping = true
    this.jumpingDuration = 0
    }

    if (this.isReseted === true) {
      this.initialize()
      this.gravity()
    }
  }

  // generates pipe randomly
  pipes() {

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
    window.cancelAnimationFrame(this.gravityFunc)
    //delayed for the game over animation
    setTimeout(() => {
      this.clear()
      let image = this.image
      this.x = 100;
      this.y = 50;
      this.w = 80;
      this.h = 20;

      image.drawImage(this.berdIdle, this.x, this.y, this.w, this.h)
      image.drawImage(this.berdDancing, 200, 100, 100, 50)
      image.drawImage(this.berdCourage, 0, 100, 100, 50)
      console.log("reseted")
    }, 1000
    )

    this.isReseted = true
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
    this.image.drawImage(this.splatBerd, 100, 120, 100, 30)


  }
}
class UI {
  // constructor starts the display
  constructor() {
    this.start = new Background()
    this.start.initialize()
    this.start.gravity()
  }
  button() {
    window.addEventListener("keypress", () => {
      this.start.jump()
    }
    )
  }
}

let begin = new UI
begin.button()
