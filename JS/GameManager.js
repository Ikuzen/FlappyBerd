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
    this.playScreen = document.getElementById("play-screen")
    this.image = this.playScreen.getContext("2d")
    this.splatSound = document.getElementById("splat")
    this.berd = new Berd(50) // accepte seulement initalY comme parametre
    this.score = 0
    this.currentSprite = Berd.sprites.flyingBerd
    this.pipeArray = []
    this.doom = false

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
      if (this.pipeDelay >= 100) { // delay of apparition of pipes
        this.addPipe()
        this.pipeDelay = 0
      }
      // array of pipes that are drawn every frame
      this.pipeDisplayer()
      
      if (!this.lost === true) { // stops gravity if lost
        this.gravity()
      }
      this.pipeArray = this.oobPipe(this.pipeArray)
      this.pipeDelay++;
    }
    this.image.drawImage(this.currentSprite, this.berd.x, this.berd.y, this.berd.w, this.berd.h)
    this.image.fillText(this.score,130,20,100,100)
    this.jumpingDuration++


  }
  gravity() {
    this.berd.y += 1.5
  }
  jump() {
    if (!this.lost && this.berd.y > 0 && this.isStarted) {
      this.isJumping = true
      this.jumpingDuration = 0
      Berd.audio.jumpSound.play()
    }
  }
  jumping() {
    this.freeFallDuration = 0
    if (this.isJumping) {
      if (this.jumpingDuration <= 10) {
        this.berd.y -= 4
        this.currentSprite = Berd.sprites.jumpingBerd
      } else if (this.jumpingDuration > 10 && this.jumpingDuration <= 15 && this.isJumping == true) {
        this.berd.y -= 2
        this.currentSprite = Berd.sprites.flyingBerd
      }
    else if (this.jumpingDuration > 15 && this.jumpingDuration <= 25 && this.isJumping == true) {
      this.currentSprite = Berd.sprites.fallingBerd1
    }

       else if(this.jumpingDuration > 25){
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
  mvPipe(aPipe) {
    aPipe.x -= 1.5
  }
  addPipe() {
    let upRandom = Math.random()*20+110
    let downRandom = Math.random()*(-20)-140
    this.pipeArray.push(new Pipe(upRandom, "upward"))
    this.pipeArray.push(new Pipe(downRandom, "downward")) 
    if(this.doom){//doom condition
      this.pipeArray.push(new Pipe(upRandom,"secret"))
    }

  }
  oobPipe(pipeArr) { // removes the out of bound pipes from the array
    return pipeArr.filter(elem => elem.x >= -30)

  }
  pipeCollide(pipe){
    if(this.berd.x+10 < pipe.x+pipe.w && this.berd.x+this.berd.w-10 > pipe.x && this.berd.y+10 < pipe.y+pipe.h && this.berd.y+this.berd.h-10 > pipe.y){
      this.lose()
    }
  }
  pipeDisplayer(){
    for (let i in this.pipeArray) {
      if(this.pipeArray[i].pipeType === "upward"){
        this.image.drawImage(Pipe.spritesb.pipeUpward, this.pipeArray[i].x, this.pipeArray[i].y, this.pipeArray[i].w, this.pipeArray[i].h)
      }
      else if (this.pipeArray[i].pipeType == "downward"){
        this.image.drawImage(Pipe.spritesb.pipeDownward, this.pipeArray[i].x, this.pipeArray[i].y, this.pipeArray[i].w, this.pipeArray[i].h)
      }
      else if(this.pipeArray[i].pipeType ==="secret"){
        this.image.drawImage(Pipe.spritesb.theMonsterInsideThePipe,this.pipeArray[i].x, this.pipeArray[i].y, this.pipeArray[i].w, 100)
        this.pipeArray[i].y -= 1 // makes the monster from the Pipe go out from the pipe
      }
      this.mvPipe(this.pipeArray[i])
      this.pipeCollide(this.pipeArray[i])
      //score increments if pipe goes behind berd
      if(this.pipeArray[i].x < this.berd.x && !this.pipeArray[i].isScoredPipe){
        this.score+= 0.5
        this.pipeArray[i].isScoredPipe = true
      }
      if(this.score === 4 && !this.doom){
        this.doom = true
        Berd.audio.hell.play()
        this.playScreen.style.backgroundImage= "url(../assets/image/uboabackground.png)"
        console.log(this.image)
      }
    }
  }

  reset() {
    this.pipeArray = []
    this.clear()
    this.score = 0
    this.doom = 0
    this.playScreen.style.backgroundImage= "url(../assets/image/background-flappy.png)"

  }
}