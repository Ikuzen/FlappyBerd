
// index is the main file, it will loop every frame.
// it will mainly redraw the canvas
let game = new GameManager()
function animate() {
  let play = window.requestAnimationFrame(animate)
  game.update()
}
animate()
window.addEventListener("keypress",()=>{
  if(game.isStarted==false){
    game.start()
  }
  else{
    game.jump()

}
}
)