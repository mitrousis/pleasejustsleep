let canvas = document.getElementById('stars');
let ctx = canvas.getContext('2d');


function drawStar(){
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(75, 75, 50, 0, 2 * Math.PI);
  ctx.fill();
}