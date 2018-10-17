let quizSelection = [];//empty array to store users selections
//delete endpoint to delete preexisting custom exercise:: runs at start of app
const deletePrexistingExercises = async () => {
    console.log("inside delete prexisting exercises");
      try {
        let result = await $.ajax({
          type: "DELETE",
          url: "/customexercises/"
        });
      } catch (error) {
        console.log(error);
      }
  };
//get the default non customized workout based on user selection
const getWorkout = async quizSelection => {
    //object we want to post
    let workoutObject = {
      difficulty: quizSelection[0],
      goal: quizSelection[1],
      commitment: quizSelection[2]
    };
    try {
      let result = await $.ajax({
        type: "POST",
        url: "/get-specific-routine",
        dataType: "json",
        data: JSON.stringify(workoutObject),
        contentType: "application/json"
      });
      let exercisesArray = result.workoutsResults[0].exercises.split(",");
      let workoutName = result.workoutsResults[0].name;
      let workoutLink = result.workoutsResults[0].link;
      
      createTitle(workoutName, workoutLink);

      for (let i = 0; i < exercisesArray.length; i++) {
        getExercisesByName(exercisesArray[i]);
      }
      $(".exercise-form").hide();
    } catch (error) {
      console.error(error);
    }
};
// gets specific exercices pertaining to that workout 
const getExercisesByName = async exerciseName => {
    console.log('exercise name is', exerciseName);
    try {
        console.log('exercise name is', exerciseName);
      let result = await $.ajax({
        type: "GET",
        url: "/get-specific-exercise/" + exerciseName,
        dataType: "json"
      });
      if (result.item.length != 0) {
        displayExerciseOnCalendar(result.item);
      }
    } catch (error) {
      console.log(error);
    }
  };


// displays exercises from get request in previous section
const displayExerciseOnCalendar = exerciseContent => {
  let exerciseDays = exerciseContent[0].days.split(",");
  for (let i = 0; i < exerciseDays.length; i++) {
    var buildTheHtmlOutput = "";

    $.each(exerciseContent, function(exerciseContentKey, exerciseContentValue) {
      buildTheHtmlOutput += `<div class="exercise default">
        <h4>${exerciseContentValue.name}:</h4>
        <h5 id="sets">Sets</h5>
        ${exerciseContentValue.sets}
        <h5 id="reps">Reps</h5>
        ${exerciseContentValue.reps}
        <br><button class="remove-exercise"><i class="fa fa-minus" aria-hidden="true"></i></button>
      </div>`;
    });
    //append to the appropriate days
    $("." + exerciseDays[i] + " .exercises").append(buildTheHtmlOutput);
    // $("." + exerciseDays[i] + " .exercises-email").append(buildTheHtmlOutput);
  }
};
//creates a title and link to workout
const createTitle = (workoutName, workoutLink) => {
    $(".title").html(workoutName);
    let buildHtml = `<a href='${workoutLink}' target="_blank">${workoutLink}</a>`;
    $(".website").html(buildHtml);
  };
// ALL PERTAINING TO CUSTOM EXERCISES THE USER ADDS
//post to add exercise
const addExercise = (name, sets, reps, days) => {
  
  let customExercises = {
    name: name,
    sets: sets,
    reps: reps,
    days: days
  };
  

  $.ajax({
    type: "POST",
    url: "/customexercises",
    dataType: "json",
    data: JSON.stringify(customExercises),
    contentType: "application/json"
  })
    .done(function(result) {
      getCustomExercises(days);
    })
    .fail(function(jqXHR, error, errorThrown) {
      console.log(jqXHR);
      console.log(error);
      console.log(errorThrown);
    });
};

const getCustomExercises = days => {
  $.ajax({
    type: "GET",
    url: "/customexercises/" + days,
    dataType: "json"
  })
    .done(function(result) {
      console.log(result);
      let buildTheHtmlOutput = "";
      $.each(result.item, function(itemKey,  itemValue) {
        buildTheHtmlOutput += `<div class="exercise custom">
          <h4>${itemValue.name}</h4>
          <input type="hidden" class="exercise-id" value="${itemValue._id}"+>
          <h5 id="sets">Sets</h5>
          ${itemValue.sets}
          <h5 id="reps">Reps</h5>
          ${itemValue.reps}
          <br><button class="minus-exercise"><i class="fa fa-minus" aria-hidden="true"></i></button>
        </div>`;
      });
      //        console.log(buildTheHtmlOutput);
      $("." + days + " .exercises")
        .find(".custom")
        .remove();
      $("." + days + " .exercises-email")
        .find(".custom")
        .remove();
      $("." + days + " .exercises").append(buildTheHtmlOutput);
      $("." + days + " .exercises-email").append(buildTheHtmlOutput);
    })
    .fail(function(jqXHR, error, errorThrown) {
      console.log(jqXHR);
      console.log(error);
      console.log(errorThrown);
    });
};


// use global functions and objects (triggers)

//document ready
$(document).ready(function() {
  //    displayEmptyHtmlBody();
  //    getWorkout(["beginner", "strength", "threex"]);
  $(".landing").show();
  $(".question-one").hide();
  $(".question-two").hide();
  $(".question-three").hide();
  $(".results").hide();
  deletePrexistingExercises();
});
//landing page start button
$(document).on("click", "#start", function(event) {
  $(".landing").hide();
  $(".question-two").hide();
  $(".question-three").hide();
  $(".results").hide();
  $(".question-one").show();
  // hide all the user preferences strength 3x etc
  $(".beginner-display").hide();
  $(".advanced-display").hide();
  $(".strength-display").hide();
  $(".hypertrophy-display").hide();
  $(".conditioning-display").hide();
  $(".threex-display").hide();
  $(".fourx-display").hide();
  $(".fivex-display").hide();
  let quizSelection = [];
});
//final page restart button
$(document).on("click", "#restart", function(event) {
  location.reload();
});
//question one
$(document).on("click", "#question-one", function(event) {
  $(".question-one").hide();
  $(".question-three").hide();
  $(".results").hide();
  $(".landing").hide();
  $(".question-two").show();
});
//question two
$(document).on("click", "#question-two", function(event) {
  $(".question-one").hide();
  $(".question-two").hide();
  $(".results").hide();
  $(".landing").hide();
  $(".question-three").show();
});
//question 3
$(document).on("click", "#question-three", function(event) {
  $(".question-one").hide();
  $(".question-two").hide();
  $(".question-three").hide();
  $(".landing").hide();
  $(".results").show();
});

//these will grab the user selection to display on final page, and adds user inputs to quizSelection Array (below)
$(document).on("click", ".choices .beginner", function(event) {
  $(".beginner-display").addClass("display");
  quizSelection.push("beginner");
  console.log(quizSelection);
});
$(document).on("click", ".choices .advanced", function(event) {
  $(".advanced-display").addClass("display");
  quizSelection.push("advanced");
  console.log(quizSelection);
});
$(document).on("click", ".choices .hypertrophy", function(event) {
  $(".hypertrophy-display").addClass("display");
  quizSelection.push("hypertrophy");
  console.log(quizSelection);
});
$(document).on("click", ".choices .strength", function(event) {
  $(".strength-display").addClass("display");
  quizSelection.push("strength");
  console.log(quizSelection);
});
$(document).on("click", ".choices .conditioning", function(event) {
  $(".conditioning-display").addClass("display");
  quizSelection.push("conditioning");
  console.log(quizSelection);
});
$(document).on("click", ".choices .threex", function(event) {
  $(".threex-display").addClass("display");
  quizSelection.push("threex");
  console.log(quizSelection);
  getWorkout(quizSelection);
});
$(document).on("click", ".choices .fourx", function(event) {
  $(".fourx-display").addClass("display");
  quizSelection.push("fourx");
  console.log(quizSelection);
  getWorkout(quizSelection);
});
$(document).on("click", ".choices .fivex", function(event) {
  $(".fivex-display").addClass("display");
  quizSelection.push("fivex");
  console.log(quizSelection);
  getWorkout(quizSelection);
});
//these will grab the user selection to display on final page, and adds user inputs to quizSelection Array (above)

// add a form for the user to input exercise sets and reps
$(document).on("click", ".add-exercise", function(event) {
  $(this)
    .parent()
    .find(".exercise-form")
    .show();
});

//adds the exercise with the users sets reps and exercise name to the calendar
$(document).on("submit", ".exercise-form", function(event) {
  event.preventDefault();
  $(".form-minus-exercise").show();

  let name = $(this)
    .parent()
    .find(".exercise-name")
    .val();
  let sets = $(this)
    .parent()
    .find(".exercise-sets")
    .val();
  let reps = $(this)
    .parent()
    .find(".exercise-reps")
    .val();
  let days = $(this)
    .parent()
    .find(".add-exercise-day")
    .val();
  console.log("name sets reps and days are:");
  console.log(name, sets, reps, days);
  //trying to grab value for day

  if (name == "") {
    alert("Please input a name");
  } else if (sets == "") {
    alert("Please input # of sets");
  } else if (reps == "") {
    alert("Please input # of reps");
  } else {
    console.log("name sets and reps are :");
    console.log(name, sets, reps);
    let parent = $(this)
      .parent()
      .parent()
      .parent();
    console.log("parent is:");
    console.log(parent);
    parent.find(".exercise-form").hide();

    addExercise(name, sets, reps, days);
  }
});

// deletes the exercise
$(document).on("click", ".form-minus-exercise", function(event) {
  event.preventDefault();
  $(this)
    .parent()
    .hide();

  //inside the dom where we show the exercise add a place to have the id displayed (hidden)and then find by id and delete
});
$(document).on("click", ".remove-exercise", function(event) {
  event.preventDefault();
  $(this)
    .parent()
    .hide();

  //inside the dom where we show the exercise add a place to have the id displayed (hidden)and then find by id and delete
});
$(document).on("click", ".minus-exercise", function(event) {
  event.preventDefault();
  let days = $(this)
    .parent()
    .parent()
    .parent()
    .find(".add-exercise-day")
    .val();
  let exerciseName = $(this)
    .parent()
    .parent()
    .parent()
    .find("h4")
    .text();
  console.log(exerciseName);
  console.log("day is: name is:");
  console.log(days);
  let deleteId = $(this)
    .parent()
    .parent()
    .find(".exercise-id")
    .val();
  //    $(this).parent().parent().find('.exercise-id').val('');
  console.log(
    $(this)
      .parent()
      .remove()
  );
  // get about deleting exercises
  console.log("deleteId is ");
  console.log(deleteId);
  $.ajax({
    type: "DELETE",
    url: "/delete-custom-exercise/" + deleteId
  })
    .done(function(result) {
      getCustomExercises(days);
      getExercisesByName(exerciseName);
    })
    .fail(function(jqXHR, error, errorThrown) {
      console.log(jqXHR);
      console.log(error);
      console.log(errorThrown);
    });
});
//print view
$(document).on("click", ".print", function(event) {
  window.print();
});
