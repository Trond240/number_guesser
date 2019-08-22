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
var challengerOneName = document.querySelector('.challenger-1-name');
var challengerTwoName = document.querySelector('.challenger-2-name');
var challengerOneNew = document.querySelector('.challenger-1-name-change');
var challengerTwoNew = document.querySelector('.challenger-2-name-change');
var challengerOneNameInput = document.querySelector('.AAA');
var challengerTwoNameInput = document.querySelector('.AAAA');

rangeButton.addEventListener('click', updateRange);
rangeButton.addEventListener('click', createRandomNum);
submitGuessButton.addEventListener('click', updateCurrentGuess);
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

function updateCurrentGuess() {
  currentOneGuess.innerText = challengerOneGuess.value;
  currentTwoGuess.innerText = challengerTwoGuess.value;
};

function enterName(){
  console.log(challengerOneNew.innerText)
  challengerOneNew.innerText = challengerOneNameInput.value;
  console.log(challengerTwoNew.innerText)
  challengerTwoNew.innerText = challengerTwoNameInput.value;
};
