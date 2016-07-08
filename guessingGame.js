// i thought that everything is supposed to be wrapped around $(document).ready for best practice for jQuery. is this not true?
/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
(function(){
	var playersGuess;

// What is the point of this? Why not just
// var winningNumber = = Math.floor(Math.random() * 100 + 1);
// and delete generate?
var winningNumber = generateWinningNumber();


/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	return Math.floor(Math.random()*100 + 1);
}

// Fetch the Players Guess
//when i try to put playersGuessSubmission() in jQuery, chrome complains the function is not defined
function playersGuessSubmission(){
	//does plus sign not work for jquery? +$('#guess').val()); - didn't work when i tried

	playersGuess = parseInt($('#guess').val());
	// $('#guess').val(''); //when i put this, the submit button can run again without a number stored. whhy?
	document.getElementById('guess').value = "";
	checkGuess();
}
console.log('playersGuessSubmission defined')

// Determine if the next guess should be a lower or higher number
function lowerOrHigher(){
	if(playersGuess < winningNumber){
		return "Guess higher!";
	} else {
		return "Guess lower!";
	}
}

//return a string that will be used in the DOM message when the checkGuess function is invoked.
function guessMessage(){
	var distance = Math.abs(winningNumber-playersGuess);
	if (distance > 50) {
		$('#info').html("Your guess is super cold (more than 50 digits away)! " + lowerOrHigher());
		$('body').css('background', 'url(images/cold.gif)');
		$('.container').css('background-color', 'blue');
	} else if (distance > 25 && distance <= 50) {
		$('#info').html("Your guess is cold (more than 25 digits away). " + lowerOrHigher());
		$('body').css('background', 'url(images/cool.gif)');
		$('.container').css('background-color', 'lightblue');
	} else if (distance > 10 && distance <= 25) {
		$('#info').html("Your guess is warm (within 25 units)! " + lowerOrHigher());
		$('body').css('background', 'url(images/warm.gif)');
		$('.container').css('background-color', 'yellow');
	} else {
		$('#info').html("Your guess is hot (within 10 units)! " + lowerOrHigher());
		$('body').css('background', 'url(images/hot.gif)');
		$('.container').css('background-color', 'red');
	}	
}

// Check if the Player's Guess is the winning number 
var guesses =[];
var count = 5;
function checkGuess(){
	if (count > 1) {
		if (isNaN(playersGuess) === true || playersGuess % 1 !== 0 || playersGuess > 100 || playersGuess < 1) {
					$('#info').html("Please input a number from 1-100");
				} else if (playersGuess === winningNumber){
					$('#info').css('font-size', '30px');
					$('#info').html(winningNumber + " is the correct number! You won!");
					setInterval(nextBackground, 1000);
					$('.container').css('background-color', 'rgb(248,248,255)');
				}else if(guesses.indexOf(playersGuess) > -1){
					$('#info').html('You already guessed ' + playersGuess + '. Submit a new guess!');
				}else {
					guesses.push(playersGuess);
					count--;
					guessMessage();
		}
	} else{
		$('#info').html('Sorry, you ran out of turns :(. The correct number was ' + winningNumber + '. Please play again.');
		$('body').css('background', 'url(images/loser.gif)');
		$('.container').css('background-color', 'gray');
	}
}


// Create a provide hint button that provides additional clues to the "Player"

//does not work:
//document.getElementById('hint').addEventListener("click", provideHint());

function provideHint(){
	//count === 5 doesn't work!
	if (count === 5){
		$('#info').html('Guess a number before you ask for a hint!');
	} else if (count === 4){
		$('#info').html('One of the following is the winning number: ' + listArray());
	} else if (count === 3){
		$('#info').html('Your number is ' + isPrime());
	} else if (count === 2){
		$('#info').html('Your number is ' + isEven());
	}
}

function isEven(){
	if(winningNumber % 2 === 0){
		return 'even';
	}else {
		return 'odd';
	}
}

function isPrime(){
	if(winningNumber === 1) {
		return 'neither prime or composite';
	} else {
		for (var i = 2; i < winningNumber; i++){
			if (winningNumber % i === 0){
				return 'composite';
			}
		}
	}
	return 'prime';
}
var arr = [];
function listArray(){
	var listLength = count * 2;
	for(var i = 0; i < listLength; i++){
		arr.push(generateWinningNumber());
	}
	var indexOfWin = Math.floor(Math.random() * listLength);
	arr.splice(indexOfWin, 1, winningNumber);
	return arr;
}
//keep getting 'once is not a function' if listed as var once 

function once(func){
	var called;
	var inner = function(){
		if(!called){
			called = true;
			return func();
		}
	};
	return inner;
};
// Allow the "Player" to Play Again

function playAgain(){
	window.location.reload();
}

var backgrounds = new Array(
    'url(images/celebrate.gif)'
  , 'url(images/balloons.png)'
);


var current = 0;

function nextBackground() {
    current++;
    current = current % backgrounds.length;
    $('body').css('background', backgrounds[current]);
}

$(document).ready(function(){
	$(document).keydown(function(e){
		if (e.keyCode === 13){
			playersGuessSubmission();
		}
	});
	console.log('about to assign click handler');
	$('#submit').on('click', playersGuessSubmission);
	$('#hint').on('click', provideHint);
	$('#again').on('click', playAgain);
})
})();

/* **** Event Listeners/Handlers ****  */

//should i wrap everything around document.ready or just things that require jQuery?
