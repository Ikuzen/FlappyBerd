// il te faut une classe "gameManager" ou un truc comme
// ca qui s'occupera de déplacer la vue, de prendre les input du joueur, 
//d'incrémenter le score, etc

class GameManager {
  constructor() {
    this.score = 0
    this.isJumping = false
    this.isStarted = false
    this.play
    this.freeFallDuration = 0
    this.jumpingDuration = 0
    this.pipeDelay = 0
    this.score = 0
    this.lost = false
    this.image = document.getElementById("play-screen").getContext("2d")
    this.splatSound = document.getElementById("splat")
    this.berd = new Berd(50) // accepte seulement initalY comme parametre
    this.currentSprite = Berd.sprites.flyingBerd
    this.pipeArray = []

  }
  start() {
    this.isStarted = true


  }
  clear() {
    this.image.clearRect(0, 0, 1000, 1000)
  }
  update() {
    if (this.isStarted) {
      this.clear()
      this.jumping()
      this.checkLose()
      if (this.pipeDelay >= 100) {
        this.addPipe()
        this.pipeDelay = 0
      }
      // array of pipes that are drawn every frame
      for (let i in this.pipeArray) {
        this.mvPipe(this.pipeArray[i])
        if(this.pipeArray[i].pipeType === "upward"){
          this.image.drawImage(Pipe.spritesb.pipeUpward, this.pipeArray[i].x, this.pipeArray[i].y, this.pipeArray[i].w, this.pipeArray[i].h)
        }
        else if (this.pipeArray[i].pipeType == "downward"){
          this.image.drawImage(Pipe.spritesb.pipeDownward, this.pipeArray[i].x, this.pipeArray[i].y, this.pipeArray[i].w, this.pipeArray[i].h)
        }
      }
      
      if (!this.lost === true) { // stops gravity if lost
        this.gravity()
      }
      this.pipeArray = this.oobPipe(this.pipeArray)
      this.pipeDelay++;
    }
    this.image.drawImage(this.currentSprite, this.berd.x, this.berd.y, this.berd.w, this.berd.h)

  }
  gravity() {
    this.berd.y += 1.5
  }
  jump() {
    if (!this.lost && this.berd.y > 0) {
      this.isJumping = true
      this.jumpingDuration = 0
    }
  }
  jumping() {
    this.freeFallDuration = 0
    if (this.isJumping) {
      if (this.jumpingDuration <= 10) {
        this.berd.y -= 4
        this.jumpingDuration++
        this.currentSprite = Berd.sprites.jumpingBerd
      } else if (this.jumpingDuration > 10 && this.jumpingDuration <= 15 && this.isJumping == true) {
        this.berd.y -= 2
        this.jumpingDuration++
        this.currentSprite = Berd.sprites.fallingBerd1

      } else {
        this.currentSprite = Berd.sprites.fallingBerd2

        this.jumpingDuration = 0
        this.isJumping = false
      }
    }

  }
  checkLose() { // when lose : lost is true, started is
    if (this.berd.y >= 130 && this.lost === false) {
      this.lose()
    }
  }
  lose(){
    this.splat()
      this.lost = true
      this.isStarted = false
      setTimeout(() => {
        this.lost = false
        this.berd.y = 50
        this.currentSprite = Berd.sprites.flyingBerd
        this.reset()
      }, 1500)
  }
  splat() {
    this.currentSprite = Berd.sprites.splatBerd
    Berd.audio.splatSound.play()
  }
  newPipe() {
    let pipe = new Pipe(100, "upward")

  }
  mvPipe(aPipe) {
    aPipe.x -= 1.5
  }
  addPipe() {
    this.pipeArray.push(new Pipe(Math.random()*40+100, "upward"))
    this.pipeArray.push(new Pipe(Math.random()*(-40)-120, "downward")) 

  }
  oobPipe(pipeArr) {
    return pipeArr.filter(elem => elem.x >= -30)

  }

  score(){

  }
  reset() {
    this.pipeArray = []
    this.clear()
    this.score = 0
  }
}