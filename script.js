//make sure it is an integer
//1a works instead of displaying error message

//1. Create mystery number
//2. empty array to store guesses, count = 0
//3. when click is submitted;
	//a. make userinput a variable, guess
	//b. if all guesses have not been used yet
		//i. if guess is not valid, alert "Please input a number from 1-100"
		//ii. if guess is valid
			//1. check if guess was already made (guesses array)
				//a. send "'You already picked that number, silly! Try again.'"
			//2. if new guess, add one to the count, push guess to guesses array
			//3 check if guess is correct
				//a. if incorrect
					//i. if they have more tries left
					//ii. if last guess, tell player the correct number and a sorry message
				//b. if correct, send congrats
//4. when play again is submitted, reload window	

function guesstimate(g, cN) {
	var distance = Math.abs(g-cN);
	if (g < cN) {
		$('#info').html('Guess higher! ')
	} else {
		$('#info').html('Guess lower! ')
	}
	if (distance > 50) {
		$('#info').append("Your guess is super duper cold!");
		$('body').css('background-color', '#0000b3');
	} else if (distance > 25 && distance <= 50) {
		$('#info').append("Your guess is cold.");
		$('body').css('background-color', '#4d4dff');
	} else if (distance > 10 && distance <= 25) {
		$('#info').append("Your guess is warm!");
		$('body').css('background-color', '#ff5c33');
	} else {
		$('#info').append("Your guess is hot!")
		$('body').css('background-color', '#ff0000');
	}
};	
$(document).ready(function(){
	var correctNumber = Math.floor(Math.random() * 100 + 1);
	var guesses = []; count = 5; 
	$('#submit').click(function(){
		var guess = parseInt($('#guess').val());
		if (count > 0) {
			if (isNaN(guess) == true || guess % 1 !== 0 || guess > 100 || guess < 1) {
				alert("Please input a number from 1-100");
			}else {
				if (guesses.indexOf(guess) > -1) {
					$('#info').html('You already picked that number, silly! Try again.')
				} else {
					count--;
					guesses.push(guess);
					if (guess !== correctNumber) {
						if (count  > 0) {
						guesstimate(guess, correctNumber);
					} else {
						$('#info').html("Sorry, "+ correctNumber + " was the right number. You lost. Try again.")
					}
					} else if (guess === correctNumber) {
						$('#info').html(correctNumber + " is the correct number! You won!")
					}
			}
		}
	} else {
		$('#info').html('Sorry, you ran out of tries. Please play again.')
	}
	});
	$('#again').click(function(){
		window.location.reload();
	})

});