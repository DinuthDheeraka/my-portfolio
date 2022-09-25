var num1,num2,total,operator;

$('#btn-0').click(function () {
    $('#result').val($('#result').val()+'0');
});
$('#btn-1').click(function () {
    $('#result').val($('#result').val()+'1');
});
$('#btn-2').click(function () {
    $('#result').val($('#result').val()+'2');
});
$('#btn-3').click(function () {
    $('#result').val($('#result').val()+'3');
});
$('#btn-4').click(function () {
    $('#result').val($('#result').val()+'4');
});
$('#btn-5').click(function () {
    $('#result').val($('#result').val()+'5');
});
$('#btn-6').click(function () {
    $('#result').val($('#result').val()+'6');
});
$('#btn-7').click(function () {
    $('#result').val($('#result').val()+'7');
});
$('#btn-8').click(function () {
    $('#result').val($('#result').val()+'8');
});
$('#btn-9').click(function () {
    $('#result').val($('#result').val()+'9');
});
$('#btn-point').click(function () {
    $('#result').val($('#result').val()+'.');
});
$('#btn-c').click(function () {
    $('#result').val('');
});
// -----------------------------------------------------------------------
$('#btn--').click(function () {
    num1 = parseInt($('#result').val());
    operator = '-';
    clear();
});
$('#btn-x').click(function () {
    num1 = parseInt($('#result').val());
    operator = 'x';
    clear();
    console.log(num1+1)
});
$('#btn-divide').click(function () {
    num1 = parseInt($('#result').val());
    operator = '/';
    clear();
});
document.getElementById('btn-+').addEventListener('click',function () {
    num1 = parseInt($('#result').val());
    operator = '+';
    clear();
});

// ---------------------------------------------------------

$('#btn-total').click(function () {
    num2 = parseInt($('#result').val());
    displayResult();
});


function displayResult(){
    switch (operator){
        case '+':$('#result').val(num1+num2);break;
        case '-':$('#result').val(num1-num2);break;
        case 'x':$('#result').val(num1*num2);break;
        case '/':$('#result').val(num1/num2);break;
    }
}

function clear() {
    $('#result').val('');
}