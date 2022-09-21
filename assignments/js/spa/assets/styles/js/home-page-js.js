$('#a-customers').click(function () {
    $('#customer-page-section').css('visibility','visible');
    $('#item-page-section').css('visibility','hidden');
    $('#home-page-section').css('visibility','hidden');
});

$('#a-home').click(function () {
    $('#home-page-section').css('visibility','visible');
    $('#customer-page-section').css('visibility','hidden');
    $('#item-page-section').css('visibility','hidden');
});

$('#a-items').click(function () {
    $('#item-page-section').css('visibility','visible');
    $('#customer-page-section').css('visibility','hidden');
    $('#home-page-section').css('visibility','hidden');
});