var letters = ["peony", "orchid", "jasmine", "daisy", "marigold", "violet"];
var winCount = 0;
var guessesLeftCount = 8;//user can guess 8 times
var guessedLetters = []; //Array to capture users letter input


var randomPick = letters[Math.floor(Math.random() * letters.length)];
//eg : var randomPick = "raji"
console.log("randomPick : " + randomPick); // To see the random pick in console

var hyphenArray = []; //assigned an empty array
for (var i = 0; i < randomPick.length; i++) { //this will give the required number of hyphens for strings from randomPick
    hyphenArray.push("_");
}
console.log("hyphenArray" + hyphenArray);

document.onkeyup = function (event) {     // This function is run whenever the user presses a key.
    var userGuess = event.key;  // which key was pressed.
    document.getElementById("resultID").innerHTML = ""; //This will show blank until user wins or looses.
    
    if (event.code === "Space") {
        updateDisplay(); // calling function to update the display
    }

    if (guessedLetters.indexOf(userGuess) != -1) {// if the letter is already guessed do nothing that is why there is no else statement for this if statement

    }
    
    else {
        if (event.code != "Space") { //to not to capture the space key while starting the game
            guessedLetters.push(userGuess); // This will capture the letter pressed by user
        }

        if (randomPick.indexOf(userGuess) != -1) {
            console.log("correct");
            var index = randomPick.indexOf(userGuess);
            hyphenArray[index] = userGuess;//replaces the index position on hyphenArray with user guessed letter
            //Eg. - - A -
            console.log(hyphenArray);
        }

        else {
        
            if (event.code != "Space") {
                guessesLeftCount--;
            }
        }
    }

    // If hyphenArray doesnot have hyphens left user wins with 1 point and resets the game
    if (hyphenArray.indexOf("_") === -1) { 
        winCount++;
        playSound("winAudio");
        resetGame(); // calling function to reset the game
        document.getElementById("resultID").innerHTML = "You Won!!!"; // displays win message
    }
    // If the guess left count number is 0 this will this will reset the game and says user lost
    if (guessesLeftCount === 0) {
        playSound("lostAudio")
        resetGame() // calling function to reset the game
        document.getElementById("resultID").innerHTML = "You Lost!!!"; // displays lost message
    }
    
    updateDisplay();// calling function to display the update

    }

// defining function to play audio. Input parameter is the html id of the audio control for win and loss.
function playSound(id) {
    var x = document.getElementById(id);
    x.play();

}

// this is to reset the game
function resetGame() { 
    guessesLeftCount = 8;
    guessedLetters = [];
    randomPick = letters[Math.floor(Math.random() * letters.length)];
    hyphenArray = [];
    for (var i = 0; i < randomPick.length; i++) {
        hyphenArray.push("_");
    }
}
// this function is to update the display
function updateDisplay() { 
    document.getElementById("wins").innerHTML = winCount;
    document.getElementById("hyphenArrayID").innerHTML = hyphenArray.join(" ");
    document.getElementById("remGuess").innerHTML = guessesLeftCount;
    document.getElementById("userGuessed").innerHTML = guessedLetters.toString();
}



