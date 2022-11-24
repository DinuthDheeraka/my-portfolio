const BG_CANVAS = document.getElementById('canvas1');
const BG_CANVAS_CTX = BG_CANVAS.getContext('2d');
const BG_CANVAS_WIDTH = BG_CANVAS.width = 1530;
const BG_CANVAS_HEIGHT = BG_CANVAS.height = 700;
let gameSpeed = 4;
var x = 0;
var x2 = 2400;

// const BG_IMAGE = document.getElementById('img1');
const BG_IMAGE1 = new Image();
BG_IMAGE1.src = 'img/layer-4.png';
const BG_IMAGE2 = new Image();
BG_IMAGE2.src = 'img/layer-5.png';
const BG_IMAGE3 = new Image();
BG_IMAGE3.src = 'img/layer-3.png';
const BG_IMAGE4 = new Image();
BG_IMAGE4.src = 'img/layer-1.png';
const BG_IMAGE5 = new Image();
BG_IMAGE5.src = 'img/layer-2.png';

function animateParallax() {
  BG_CANVAS_CTX.clearRect(0, 0, BG_CANVAS_WIDTH, BG_CANVAS_HEIGHT)
  // BG_CANVAS_CTX.drawImage(BG_IMAGE4, x, 0);
  // BG_CANVAS_CTX.drawImage(BG_IMAGE4, x2, 0);
  //
  // BG_CANVAS_CTX.drawImage(BG_IMAGE5, x, 0);
  // BG_CANVAS_CTX.drawImage(BG_IMAGE5, x2, 0);

  // BG_CANVAS_CTX.drawImage(BG_IMAGE1, x, 30);
  // BG_CANVAS_CTX.drawImage(BG_IMAGE1, x2, 30);

  BG_CANVAS_CTX.drawImage(BG_IMAGE2, x, -15);
  BG_CANVAS_CTX.drawImage(BG_IMAGE2, x2, -15);
  //
  // BG_CANVAS_CTX.drawImage(BG_IMAGE3, x, 0);
  // BG_CANVAS_CTX.drawImage(BG_IMAGE3, x2, 0);

  if (x < -2400) {
    x = 2400 + x2 + gameSpeed - 4;
  }
  x -= gameSpeed;
  if (x2 < -2400) {
    x2 = 2400 + x + gameSpeed - 4;
  }
  x2 -= gameSpeed;
  requestAnimationFrame(animateParallax);
}

animateParallax();

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

var jumpHeight = 105;
function setJumpHeight(jumpIndex) {
  if(jumpIndex!==17){
    if (jumpIndex < 9) {
      jumpHeight += 60;
      $('#player').css('bottom', jumpHeight + 'px');
    }else{
      jumpHeight -= 50;
      $('#player').css('bottom', jumpHeight + 'px');
    }
  }else{
    jumpHeight = 105;
    $('#player').css('bottom', jumpHeight+'px');
  }
}

var runIndex = 1;
function runAnimation() {
  if (runIndex === 12) {
    runIndex = 1;
  }
  $('#player').css('bottom', 90 + 'px');
  $('#player').css('background-image', 'url("santa/Run (' + runIndex + ').png"');
  runIndex++;
}

var deadIndex = 1;
function deadAnimation() {
  if (deadIndex === 18) {
    deadIndex = 1;
  }
  $('#player').css('background-image', 'url("santa/Dead (' + deadIndex + ').png"');
  deadIndex++;
}

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
    clearInterval(animationNum);
    animationNum = setInterval(jumpAnimation, 100);
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

let isC = true;
var left = 1400;
let animateEnm = 0;
let animateDead = 0;

function animateEnemies() {
  if (left === 10) {
    left = 1400;
  }
  $('.enemy').css('left', left);
  left -= 10;
  let r1 = document.getElementById('box').getBoundingClientRect();
  let r2 = document.getElementById('player').getBoundingClientRect();
  if (r1.x < r2.x + r2.width - 100 && r1.x + r1.width > r2.x && r1.y < r2.y + r2.height && r1.y + r1.height > r2.y) {
    clearInterval(animationNum);
    animateDead = setInterval(setDeadOverNme, 100);
    clearInterval(animateEnm);
  } else {
    console.log(22222222);
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

// animateEnm =  setInterval(animateEnemies,15);
let countU = 0;
function setDeadOverNme() {
  if (countU == 17) {
    clearInterval(animateDead);
  } else {
    deadAnimation();
  }
  countU++;
}


