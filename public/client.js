$(document).ready(function () {
    //    $('.landing').show();
    //    $('.question-one').hide();
    //    $('.question-two').hide();
    //    $('.question-three').hide();
    //    $('.results').hide();
});
$('#start').on('click', function (event) {
    $('.question-one').show();
});
$('#question-one').on('click', function (event) {
    $('.question-one').hide();
    $('.question-two').show();
});
$('#question-two').on('click', function (event) {
    $('.question-one').hide();
    $('.question-two').show();
});
$('#question-three').on('click', function (event) {
    $('.question-one').hide();
    $('.question-two').show();
});
