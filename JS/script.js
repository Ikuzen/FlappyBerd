// creates background canvas

class backGround {
  constructor() {
    this.image = document.getElementById("play-screen").getContext("2d")
    /// values of berd coordinates
    this.x = 100;
    this.y = 50;
    this.w = 80;
    this.h = 20;
    //
    this.gravityFunc
    this.isReseted = false
    this.isJumping = false
    this.jumpingDuration
  }
  initialize() {
    this.berdIdle = new Image()
    this.berdDancing = new Image()
    this.berdCourage = new Image()
    this.berdIdle.crossOrigin
    this.berdDancing.crossOrigin
    this.berdCourage.crossOrigin
    this.berdIdle.src = "assets/image/newberd.png"
    this.berdDancing.src = "assets/image/dancingberd.png"
    this.berdCourage.src = "assets/image/courageousberd.png"
    this.newpos()
    this.isReseted = false

    /// refreshes every frame new animation

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
  gravity() {
    this.gravityFunc = window.requestAnimationFrame(this.gravity.bind(this))
    
    if (this.y + this.h < this.image.canvas.height) {
      this.y += 0.4
      this.refresh()
    }
    else(this.reset())
  }
  moveUp() {
    if (this.y > 0) {
      this.y -= 10
      this.refresh()
    }
    if(this.isReseted=== true){
      this.initialize()
      this.gravity()
    }
  }


  //
  // display functions
  //
  refresh() {
    this.clear()
    this.newpos()
  }
  
  hitbox() {

  }
  save() {
    let newX = this.x;
    let newY = this.y;
  }
  clear() {
    this.image.clearRect(0, 0, 1000, 1000)
  }
  reset(){
    window.cancelAnimationFrame(this.gravityFunc)
    this.clear()
    let image = this.image
    this.x = 100;
    this.y = 50;
    this.w = 80;
    this.h = 20;
    image.drawImage(this.berdIdle, this.x, this.y, this.w, this.h)
    image.drawImage(this.berdDancing, 200, 100, 100, 50)
    image.drawImage(this.berdCourage, 0, 100, 100, 50)

    this.isReseted= true

  }

}
class UI {
  // constructor starts the display
  constructor() {
    this.start = new backGround()
    this.start.initialize()
    this.start.gravity()
  }
  button() {
    window.addEventListener("keypress", () => {
      this.start.moveUp()
    }
    )
  }
}

let begin = new UI
begin.button()