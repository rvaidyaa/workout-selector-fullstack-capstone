// define global functions variables and objects
//global variable for user answer


let quizSelection = [];

//get the default non customized workout based on user selection
function getWorkout(quizSelection) {
    let difficulty = quizSelection[0];
    let goal = quizSelection[1];
    let commitment = quizSelection[2];
    console.log('users selections are :')
    console.log(difficulty, goal, commitment);

    //get request to server endpoint
    //    $.ajax({
    //            type: 'GET',
    //            url: '/get-specific-workout/' + nixId + '/' + ,
    //            dataType: 'json',
    //
    //        })
    //        .done(function (result) {
    //            // what we want to do with the return from database get request
    //            // populate the exercises to the calendar
    //        })
    //        .fail(function (jqXHR, error, errorThrown) {
    //            //client auto generates error when we miss
    //            console.log(jqXHR);
    //            console.log(error);
    //            console.log(errorThrown);
    //        });
}
//post to add exercise
function addExercise() {

};
//delete endpoint to delete exercise





// use global functions and objects (triggers)




$(document).ready(function () {
    $('.landing').show();
    $('.question-one').hide();
    $('.question-two').hide();
    $('.question-three').hide();
    $('.results').hide();
});
$(document).on('click', '#start', function (event) {
    $('.landing').hide();
    $('.question-two').hide();
    $('.question-three').hide();
    $('.results').hide();
    $('.question-one').show();
    // hide all the user preferences strength 3x etc
    $('.beginner-display').hide();
    $('.advanced-display').hide();
    $('.strength-display').hide();
    $('.hypertrophy-display').hide();
    $('.conditioning-display').hide();
    $('.threex-display').hide();
    $('.fourx-display').hide();
    $('.fivex-display').hide();
    let quizSelection = [];
});

$(document).on('click', '#question-one', function (event) {
    $('.question-one').hide();
    $('.question-three').hide();
    $('.results').hide();
    $('.landing').hide();
    $('.question-two').show();

});
$(document).on('click', '#question-two', function (event) {
    $('.question-one').hide();
    $('.question-two').hide();
    $('.results').hide();
    $('.landing').hide();
    $('.question-three').show();
});
$(document).on('click', '#question-three', function (event) {
    $('.question-one').hide();
    $('.question-two').hide();
    $('.question-three').hide();
    $('.landing').hide();
    $('.results').show();

});

//these will grab the user selection
$(document).on('click', '.choices .beginner', function (event) {
    $('.beginner-display').addClass('display');
    quizSelection.push("beginner");
    console.log(quizSelection);
});
$(document).on('click', '.choices .advanced', function (event) {
    $('.advanced-display').addClass('display');
    quizSelection.push("advanced");
    console.log(quizSelection);
});
$(document).on('click', '.choices .hypertrophy', function (event) {
    $('.hypertrophy-display').addClass('display');
    quizSelection.push("hypertrophy");
    console.log(quizSelection);
});
$(document).on('click', '.choices .strength', function (event) {
    $('.strength-display').addClass('display');
    quizSelection.push("Strength");
    console.log(quizSelection);
});
$(document).on('click', '.choices .conditioning', function (event) {
    $('.conditioning-display').addClass('display');
    quizSelection.push("conditioning");
    console.log(quizSelection);
});
$(document).on('click', '.choices .threex', function (event) {
    $('.threex-display').addClass('display');
    quizSelection.push("threex");
    console.log(quizSelection);
    getWorkout(quizSelection);
});
$(document).on('click', '.choices .fourx', function (event) {
    $('.fourx-display').addClass('display');
    quizSelection.push("fourx");
    console.log(quizSelection);
    getWorkout(quizSelection);
});
$(document).on('click', '.choices .fivex', function (event) {
    $('.fivex-display').addClass('display');
    quizSelection.push("fivex");
    console.log(quizSelection);
    getWorkout(quizSelection);
});





// add a exercise form
$(document).on('click', '.add-exercise', function (event) {
    console.log(quizSelection);
    var buildTheHtmlOutput = "";
    buildTheHtmlOutput += '<div class="exercise">';
    buildTheHtmlOutput += '<h4>Exercise Name<h4>';
    buildTheHtmlOutput += '<input type="text" class="exercise-name">';
    buildTheHtmlOutput += '<h4>Sets<h4>';
    buildTheHtmlOutput += '<input type="text" class="exercise-sets">';;
    buildTheHtmlOutput += '<h4>Reps<h4>';
    buildTheHtmlOutput += '<input type="text" class="exercise-reps">';
    buildTheHtmlOutput += '<button class="add-exercise" value="add">Add</button>';
    buildTheHtmlOutput += '<div>'
    //this logic
    //    $(this).append(buildTheHtmlOutput);
    $(this).find("div");
    $('.seven-cols .exercises').append(buildTheHtmlOutput);

});
//add exercise
