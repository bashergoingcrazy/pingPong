// let theBall = document.getElementById('ball');
// console.log(theBall.inner)
// console.log(`window.innerWidth = ${windowWidth}`);
// console.log(`window.innerHeight = ${windowHeight}`);
// let msgHeight = `offsetHeight = ${theBall.offsetHeight}px`;
// let msgWidth = `offsetWidth = ${theBall.offsetWidth}px`;
// let msgTop = `offsetTop = ${theBall.offsetTop}px`;
// let msgLeft = `offsetHeight = ${theBall.offsetLeft}px`;
// console.log(msgHeight);
// console.log(msgWidth);
// console.log(msgTop);
// console.log(msgLeft);

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
var player1Score=0,player2Score=0;
const theBall = document.getElementById('ball');
const p1 = document.getElementById('player1');
const p2 = document.getElementById('player2');
var isWKeyPressed = false,isSKeyPressed=false;
var isUpKeyPressed = false, isDownKeyPressed = false;
var homeText = document.getElementById('home');
var player1Points = document.getElementById('player1Score');
var player2Points = document.getElementById('player2Score');
var gameAnimationId;




function StartingAnimation() {
    var ball = document.getElementById('ball');
    var maxX = window.innerWidth - ball.offsetWidth;
    var maxY = window.innerHeight - ball.offsetHeight;
    var velocityX = 11;
    var velocityY = 5;
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


function initializeGame(){
    var ball = document.getElementById('ball');
    var maxX = window.innerWidth - theBall.offsetWidth;
    var maxY = window.innerHeight - theBall.offsetHeight;
    var newX = Math.floor(Math.random() * maxX);
    var newY = Math.floor(Math.random() * maxY);
    var movementUpdatetd=false;
    player1Points.innerText = player1Score;
    player2Points.innerText = player2Score
    homeText.style.display = 'none';
    var iteration=1;
    theBall.style.left = newX + 'px';
    theBall.style.top = newY + 'px';
    var movement = {
        velocityX:4,
        velocityY:5,
        angle:45,
    }
    function restartGame(){
        cancelAnimationFrame(gameAnimationId);
    }

    function gameLoop(){
        newX+=movement.velocityX;
        newY+=movement.velocityY;

        if(newY>= maxY - Math.max(movement.velocityX,movement.velocityY) || newY<=0){
            movement.velocityY = -movement.velocityY;
            
        }
        //collision with p2
        if((newX+theBall.offsetWidth)>=windowWidth-p1.offsetWidth-10 && newY + theBall.offsetHeight >= p2.offsetTop && newY <= p2.offsetTop + p2.offsetHeight){
            movement.velocityX = -movement.velocityX;
            iteration++;
            movementUpdatetd=false;
        }
        // Check collision with p1
        if (newX <= p1.offsetWidth + 10 && newY + theBall.offsetHeight >= p1.offsetTop && newY <= p1.offsetTop + p1.offsetHeight) {
            // Calculate normalized collision point
            movement.velocityX = -movement.velocityX;
            movementUpdatetd=false;
            iteration++;
        }

        //Check for collision with outer walls{
        if (newX >= maxX - Math.max(movement.velocityX,movement.velocityY)) {
            player1Score++;
            console.log('out of bounds')
            restartGame();
            return;
            
            
        }
        if(newX<=0){
            player2Score++;
            console.log('out of bounds')
            restartGame();
            return;
        }

    


        if(iteration%5==0 && !movementUpdatetd){
            if(movement.velocityX>0){
                movement.velocityX+=1;
                movementUpdatetd=true;
            }else{
                movement.velocityX-=1;
                movementUpdatetd=true;
            }
            if(movement.velocityY>0){
                movement.velocityY+=1;
                movementUpdatetd=true;
            }
            else{
                movement.velocityY-=1;
                movementUpdatetd=true;
            }
        }


        theBall.style.left = newX + 'px';
        theBall.style.top = newY+'px';

        gameAnimationId = requestAnimationFrame(gameLoop);

    }


    var gameAnimationId = requestAnimationFrame(gameLoop);
}

function showNotification(text) {
    alert(text);
}


function restartApp(){
    var winner = player1Score>player2Score?'player1':'player2'
    showNotification(`${winner} has won the game !!!`);
    homeText.style.display = 'block';
    player1Score=0;
    player2Score=0;
    initializeApp();
    
}


function handleKeyDownPress(e){
    if(e.key=='Enter'){
        console.log("Enter was typed ")
        initializeGame();
        return;
    }
    if (e.key === 'w' || e.key === 'W') {
        console.log('w pressed');
        if(!isWKeyPressed) {
            isWKeyPressed= true;
            moveUpW();
        }
    }
    if (e.key === 'ArrowUp') {
        console.log('Up pressed');
        if(!isUpKeyPressed) {
            isUpKeyPressed= true;
            moveUpArrow();
        }
    }
    if (e.key === 'ArrowDown') {
        console.log('Down pressed');
        if(!isDownKeyPressed) {
            isDownKeyPressed= true;
            moveDownArrow();
        }
    }
    if (e.key === 's' || e.key === 'S') {
        console.log('s pressed');
        if(!isSKeyPressed){
            isSKeyPressed = true;
            moveDownS();
        }
    }

    if(e.key=='Escape'){
        restartApp();
        return;
    }



    function moveUpArrow(){
        var currentTop = parseInt(window.getComputedStyle(p2).top);
        var newTop = currentTop - 6;
        if (newTop >= 0) {
            p2.style.top = newTop + 'px';
            if(isUpKeyPressed){
                requestAnimationFrame(moveUpArrow);
            }
        } else {
            p2.style.top = '0';
            isUpKeyPressed=false;
        }
    }
    function moveUpW(){
        var currentTop = parseInt(window.getComputedStyle(p1).top);
        var newTop = currentTop - 6;
        if (newTop >= 0) {
            p1.style.top = newTop + 'px';
            if(isWKeyPressed){
                requestAnimationFrame(moveUpW);
            }
        } else {
            p1.style.top = '0';
            isWKeyPressed=false;
        }
    }
    function moveDownArrow() {
        var currentTop = parseInt(window.getComputedStyle(p2).top);
        var newTop = currentTop + 6;
        var maxHeight = window.innerHeight - p1.offsetHeight;    
        if (newTop <= maxHeight) {
          p2.style.top = newTop + 'px';
          if(isDownKeyPressed){
            requestAnimationFrame(moveDownArrow);
          }
        } else {
          p2.style.top = maxHeight + 'px';
          isDownKeyPressed=false;
        }
    }
    function moveDownS() {
        var currentTop = parseInt(window.getComputedStyle(p1).top);
        var newTop = currentTop + 6;
        var maxHeight = window.innerHeight - p1.offsetHeight;    
        if (newTop <= maxHeight) {
          p1.style.top = newTop + 'px';
          if(isSKeyPressed){
            requestAnimationFrame(moveDownS);
          }
        } else {
          p1.style.top = maxHeight + 'px';
          isSKeyPressed=false;
        }
    }
}

function handleKeyUpPress(e){
    if (e.key === 'w' || e.key === 'W') {
        console.log('w released');
        isWKeyPressed=false ;// Stop the continuous movement
    }
    if (e.key === 's' || e.key === 'S') {
        console.log('w released');
        isSKeyPressed=false;  // Stop the continuous movement
    }
    if (e.key === 'ArrowUp') {
        console.log('Up released');
        isUpKeyPressed = false;
    }
    if (e.key === 'ArrowDown') {
        console.log('Down released');
        isDownKeyPressed = false;
    }
}


function initializeApp(){

    document.addEventListener('keydown', handleKeyDownPress);
    document.addEventListener('keyup', handleKeyUpPress);
    setInterval(() => {
        
    }, 300);
    StartingAnimation();
}
initializeApp();





