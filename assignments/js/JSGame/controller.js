const BG_CANVAS = document.getElementById('canvas1');
const BG_CANVAS_CTX = BG_CANVAS.getContext('2d');
const BG_CANVAS_WIDTH = BG_CANVAS.width = 1530;
const BG_CANVAS_HEIGHT = BG_CANVAS.height = 700;
let gameSpeed = 3;
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
        x = 2400+x2+gameSpeed-3;
    }
    x-=gameSpeed;
    if(x2<-2400){
        x2 = 2400+x+gameSpeed-3;
    }
    x2-=gameSpeed;
    requestAnimationFrame(animateParallax);
}
animateParallax();
