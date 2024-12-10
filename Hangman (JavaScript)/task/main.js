// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')
//variables initialization
    //words
const wordList = ['python', 'java', 'swift', 'javascript']
let currentWord;
let wordArray;
    //display
let blankDisplayed;
    //count && tracker
let winCount = 0;
let lostCount = 0;
let lives;
let answeredList;

    //game methods & abstractions
const showTitle = () => {
    console.log(`H A N G M A N`)
}

const showResults = () => {
    console.log(`You won: ${winCount} times`)
    console.log(`You lost: ${lostCount} times`)
}
const isCorrect = (answer) => {
    return currentWord.includes(answer.toLowerCase())
}

const isAnswerValid = (answer) => {
    let regex = /[a-z]/
    return regex.test(answer);
}

const updateDisplay = (answer) => {
    wordArray.forEach((letter, index) => {
        if (letter === answer){
            blankDisplayed[index] = answer;
        }
    });
}

const inGame = () => {
    currentWord = wordList[Math.floor(Math.random() * wordList.length)]
    wordArray = currentWord.split("");
    blankDisplayed = Array(currentWord.length).fill("-");
    answeredList = [];
    lives = 8;

    do {
        if (blankDisplayed.join("") === currentWord) break;
        console.log(blankDisplayed.join(""));
        let answer = input(`Input a letter: `)

        if (!(answer.length === 1)){
            console.log("Please, input a single letter.");
            continue;
        }
        if (!isAnswerValid(answer)) {
            console.log("Please, enter a lowercase letter from the English alphabet.");
            continue
        }
        if (answeredList.includes(answer)){
            console.log("You've already guessed this letter.");
            continue;
        }
        if (!answeredList.includes(answer) && isCorrect(answer)){
            answeredList.push(answer);
            updateDisplay(answer);
        } else{
            console.log("That letter doesn't appear in the word.")
            answeredList.push(answer);
            lives -= 1;
        }

    } while (lives > 0)
}

const oneRound = () => {
    console.log();
    inGame();
    if(lives <= 0){
        lostCount++;
        console.log(`You lost!`)
    } else {
        winCount++;
        console.log(`You guessed the word ${currentWord}!
    You survived!`)
    }
}


const initGame = () => {
        do {
            answer = input(`Type "play" to play the game, "results" to show the scoreboard, and "exit" to quit:`);

        }
        while (answer !== 'play' && answer !== 'results' && answer !== 'exit')
        if (answer === 'results') {
            showResults();
            initGame();
        }
        else if (answer === 'play') {
            oneRound();
            initGame();
        }
        else if (answer === "exit") ;
}

//implementation
showTitle();
console.log();
initGame();