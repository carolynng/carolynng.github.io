const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

// timer array holds values for minutes, seconds, hundredths, and thousandths
var timer = [0, 0, 0, 0];
var interval;
var timerRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
	if (time <= 9) {
		time = "0" + time;
	}

	return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
	let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + "." + leadingZero(timer[2]);
	theTimer.innerHTML = currentTime;
	timer[3]++;

	timer[0] = Math.floor( timer[3]/6000 );
	timer[1] = Math.floor( timer[3]/100 - (timer[0] * 60) );
	timer[2] = Math.floor( timer[3] - (timer[1] * 100 + timer[0] * 6000) );
}

// Match the text entered with the provided text on the page:
function spellCheck() {
	let textEntered = testArea.value;
	let originTextMatch = originText.substring( 0, textEntered.length );

	if (textEntered === originText) {
		clearInterval(interval); // This clears the clock interval, effectively stopping the clock
		testWrapper.style.borderColor = "#32CD32";
	}
	else {
		if (textEntered === originTextMatch) {
			testWrapper.style.borderColor = "#65CCF3";
		}
		else {
			testWrapper.style.borderColor = "#E95D0F";
		}
	}
}

// Start the timer:
function startTimer() {
	let textEnteredLength = testArea.value.length;
	if (textEnteredLength === 0 && !timerRunning) {
		timerRunning = true;
		interval = setInterval(runTimer, 10);
	}
}

// Reset everything:
function reset() {
	clearInterval(interval);
	interval = null;
	timerRunning = false;
	timer = [0, 0, 0, 0];

	theTimer.innerHTML = "00:00.00";
	testArea.value = "";
	testWrapper.style.borderColor = "grey";
}


// Event listeners for keyboard input and the reset button:

// Event to start timer as soon as the first key is pressed
testArea.addEventListener("keypress", startTimer, false);
// Event to start checking the typed text with the given text
// to figure out when the user has completed the task.
testArea.addEventListener("keyup", spellCheck, false);

resetButton.addEventListener("click", reset, false);