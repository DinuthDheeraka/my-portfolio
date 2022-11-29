const BG_CANVAS = document.getElementById('canvas1');
const BG_CANVAS_CTX = BG_CANVAS.getContext('2d');
const BG_CANVAS_WIDTH = BG_CANVAS.width = 1530;
const BG_CANVAS_HEIGHT = BG_CANVAS.height = 700;
let gameSpeed = 4;
var x = 0;
var x2 = 1600;

//sounds
var jumpSound = new Audio();
jumpSound.src = "santa/jump1.mp3";

var slideSound = new Audio();
slideSound.src = "santa/slide1.mp3";

var zombieSound = new Audio();
zombieSound.src = "santa/zom1.mp3";

var deadSound = new Audio();
deadSound.src = "santa/zom2.mp3";

// const BG_IMAGE = document.getElementById('img1');
const BG_IMAGE1 = new Image();
BG_IMAGE1.src = 'img/layer-4.png';
const BG_IMAGE2 = new Image();
BG_IMAGE2.src = 'img/layer-5.png';
const BG_IMAGE3 = new Image();
BG_IMAGE3.src = 'img/layer-3.png';
const BG_IMAGE4 = new Image();
BG_IMAGE4.src = 'img/layer6.jpg';
const BG_IMAGE5 = new Image();
BG_IMAGE5.src = 'santa/blueBg.jpg';

var animateParallaxNum = 0;
var zombieSoundNum = 0;
let animateHitEnterNum = 0;
let animateControlsNum = 0;

BG_CANVAS_CTX.drawImage(BG_IMAGE5, x, 0);
BG_CANVAS_CTX.drawImage(BG_IMAGE5, x2, 0);
function animateParallax() {
  BG_CANVAS_CTX.clearRect(0, 0, BG_CANVAS_WIDTH, BG_CANVAS_HEIGHT)
  // BG_CANVAS_CTX.drawImage(BG_IMAGE4, x, 0);
  // BG_CANVAS_CTX.drawImage(BG_IMAGE4, x2, 0);
  //
  BG_CANVAS_CTX.drawImage(BG_IMAGE5, x, 0);
  BG_CANVAS_CTX.drawImage(BG_IMAGE5, x2, 0);

  // BG_CANVAS_CTX.drawImage(BG_IMAGE1, x, 30);
  // BG_CANVAS_CTX.drawImage(BG_IMAGE1, x2, 30);

  // BG_CANVAS_CTX.drawImage(BG_IMAGE2, x, -15);
  // BG_CANVAS_CTX.drawImage(BG_IMAGE2, x2, -15);
  //
  // BG_CANVAS_CTX.drawImage(BG_IMAGE3, x, 0);
  // BG_CANVAS_CTX.drawImage(BG_IMAGE3, x2, 0);

  if (x < -1600) {
    x = 1600 + x2 + gameSpeed - 4;
  }
  x -= gameSpeed;
  if (x2 < -1600) {
    x2 = 1600 + x + gameSpeed - 4;
  }
  x2 -= gameSpeed;
  animateParallaxNum =  requestAnimationFrame(animateParallax);
}


// var n = 2;
// function jumpAnimation() {
//     if(n%2===0){
//         for(let i = 125; i<=250; i+=5){
//             $('#main-character').css("bottom",i+'px');
//         }
//         n++;
//     }else{
//         jumpReverseAnimation();
//         n++;
//     }
// }
//
// function jumpReverseAnimation() {
//     for(let i = 250; i>=125; i-=5){
//         $('#main-character').css("bottom",i+'px');
//     }
// }
// const PLAYER_CANVAS = document.getElementById('player');
// const PLAYER_CANVAS_CTX = PLAYER_CANVAS.getContext('2d');
// const PLAYER_CANVAS_WIDTH = PLAYER_CANVAS.width = 250;
// const PLAYER_CANVAS_HEIGHT = PLAYER_CANVAS.height = 200;
// $('#player').css('background-image','url("img/Idle ('+1+').png"');
var currentAnimation = "";
var previousAnimation = "Run";
var animationNum = 0;
var idleIndex = 1;

function idleAnimation() {
  if (idleIndex === 17) {
    idleIndex = 1;
  }
  $('#player').css('background-image', 'url("santa/Idle (' + idleIndex + ').png"');
  idleIndex++;
}

animationNum = setInterval(idleAnimation, 60);
// animationNum = setInterval(runAnimation, 50);
previousAnimation = "Idle";


//jump animation
var jumpIndex = 1;
function jumpAnimation() {
  if (jumpIndex === 17) {
    jumpIndex = 1;
    clearInterval(animationNum);
    resetAnimation();
    console.log(previousAnimation)
  }else{
    $('#player').css('background-image', 'url("santa/Jump (' + jumpIndex + ').png"');
    jumpIndex++;
    setJumpHeight(jumpIndex);
  }
}

//walk animation
var walkIndex = 1;
function walkAnimation() {
  if (walkIndex === 14) {
    walkIndex = 1;
    // clearInterval(animationNum);
    // resetAnimation();
  }else{
    $('#player').css('background-image', 'url("santa/Walk (' + walkIndex + ').png"');
    walkIndex++;
  }
}

var jumpHeight = 60;
function setJumpHeight(jumpIndex) {
  if(jumpIndex!==17){
    if (jumpIndex < 9) {
      jumpHeight += 50;
      $('#player').css('bottom', jumpHeight + 'px');
    }else{
      jumpHeight -= 40;
      $('#player').css('bottom', jumpHeight + 'px');
    }
  }else{
    jumpHeight = 60;
    $('#player').css('bottom', jumpHeight+'px');
  }
}

var runIndex = 1;
function runAnimation() {
  if (runIndex === 12) {
    runIndex = 1;
  }
  // $('#player').css('bottom', 60 + 'px');
  $('#player').css('background-image', 'url("santa/Run (' + runIndex + ').png"');
  runIndex++;
}

var deadIndex = 1;
function deadAnimation() {
  $('#player').css('bottom','60px');
  if (deadIndex === 18) {
    deadIndex = 1;
  }
  $('#player').css('background-image', 'url("santa/Dead (' + deadIndex + ').png"');
  deadIndex++;
}

var slideIndex = 1;
function slideAnimation() {
  if (slideIndex === 12) {
    slideIndex = 1;
    clearInterval(animationNum);
    resetAnimation();
  }
  $('#player').css('background-image', 'url("santa/Slide (' + slideIndex + ').png"');
  slideIndex++;
}

var enemyAnimationNum = 0;
var enemyWalkIndex = 1;
function enemyWalkAnimation() {
  if (enemyWalkIndex === 11) {
    enemyWalkIndex = 1;
    clearInterval(enemyAnimationNum);
    enemyAnimationNum = setInterval(enemyAttackAnimation,100);
  }
  $('#nme-box-1').css('background-image', 'url("santa/Background (' + enemyWalkIndex + ').png"');
  $('#nme-box-2').css('background-image', 'url("santa/BackgroundM' + enemyWalkIndex + '.png"');
  enemyWalkIndex++;
}

let state = 0;
var enemyAttackIndex = 1;
function enemyAttackAnimation() {
  if (enemyAttackIndex === 9) {
    enemyAttackIndex = 1;
    clearInterval(enemyAnimationNum);
    if(state===0){
      enemyAnimationNum = setInterval(enemyWalkAnimation,60);
    }else{
      enemyAnimationNum = setInterval(enemyAttackAnimation,100);
    }
  }
  $('#nme-box-1').css('background-image', 'url("santa/Background' + enemyAttackIndex + '.png"');
  $('#nme-box-2').css('background-image', 'url("santa/BackgroundA' + enemyAttackIndex + '.png"');
  enemyAttackIndex++;
}

enemyAnimationNum = setInterval(enemyWalkAnimation,60);

// setInterval(animeReminder,10);

function animeReminder() {
  console.log(previousAnimation)
}
// document.addEventListener('keyup',function (e) {
//   if(e.code==32){
//
//   }
// });
$(window).keypress(function(e) {
  if(e.keyCode == 32) {
    jumpSound.play();
    clearInterval(animationNum);
    animationNum = setInterval(jumpAnimation, 100);
  }
});

$(window).keypress(function(e) {
  if(e.key == "c") {
    slideSound.play();
    clearInterval(animationNum);
    animationNum = setInterval(slideAnimation, 60);
  }
});

$(window).keypress(function(e) {
  if(e.key == "w") {
    previousAnimation="Walk";
    clearInterval(animationNum);
    animationNum = setInterval(walkAnimation, 40);
  }
});

$(window).keypress(function(e) {
  if(e.key == "r") {
    previousAnimation="Run";
    clearInterval(animationNum);
    animationNum = setInterval(runAnimation, 60);
  }
});

let isGameStart = false;
let enterCount = 0;
$(window).keypress(function(e) {
  if(e.key == "Enter") {
    if(isGameStart==false){
      clearInterval(animateHitEnterNum);
      animateParallax();
      clearInterval(animateEnm);
      clearInterval(countScoreAnimationNum);
      // cancelAnimationFrame(animateParallaxNum);
      animateEnm =  setInterval(animateEnemies,30);
      countScoreAnimationNum = setInterval(countScore,5);
      // animateParallaxNum = requestAnimationFrame(animateParallax);
      $('#hit-enter').css("visibility","hidden");
      setInterval(animateControls,20);
      enterCount++;
      isGameStart= true;
    }else{
      isGameStart = false;
      window.location.reload();
    }
  }
});
// $(window).onkeydown(function (event) {
//   if(event.code==32){
//     clearInterval(animationNum);
//     animationNum = setInterval(jumpAnimation, 10000);
//   }
// });
// $('#player').click(function () {
//   clearInterval(animationNum);
//   animationNum = setInterval(jumpAnimation, 10000);
// });

// document.getElementById('canvas1').addEventListener('click', function () {
//   clearInterval(animationNum);
//   animationNum = setInterval(deadAnimation, 180);
// });

// document.getElementById('player').addEventListener('click', function () {
//   clearInterval(animationNum);
//   animationNum = setInterval(jumpAnimation, 80);
// });
let countScoreAnimationNum = 0;
let isC = true;
var left = 1800;
let animateEnm = 0;
let animateDead = 0;
function animateEnemies() {
  if (left === 10) {
    left = 1800;
  }
  $('#nme-box-1').css('left', left);
  left -= 10;
  let r1 = document.getElementById('nme-box-1').getBoundingClientRect();
  let r2 = document.getElementById('player').getBoundingClientRect();
  if (r1.x < r2.x + r2.width - 100 && r1.x + r1.width > r2.x && r1.y < r2.y + r2.height && r1.y + r1.height > r2.y) {
    clearInterval(animationNum);
    animateDead = setInterval(setDeadOverNme, 100);
    clearInterval(animateEnm);
    state = 1;
    cancelAnimationFrame(animateParallaxNum);
    clearInterval(countScoreAnimationNum);
    clearInterval(zombieSoundNum);
    $('#hit-enter').css("visibility","visible");
    $('#hit-enter').css("width","300px");
    $('#hit-enter').text("Game Over!");
    clearInterval(animationNum);
    animateHitEnterNum = setInterval(animateHitEnter,400);
    deadSound.play();
  } else {
  }
}

function resetAnimation() {
  switch (previousAnimation) {
    case "Idle":
      animationNum = setInterval(idleAnimation, 60);
      break;
    case "Jump":
      animationNum = setInterval(jumpAnimation, 60);
      break;
    case "Run":
      animationNum = setInterval(runAnimation, 60);
      break;
    case "Dead":
      animationNum = setInterval(deadAnimation, 60);
      break;
    case "Walk":
      animationNum = setInterval(walkAnimation, 40);
      break;
  }
}

let countU = 0;
function setDeadOverNme() {
  if (countU == 17) {
    clearInterval(animateDead);
  } else {
    deadAnimation();
  }
  countU++;
}

let score = 0;
function countScore() {
  let formated_score =  String(score++).padStart(10, '0');
  $('#scoreAmount').text(formated_score);
}



function playZombieSounds() {
  zombieSound.play();
}

zombieSoundNum = setInterval(playZombieSounds,10);

let visibilityNum = 1;
function animateHitEnter() {
  if(visibilityNum%2==1){
    $('#hit-enter').css("color","rgba(232,222,11,0.99)");
  }else{
    $('#hit-enter').css("color","#09f5dd");
  }
  visibilityNum++;
}

animateHitEnterNum = setInterval(animateHitEnter,400);

let controlsTop = 120;
function animateControls() {
  if(controlsTop<=490){
    controlsTop+=10;
    $('#controls').css('top','-'+controlsTop+'px');
  }else{
    clearInterval(animateControlsNum);
  }
}