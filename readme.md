https://workout-selector.herokuapp.com/

# Workout Selector Fullstack Capstone
Fullstack capstone for the thinkful course.

Workout-selector is a application that asks a few simple questions and recommends a workout that fits your needs. Then you can further customize the workout to your liking.
## Screenshots
![Landing page screen shot](https://github.com/rvaidyaa/workout-selector-fullstack-capstone/blob/master/github-images/landingpage.png)
![Account setup screen shot](https://github.com/rvaidyaa/workout-selector-fullstack-capstone/blob/master/github-images/signup.png)
![User homepage screen shot](https://github.com/rvaidyaa/workout-selector-fullstack-capstone/blob/master/github-images/dailyview.png)
![User add meal screen shot](https://github.com/rvaidyaa/workout-selector-fullstack-capstone/blob/master/github-images/addmealpage.png)


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
Find a working prototype with Node at https://workout-selector.herokuapp.com/ .


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
Available workouts (id exercises and url)

Available exercises

chosen workout takes the ID of the available workout

chosen exercises
API endpoints for the back end include:
* POST to '/users/create' for creating a new user
* POST to '/signin' to sign in an existing user
* POST to '/new/create' to add an achievement to a user's list of accomplishments
* PUT to '/allocate-item-to-meal' to categorize a meal to breakfast lunch or dinner
* GET to '/ingredient/:name' to search external api for user food search term
* GET to '/nix/:number' when a user selects a food item to add, this makes a external api call to get specifics on the food item
* DELETE to '/nix/:number' to delete a single food item from the meal
* DELETE to /delete-nutrition-data/:username' to delete all a users meals

## Development Roadmap
Planned additional features and improvements will allow users to:
* Weekly tracker
* Change password
