var index = 0;
function animate() {
    if(index==9){
        index = 0;
    }
    $('#nikan').css('background-image','url("Run ('+index+').png"');
    index++;
}

setInterval(animate,70);