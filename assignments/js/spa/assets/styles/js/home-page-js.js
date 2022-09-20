$('#a-customers').click(function () {
    $('#customer-page-section').css('visibility','visible');
});

$('#a-home').click(function () {
    $('#home-page-section').css('visibility','visible');
    $('#customer-page-section').css('visibility','hidden');
});