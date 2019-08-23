var challengerOneName = document.querySelector('.challenger-1-name');
var challengerTwoName = document.querySelector('.challenger-2-name');
var challengerOneNew = document.querySelector('.challenger-1-name-change');
var challengerTwoNew = document.querySelector('.challenger-2-name-change');
var challengerOneNameInput = document.querySelector('.player-1-input-name');
var challengerTwoNameInput = document.querySelector('.player-2-input-name');
var challengerOneGuess = document.querySelector('#challenger-one-guess');
var challengerTwoGuess = document.querySelector('#challenger-two-guess');
var currentOneGuess = document.querySelector('.guess-number-1');
var currentTwoGuess = document.querySelector('.guess-number-2');
var minRangeSelection = document.querySelector('.min-range-input');
var maxRangeSelection = document.querySelector('.max-range-input');
var minNum = document.querySelector('.min-number');
var maxNum = document.querySelector('.max-number');
var rangeButton = document.querySelector('.range-button');
var submitGuessButton = document.querySelector('#submit-guess-button');
var randomNumber = null;
var latestScoreNameOne = document.querySelector('.latest-score-name-1');
var latestScoreNameTwo = document.querySelector('.latest-score-name-2');
// var styleButton = document.querySelector(".style-button");
// var changeColorButton = document.querySelector('.change-color-button');


rangeButton.addEventListener('click', updateRange);
rangeButton.addEventListener('click', createRandomNum);
submitGuessButton.addEventListener('click', updateCurrentGuess);
submitGuessButton.addEventListener('click', submitGuess);
submitGuessButton.addEventListener('click', enterName);

function updateRange() {
  minNum.innerText = minRangeSelection.value;
  maxNum.innerText = maxRangeSelection.value;
};

function createRandomNum() {
  randomNumber = Math.floor(Math.random() * (parseInt(maxRangeSelection.value)
    - parseInt(minRangeSelection.value) + 1) + parseInt(minRangeSelection.value));
  console.log(randomNumber);
};

function enterName(){
  challengerOneNew.innerText = challengerOneNameInput.value;
  challengerTwoNew.innerText = challengerTwoNameInput.value;
  latestScoreNameOne.innerText = challengerOneNameInput.value;
  latestScoreNameTwo.innerText = challengerTwoNameInput.value;
};


// //changeColorButton.addEventListener('click', funtion () {
//   styleButton.style.backgroundColor = '';
//
// });
function submitGuess() {
  updateCurrentGuess();
  submitChallengerOneGuess();
  submitChallengerTwoGuess();
};

function updateCurrentGuess() {
  currentOneGuess.innerText = challengerOneGuess.value;
  currentTwoGuess.innerText = challengerTwoGuess.value;
};

function submitChallengerOneGuess() {
  if (parseInt(challengerOneGuess.value) === randomNumber) {
    document.querySelector('.challenger-one-reply').innerText = "BOOM!";
    // createWinnerCard('player1');
  } else if (parseInt(challengerOneGuess.value) > randomNumber) {
    document.querySelector('.challenger-one-reply').innerText = "that's too high";
  } else if (parseInt(challengerOneGuess.value) < randomNumber) {
    document.querySelector('.challenger-one-reply').innerText = "that's too low";
  }
};

function submitChallengerTwoGuess() {
  if (parseInt(challengerTwoGuess.value) === randomNumber) {
    document.querySelector('.challenger-two-reply').innerText = "BOOM!";
    createWinnerCard('player2');
  } else if (parseInt(challengerTwoGuess.value) > randomNumber) {
    document.querySelector('.challenger-two-reply').innerText = "that's too high";
  } else if (parseInt(challengerTwoGuess.value) < randomNumber) {
    document.querySelector('.challenger-two-reply').innerText = "that's too low";
  }
};

// function createWinnerCard(winner) {
//
// }

// on buton submit, if guess is greater than randomNumber,
// return this number is too high.  If guess is lower,
// return this number is too low.  If guess is the same as
// randomNumer create a card.

