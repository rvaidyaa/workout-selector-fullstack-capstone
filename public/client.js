// define global functions variables and objects
//global variable for user answer, email and email body text
let emailBodyHtml = '';
let emailBodyText = '';
let quizSelection = [];

//get the default non customized workout based on user selection
function getWorkout(quizSelection) {
    let difficulty = quizSelection[0];
    let goal = quizSelection[1];
    let commitment = quizSelection[2];
    // add days
    console.log('inside getworkout:')
    console.log('users selections are :')

    let workoutObject = {
        'difficulty': difficulty,
        'goal': goal,
        'commitment': commitment
    };
    console.log(workoutObject);

    $.ajax({
            type: 'POST',
            url: "/get-specific-routine",
            dataType: 'json',
            data: JSON.stringify(workoutObject),
            contentType: 'application/json'
        })
        .done(function (result) {
            console.log('workouts results:');
            console.log(result);
            console.log('exercises:')
            let exercisesArray = result.workoutsResults[0].exercises.split(',');
            let workoutName = result.workoutsResults[0].name;
            let workoutLink = result.workoutsResults[0].link;
            console.log('workout name & link:');
            console.log(workoutName, workoutLink);
            createTitle(workoutName, workoutLink);
            for (let i = 0; i < exercisesArray.length; i++) {
                console.log(exercisesArray[i]);
                getExercisesByName(exercisesArray[i]);
            }

            $('.exercise-form').hide();

        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

function createTitle(workoutName, workoutLink) {
    $('.title').html(workoutName);
    let buildHtml = '';
    buildHtml += '<a href="';
    buildHtml += workoutLink;
    buildHtml += '" target="_blank">';
    buildHtml += workoutLink;
    buildHtml += '</a>';
    $('.website').html(buildHtml);
}


function getExercisesByName(exerciseName) {
    $.ajax({
            type: "GET",
            url: "/get-specific-exercise/" + exerciseName,
            dataType: 'json',
        })
        .done(function (dataOutput) {
            console.log(dataOutput);
            displayExerciseOnCalendar(dataOutput.item);

        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

function displayExerciseOnCalendar(exerciseContent) {

    let exerciseDays = exerciseContent[0].days.split(',');
    for (let i = 0; i < exerciseDays.length; i++) {
        var buildTheHtmlOutput = "";

        $.each(exerciseContent, function (exerciseContentKey, exerciseContentValue) {

            buildTheHtmlOutput += '<div class="exercise">';
            buildTheHtmlOutput += '<h4>';
            buildTheHtmlOutput += exerciseContentValue.name;
            buildTheHtmlOutput += ':';
            buildTheHtmlOutput += '</h4>';
            buildTheHtmlOutput += '<h5 id="sets">Sets</h5>'
            buildTheHtmlOutput += exerciseContentValue.sets;
            buildTheHtmlOutput += '<h5 id="reps">Reps</h5>';
            buildTheHtmlOutput += exerciseContentValue.reps;
            buildTheHtmlOutput += '<br><button class="minus-exercise"><i class="fa fa-minus" aria-hidden="true"></i></button>';
            buildTheHtmlOutput += '</div>';

        });
        //        console.log(buildTheHtmlOutput);
        $('.' + exerciseDays[i] + " .exercises").append(buildTheHtmlOutput);
    }

}
//post to add exercise
function addExercise(name, sets, reps, days) {
    console.log('inside addExercise');
    console.log('name sets and reps are:');
    console.log(name, sets, reps, days);
    let customexercises = {
        'name': name,
        'sets': sets,
        'reps': reps,
        'days': days
    };
    console.log(customexercises);

    $.ajax({
            type: 'POST',
            url: "/customexercises",
            dataType: 'json',
            data: JSON.stringify(customexercises),
            contentType: 'application/json'
        })
        .done(function (result) {
            console.log('workouts results:')
            console.log(result);
            getCustomExercises(days);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

function getCustomExercises(days) {
    $.ajax({
            type: "GET",
            url: "/get-custom-exercises/" + days,
            dataType: 'json',
        })
        .done(function (result) {
            console.log(result);
            let buildTheHtmlOutput = '';
            $.each(result.item, function (itemKey, itemValue) {

                buildTheHtmlOutput += '<div class="exercise">';
                buildTheHtmlOutput += '<h4>';
                buildTheHtmlOutput += itemValue.name;
                buildTheHtmlOutput += ':';
                buildTheHtmlOutput += '</h4>';
                buildTheHtmlOutput += '<h5 id="sets">Sets</h5>'
                buildTheHtmlOutput += itemValue.sets;
                buildTheHtmlOutput += '<h5 id="reps">Reps</h5>';
                buildTheHtmlOutput += itemValue.reps;
                buildTheHtmlOutput += '<br><button class="minus-exercise"><i class="fa fa-minus" aria-hidden="true"></i></button>';
                buildTheHtmlOutput += '</div>';

            });
            //        console.log(buildTheHtmlOutput);
            $('.' + days + " .exercises").append(buildTheHtmlOutput);


        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}
//delete endpoint to delete exercise
function deletePrexistingExercises() {
    console.log('inside delete prexisting exercises');

    $.ajax({
            method: 'DELETE',
            url: '/delete-exercises/'
        })
        .done(function (result) {

        })
        .fail(function (jqXHR, error, errorThrown) {

            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}




// use global functions and objects (triggers)



//document ready
$(document).ready(function () {
    $('.landing').show();
    $('.question-one').hide();
    $('.question-two').hide();
    $('.question-three').hide();
    $('.results').hide();
    deletePrexistingExercises();
});
//landing page start button
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
//final page restart button
$(document).on('click', '#restart', function (event) {
    location.reload();
});
//question one
$(document).on('click', '#question-one', function (event) {
    $('.question-one').hide();
    $('.question-three').hide();
    $('.results').hide();
    $('.landing').hide();
    $('.question-two').show();

});
//question two
$(document).on('click', '#question-two', function (event) {
    $('.question-one').hide();
    $('.question-two').hide();
    $('.results').hide();
    $('.landing').hide();
    $('.question-three').show();
});
//question 3
$(document).on('click', '#question-three', function (event) {
    $('.question-one').hide();
    $('.question-two').hide();
    $('.question-three').hide();
    $('.landing').hide();
    $('.results').show();

});

//these will grab the user selection to display on final page, and adds user inputs to quizSelection Array (below)
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
    quizSelection.push("strength");
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
//these will grab the user selection to display on final page, and adds user inputs to quizSelection Array (above)



// add a form for the user to input exercise sets and reps
$(document).on('click', '.add-exercise', function (event) {
    $(this).parent().find('.exercise-form').show();
});

//adds the exercise with the users sets reps and exercise name to the calendar
$(document).on('submit', '.exercise-form', function (event) {
    event.preventDefault();

    let name = $(this).parent().find('.exercise-name').val();
    let sets = $(this).parent().find('.exercise-sets').val();
    let reps = $(this).parent().find('.exercise-reps').val();
    let days = $(this).parent().find('.add-exercise-day').val();
    console.log('name sets reps and days are:');
    console.log(name, sets, reps, days);
    //trying to grab value for day


    if (name == '') {
        alert('Please input a name');
    } else if (sets == '') {
        alert('Please input # of sets');
    } else if (reps == '') {
        alert('Please input # of reps');
    } else {
        console.log('name sets and reps are :');
        console.log(name, sets, reps);
        let parent = $(this).parent().parent().parent();
        parent.find('.exercise-form').hide();
        var buildTheHtmlOutput = "";
        buildTheHtmlOutput += '<div class="exercise">';
        buildTheHtmlOutput += '<h4>';
        buildTheHtmlOutput += name;
        buildTheHtmlOutput += ':';
        buildTheHtmlOutput += '</h4>';
        buildTheHtmlOutput += '<h5 id="sets">Sets</h5>'
        buildTheHtmlOutput += sets;
        buildTheHtmlOutput += '<h5 id="reps">Reps</h5>';
        buildTheHtmlOutput += reps;
        buildTheHtmlOutput += '<br><button class="minus-exercise"><i class="fa fa-minus" aria-hidden="true"></i></button>';
        buildTheHtmlOutput += '</div>';
        parent.append(buildTheHtmlOutput);
        addExercise(name, sets, reps, days);
    }
});

// deletes the exercise
$(document).on('click', '.form-minus-exercise', function (event) {
    event.preventDefault();
    $(this).parent().hide();

});
//print view
$(document).on('click', '.print', function (event) {
    alert('print clicked');
});
//form to email
$(document).on('click', '.email', function (event) {
    alert('email clicked');

});
// send reading list email

function buildEmailBodyHtml(articles) {
    if (articles.length !== 0) {
        emailBodyHtml += '<p>Below are your articles from Bias Balanced News:</p>';
        emailBodyHtml += '<br />';
        emailBodyHtml += '<ul>';
        $.each(articles, function (index, value) {
            emailBodyHtml += '<li><a href="' + value.articleUrl + '">' + value.articleTitle + '</a>';
            emailBodyHtml += '<p> From ' + value.articleSource + '</p>';
            emailBodyHtml += '<br />';
            emailBodyHtml += '</li>';
        });
        emailBodyHtml += '</ul>';
        emailBodyHtml += '<p>For more headlines, check out Bias Balanced News at https://bias-balanced-news.herokuapp.com/.</p>';

    }
}

function buildEmailBodyText(articles) {
    if (articles.length !== 0) {
        emailBodyText += 'Below are your articles from Bias Balanced News:';
        $.each(articles, function (index, value) {
            emailBodyText += value.articleTitle;
            emailBodyText += value.articleSource;
            emailBodyText += value.articleUrl;
        });
        emailBodyText += 'For more headlines, check out Bias Balanced News at https://bias-balanced-news.herokuapp.com/.';
    }
}

$(document).on('click', '.email', function (event) {
    event.preventDefault();
    //create an input for email
    var emailAddress = $('#email').val();
    if (emailAddress.length === 0) {
        displayError('Please enter an email address');
    } else {
        var emailObject = {
            emailBody: emailBodyText,
            emailHtml: emailBodyHtml,
            emailAddress: emailAddress
        }
        $.ajax({
                type: "POST",
                url: '/send-email/',
                dataType: 'json',
                data: JSON.stringify(emailObject),
                contentType: 'application/json'
            })
            // if API call successful
            .done(function (result) {
                displayError('Email Sent');
                emailAddress = "";
                $("#email").val("");
            })
            // if API call unsuccessful
            .fail(function (jqXHR, error, errorThrown) {
                // return errors
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
                displayError('Something went wrong');
            });
    }
});
