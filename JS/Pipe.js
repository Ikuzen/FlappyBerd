   class Pipe extends TangibleElement {
      static get spritesb(){
         return Object.freeze({
         pipeUpward: generateImage(50, 200, 'assets/image/pipe.png'),
         pipeDownward: generateImage(50,200, 'assets/image/reversepipe.png'),
         theMonsterInsideThePipe: generateImage(50,100, 'assets/image/dancingberd.png')
      })
    }
      /**
       * @constructor
    * @param y fixed y position (middle of sprite)
    * @param pipeType possible value: upward | downward
    */
   constructor(y, pipeType) {
       super(300, y ,50,200);
       if (!['upward','downward','secret'].includes(pipeType)) {
           throw new Error('pipeType must be upward or downward or secret');
       }

       this.pipeType = pipeType
       this.isScoredPipe = false
   }
}
