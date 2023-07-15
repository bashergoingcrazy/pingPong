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

function moveBall() {
    var ball = document.getElementById('ball');
    var maxX = window.innerWidth - ball.offsetWidth;
    var maxY = window.innerHeight - ball.offsetHeight;
    var velocityX = 10;
    var velocityY = 10;
    var newX = Math.floor(Math.random() * maxX);
    var newY = Math.floor(Math.random() * maxY);
    var iterationCount = 0;
  
    ball.style.left = newX + 'px';
    ball.style.top = newY + 'px';
  
    function updatePosition() {
      newX += velocityX;
      newY += velocityY;
  
      if (newX >= maxX - Math.max(velocityX,velocityY) || newX <= 0) {
        velocityX = -velocityX;
        iterationCount++;
      }
      if (newY >= maxY -Math.max(velocityX,velocityY) || newY <= 0) {
        velocityY = -velocityY;
        iterationCount++;
      }
  
      ball.style.left = newX + 'px';
      ball.style.top = newY + 'px';
  
    //   if (iterationCount >= 10) {
    //     stopAnimation();
    //     return;
    //   }
  
      animationId = requestAnimationFrame(updatePosition);
    }
  
    function stopAnimation(event) {
      if(event.key=='Enter') {
        cancelAnimationFrame(animationId);
        document.removeEventListener('keydown', stopAnimation);
      }  
    }
    var animationId = requestAnimationFrame(updatePosition);
    document.addEventListener('keydown', stopAnimation);
  }
  
  moveBall();
  