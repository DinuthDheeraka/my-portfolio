const BG_CANVAS = document.getElementById('canvas1');
const BG_CANVAS_CTX = BG_CANVAS.getContext('2d');
const BG_CANVAS_WIDTH = BG_CANVAS.width = 1530;
const BG_CANVAS_HEIGHT = BG_CANVAS.height = 700;
let gameSpeed = 4;
var x = 0;
var x2 = 2400;

// const BG_IMAGE = document.getElementById('img1');
const BG_IMAGE = new Image();
BG_IMAGE.src = 'layer-4.png';
const BG_IMAGE2 = new Image();
BG_IMAGE2.src = 'layer-5.png';
const BG_IMAGE3 = new Image();
BG_IMAGE3.src = 'layer-3.png';
const BG_IMAGE4 = new Image();
BG_IMAGE4.src = 'layer-1.png';
const BG_IMAGE5 = new Image();
BG_IMAGE5.src = 'layer-2.png';

function animateParallax() {
    BG_CANVAS_CTX.clearRect(0,0,BG_CANVAS_WIDTH,BG_CANVAS_HEIGHT)
    BG_CANVAS_CTX.drawImage(BG_IMAGE4,x,0);
    BG_CANVAS_CTX.drawImage(BG_IMAGE4,x2,0);

    BG_CANVAS_CTX.drawImage(BG_IMAGE5,x,0);
    BG_CANVAS_CTX.drawImage(BG_IMAGE5,x2,0);

    BG_CANVAS_CTX.drawImage(BG_IMAGE,x,30);
    BG_CANVAS_CTX.drawImage(BG_IMAGE,x2,30);

    BG_CANVAS_CTX.drawImage(BG_IMAGE2,x,-15);
    BG_CANVAS_CTX.drawImage(BG_IMAGE2,x2,-15);

    BG_CANVAS_CTX.drawImage(BG_IMAGE3,x,0);
    BG_CANVAS_CTX.drawImage(BG_IMAGE3,x2,0);

    if(x<-2400){
        x = 2400+x2+gameSpeed-4;
    }
    x-=gameSpeed;
    if(x2<-2400){
        x2 = 2400+x+gameSpeed-4;
    }
    x2-=gameSpeed;
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
var animationNum = 0;
var index = 0;
function runAnimation() {
    if(index==9){
        index = 0;
    }
    $('#player').css('background-image','url("Run ('+index+').png"');
    index++;
}
// animationNum =  setInterval(runAnimation,70);

var jumpIndex = 0;
var jumpHeight = 110;
function jumpAnimation() {
    if(jumpIndex==11){
        jumpIndex = 0;
        clearInterval(animationNum);
        animationNum = setInterval(runAnimation,70);
    }
    $('#player').css('background-image','url("Jump ('+jumpIndex+').png"');
    jumpIndex++;
    setJumpHeight();
}

function setJumpHeight() {
    if(jumpIndex>=10){
        $('#player').css('bottom','100px');
        jumpHeight=100;
    }else if (jumpIndex<6){
        jumpHeight+=20;
        $('#player').css('bottom',jumpHeight+'px');
    }else {
        jumpHeight-=20;
        $('#player').css('bottom',jumpHeight+'px');
    }
}

$('#player').click(function () {
    clearInterval(animationNum);
    animationNum = setInterval(jumpAnimation,70);
});