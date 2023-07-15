// let theBall = document.getElementById('ball');
// console.log(theBall.inner)

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
// console.log(`window.innerWidth = ${windowWidth}`);
// console.log(`window.innerHeight = ${windowHeight}`);
const theBall = document.getElementById('ball');
// let msgHeight = `offsetHeight = ${theBall.offsetHeight}px`;
// let msgWidth = `offsetWidth = ${theBall.offsetWidth}px`;
// let msgTop = `offsetTop = ${theBall.offsetTop}px`;
// let msgLeft = `offsetHeight = ${theBall.offsetLeft}px`;
// console.log(msgHeight);
// console.log(msgWidth);
// console.log(msgTop);
// console.log(msgLeft);

function handleCollision(){
    if(ball.style.left>=maxX){
        velocityX=-velocityX
    }
    if(ball.style.top>=maxY){
        velocityY = -velocityY
    }
    if(ball.style.left<=0){
        velocityX=-velocityX;
    }
    if(ball.style.top<=0){
        velocityY=-velocityY;
    }
}




function moveBall() {
    var maxX = window.innerWidth - ball.offsetWidth;
    var maxY = window.innerHeight - ball.offsetHeight;
    var velocityX = 3;
    var velocityY = 3;
    var newX = Math.floor(Math.random() * maxX);
    var newY = Math.floor(Math.random() * maxY);
    ball.style.left = newX + 'px';
    ball.style.top = newY + 'px';
  
    function updatePosition() {
      newX += velocityX;
      newY += velocityY;
  
      if (newX >= maxX || newX <= 0) {
        velocityX = -velocityX;
      }
      if (newY >= maxY || newY <= 0) {
        velocityY = -velocityY;
      }
  
      ball.style.left = newX + 'px';
      ball.style.top = newY + 'px';
  
      requestAnimationFrame(updatePosition);
    }
  
    updatePosition();
}
  
moveBall();