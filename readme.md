https://workout-selector.herokuapp.com/

# Workout Selector Fullstack Capstone
Fullstack capstone for the thinkful course.

Workout-selector is a application that asks a few simple questions and recommends a workout that fits your needs. Then you can further customize the workout to your liking.
## Screenshots
![Landing page screen shot](https://github.com/rvaidyaa/workout-selector-fullstack-capstone/blob/master/github-images/landing.png)
![Account setup screen shot](https://github.com/rvaidyaa/workout-selector-fullstack-capstone/blob/master/github-images/option1.png)
![Account setup screen shot](https://github.com/rvaidyaa/workout-selector-fullstack-capstone/blob/master/github-images/option2.png)
![Account setup screen shot](https://github.com/rvaidyaa/workout-selector-fullstack-capstone/blob/master/github-images/option3.png)
![User homepage screen shot](https://github.com/rvaidyaa/workout-selector-fullstack-capstone/blob/master/github-images/results.png)



## Initial UX
User Stories

As a visitor i would like to know what the app is about

![UI Flow handwritten draft](https://github.com/rvaidyaa/workout-selector-fullstack-capstone/blob/master/Wireframe/landing.jpg)

As a visitor I would like the application to guide me to a particular workout via questionaire/ quiz

![UI Flow handwritten draft](https://github.com/rvaidyaa/workout-selector-fullstack-capstone/blob/master/Wireframe/quiz.jpg)

As a visitor i would like to customize a workout by adding exercises or deleting exercises

As a visitor I would like to be able to print/pdf or email myself the workout

![UI Flow handwritten draft](https://github.com/rvaidyaa/workout-selector-fullstack-capstone/blob/master/Wireframe/result.jpg)

![UI Flow handwritten draft](https://github.com/rvaidyaa/workout-selector-fullstack-capstone/blob/master/Wireframe/customize.jpg)


## Working Prototype
Find a working prototype with Node at https://workout-selector.herokuapp.com/ and with React here https://rvaidyaa.github.io/workout-selector-fullstack-capstone-react/build/.


## Technical

### Front End

* HTML5
* CSS3
* JavaScript
* jQuery
* React

### Back End

* Node.js
* Express.js
* MongoDB
* Mongoose
* mLab database
"https://mochajs.org/"  "http://chaijs.com/"

### Responsive

* The app is responsive and optimized for both desktop and mobile viewing and use.

### Security

* User passwords are encrypted using "https://github.com/dcodeIO/bcrypt.js"

## API Documentation

API endpoints for the back end include:
* POST to '/workouts' to get user selected workout
* GET to '/exercises' to get exercises pertaining to the workout and display them on calendar
* POST to '/customexercises' to add a custom exercise to the workout
* GET to '/get-custom-exercises' to disiplay the custom exercise on the calendar
* DELETE to '/delete-exercises' on refresh and start to clear custom exercises
* DELETE to '/delete-custom-exercise' to delete a custom exercise from workout

## Development Roadmap
Planned additional features and improvements will allow users to:
* Additional Workouts
* Option to add notes
