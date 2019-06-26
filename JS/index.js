
// index is the main file, it will loop every frame.
// it will mainly redraw the canvas
let game = new GameManager()
function animate() {
  let play = window.requestAnimationFrame(animate)
  game.update()
}
animate()
$(window).keypress(function (e) {
  if (e.key === ' ' || e.key === 'Spacebar') {
    // ' ' is standard, 'Spacebar' was used by IE9 and Firefox < 37
    e.preventDefault()
    if (game.isStarted == false) {
      game.start()
    }
    else {
      game.jump()

    }
  }
  else if(e.key === 'k'){
    game.superBerd()
  }
})
$(window).click(function(e){
  e.preventDefault()
  if (game.isStarted == false) {
    game.start()
  }
  else {
    game.jump()

  }
})
