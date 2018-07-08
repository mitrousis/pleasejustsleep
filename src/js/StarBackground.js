export default class StarBackgroud {
  
  constructor(){
    this.canvas = document.getElementById('stars');
    this.ctx    = this.canvas.getContext('2d');
    
    let resizeTimeout = null;
    window.addEventListener('resize', () => {
      if(!resizeTimeout){
        resizeTimeout = setTimeout(() => {
          resizeTimeout = null;
          this.drawStarField();
        }, 200);
      }
    });

    this.drawStarField();
  }

  drawStarField() {
    let fieldWidth  = window.innerWidth;
    let fieldHeight = window.innerHeight;
    
    this.canvas.width  = fieldWidth;
    this.canvas.height = fieldHeight;
    this.ctx.clearRect(0,0, fieldWidth, fieldHeight);
  
    let maxWidth  = fieldWidth;
    let maxHeight = fieldHeight * .8;
  
    for(let i=0; i<1000; i++) {
      let randX = Math.random() * maxWidth;
      let randY = Math.random() * maxHeight;
      let opacity = 1 - (randY / fieldHeight);
      let radius = .05 + Math.random() * 1;
      this.drawStar(randX, randY, radius, opacity);
    }
  }

  drawStar(x, y, radiusMult, opacity){
    let radius           = radiusMult * 1;
    this.ctx.globalAlpha = opacity;
    this.ctx.fillStyle   = '#ffffff';
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.ctx.fill();
  }
}