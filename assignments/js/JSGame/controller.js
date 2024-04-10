const BG_CANVAS = document.getElementById('canvas1');
const BG_CANVAS_CTX = BG_CANVAS.getContext('2d');
const BG_CANVAS_WIDTH = BG_CANVAS.width = 1530;
const BG_CANVAS_HEIGHT = BG_CANVAS.height = 700;
let gameSpeed = 4;
let min = 4;
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
const BG_IMAGE5 = new Image();
BG_IMAGE5.src = 'santa/blueBg.jpg';

//speeds
let jumpSpeed = 100;
let idleSpeed = 60;
let deadSpeed = 100;
let walkSpeed = 40;
let runSpeed = 60;
let slideSpeed = 60;
let enemyWalkSpeed = 100;
let enemyAttackSpeed = 100;

var animateParallaxNum = 0;
var zombieSoundNum = 0;
let animateHitEnterNum = 0;
let animateControlsNum = 0;

BG_CANVAS_CTX.drawImage(BG_IMAGE5, x, 0);
BG_CANVAS_CTX.drawImage(BG_IMAGE5, x2, 0);

function animateParallax() {
    BG_CANVAS_CTX.clearRect(0, 0, BG_CANVAS_WIDTH, BG_CANVAS_HEIGHT)
    BG_CANVAS_CTX.drawImage(BG_IMAGE5, x, 0);
    BG_CANVAS_CTX.drawImage(BG_IMAGE5, x2, 0);

    if (x < -1600) {
        x = 1600 + x2 + gameSpeed - min;
    }
    x -= gameSpeed;
    if (x2 < -1600) {
        x2 = 1600 + x + gameSpeed - min;
    }
    x2 -= gameSpeed;
    animateParallaxNum = requestAnimationFrame(animateParallax);
}

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

animationNum = setInterval(idleAnimation, idleSpeed);
previousAnimation = "Idle";

//jump animation
var jumpIndex = 1;

function jumpAnimation() {
    if (jumpIndex === 17) {
        jumpIndex = 1;
        clearInterval(animationNum);
        resetAnimation();
        console.log(previousAnimation)
    } else {
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
    } else {
        $('#player').css('background-image', 'url("santa/Walk (' + walkIndex + ').png"');
        walkIndex++;
    }
}

var jumpHeight = 60;

function setJumpHeight(jumpIndex) {
    if (jumpIndex !== 17) {
        if (jumpIndex < 9) {
            jumpHeight += 50;
            $('#player').css('bottom', jumpHeight + 'px');
        } else {
            jumpHeight -= 40;
            $('#player').css('bottom', jumpHeight + 'px');
        }
    } else {
        jumpHeight = 60;
        $('#player').css('bottom', jumpHeight + 'px');
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
    $('#player').css('bottom', '60px');
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
        enemyAnimationNum = setInterval(enemyAttackAnimation, 100);
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
        if (state === 0) {
            enemyAnimationNum = setInterval(enemyWalkAnimation, 60);
        } else {
            enemyAnimationNum = setInterval(enemyAttackAnimation, 100);
        }
    }
    $('#nme-box-1').css('background-image', 'url("santa/Background' + enemyAttackIndex + '.png"');
    $('#nme-box-2').css('background-image', 'url("santa/BackgroundA' + enemyAttackIndex + '.png"');
    enemyAttackIndex++;
}

enemyAnimationNum = setInterval(enemyWalkAnimation, 60);

function animeReminder() {
    console.log(previousAnimation)
}

$(window).keypress(function (e) {
    if (e.keyCode == 32) {
        jumpSound.play();
        clearInterval(animationNum);
        animationNum = setInterval(jumpAnimation, jumpSpeed);
    }
});

$(window).keypress(function (e) {
    if (e.key == "c") {
        slideSound.play();
        clearInterval(animationNum);
        animationNum = setInterval(slideAnimation, slideSpeed);
    }
});

$(window).keypress(function (e) {
    if (e.key == "w") {
        previousAnimation = "Walk";
        clearInterval(animationNum);
        animationNum = setInterval(walkAnimation, walkSpeed);
    }
});

$(window).keypress(function (e) {
    if (e.key == "r") {
        previousAnimation = "Run";
        clearInterval(animationNum);
        animationNum = setInterval(runAnimation, runSpeed);
    }
});

let isGameStart = false;
let enterCount = 0;
$(window).keypress(function (e) {
    if (e.key == "Enter") {
        if (isGameStart == false) {
            clearInterval(animateHitEnterNum);
            animateParallax();
            clearInterval(animateEnm);
            clearInterval(countScoreAnimationNum);
            // cancelAnimationFrame(animateParallaxNum);
            animateEnm = setInterval(animateEnemies, 30);
            countScoreAnimationNum = setInterval(countScore, 5);
            // animateParallaxNum = requestAnimationFrame(animateParallax);
            $('#hit-enter').css("visibility", "hidden");
            setInterval(animateControls, 20);
            enterCount++;
            isGameStart = true;
        } else {
            isGameStart = false;
            window.location.reload();
        }
    }
});

let countScoreAnimationNum = 0;
let isC = true;
var left = 1800;
let animateEnm = 0;
let animateDead = 0;
let leftMin = 10;

function animateEnemies() {
    if (left <= 10) {
        left = 1800;
    }
    $('#nme-box-1').css('left', left);
    left -= leftMin;
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
        $('#hit-enter').css("visibility", "visible");
        $('#hit-enter').css("width", "300px");
        $('#hit-enter').text("Game Over!");
        clearInterval(animationNum);
        animateHitEnterNum = setInterval(animateHitEnter, 400);
        deadSound.play();
    } else {
    }
}

function resetAnimation() {
    switch (previousAnimation) {
        case "Idle":
            animationNum = setInterval(idleAnimation, idleSpeed);
            break;
        case "Jump":
            animationNum = setInterval(jumpAnimation, jumpSpeed);
            break;
        case "Run":
            animationNum = setInterval(runAnimation, runSpeed);
            break;
        case "Dead":
            animationNum = setInterval(deadAnimation, deadSpeed);
            break;
        case "Walk":
            animationNum = setInterval(walkAnimation, walkSpeed);
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
    let formated_score = String(score++).padStart(10, '0');
    $('#scoreAmount').text(formated_score);
}


function playZombieSounds() {
    zombieSound.play();
}

zombieSoundNum = setInterval(playZombieSounds, 10);

let visibilityNum = 1;

function animateHitEnter() {
    if (visibilityNum % 2 == 1) {
        $('#hit-enter').css("color", "rgba(232,222,11,0.99)");
    } else {
        $('#hit-enter').css("color", "#09f5dd");
    }
    visibilityNum++;
}

animateHitEnterNum = setInterval(animateHitEnter, 400);

let controlsTop = 120;

function animateControls() {
    if (controlsTop <= 490) {
        controlsTop += 10;
        $('#controls').css('top', '-' + controlsTop + 'px');
    } else {
        clearInterval(animateControlsNum);
    }
}

let levelStateAnimNum = 0;

function checkLevelsState() {
    if (score == 1000) {

        // clearInterval(animateEnm);
        // state = 1;
        // cancelAnimationFrame(animateParallaxNum);
        // clearInterval(countScoreAnimationNum);
        // clearInterval(zombieSoundNum);
        // $('#hit-enter').css("visibility", "visible");
        // $('#hit-enter').css("width", "240px");
        // $('#hit-enter').text("You Won!");
        // clearInterval(animationNum);
        // clearInterval(animateHitEnterNum);
        // animateHitEnterNum = setInterval(animateHitEnter,400);
        // animationNum = setInterval(idleAnimation, 30);
        // clearInterval(levelStateAnimNum);
    }
    switch (score) {
        case 2000:
            gameSpeed = 6;
            min = 6;
            leftMin=20;
            break;

        case 4000:
            gameSpeed = 8;
            min = 8;
            leftMin=30;
            break;

        case 6000:
            gameSpeed = 10;
            min = 10;
            leftMin=40;
            break;

        case 8000:
            gameSpeed = 12;
            min = 12;
            leftMin=50;
            break;
    }
}

levelStateAnimNum = setInterval(checkLevelsState, 5);