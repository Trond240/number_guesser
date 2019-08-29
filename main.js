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
var latestScoreNameOne = document.querySelector('.latest-score-name-1');
var latestScoreNameTwo = document.querySelector('.latest-score-name-2');
var clearResetButtons = document.querySelectorAll('.dark-button');
var alertText = document.querySelector('.alert-text');
var randomNumber = null;
var guessCount = 0;

document.querySelector('.right-side-container').addEventListener('click', deleteWinnerCard);
document.querySelector('.range-button').addEventListener('click', rangeErrorCheck);
document.querySelector('#submit-guess-button').addEventListener('click', submitGuess);
document.querySelector('#clear-button').addEventListener('click', clearInput);
document.querySelector('#reset-button').addEventListener('click', resetInput);
document.querySelectorAll('.input').forEach(function(input) {
  input.addEventListener('keyup', checkButtonDisable);
});

clearResetButtons.forEach(function(button) {
  button.disabled = true;
});

function updateRange() {
  minNum.innerText = minRangeSelection.value;
  maxNum.innerText = maxRangeSelection.value;
};

function createRandomNum() {
  randomNumber = Math.floor(Math.random() * (parseInt(maxRangeSelection.value)
    - parseInt(minRangeSelection.value) + 1) + parseInt(minRangeSelection.value));
  console.log(`Your random number is: ${randomNumber}`);
};

function checkButtonDisable() {
  if (challengerOneNameInput.value !== '' &&
    challengerTwoNameInput.value !== '' &&
    challengerOneGuess.value !== '' &&
    challengerTwoGuess.value !== '') {
      clearResetButtons.forEach(function(button) {
        button.disabled = false;
      })
  } else {
    clearResetButtons.forEach(function(button) {
      button.disabled = true;
    })
  }
};

function submitGuess() {
  enterName();
  limitGuesses(challengerOneGuess, '.guess-alert-text-one');
  limitGuesses(challengerTwoGuess, '.guess-alert-text-two');
  submitChallengerGuesses(challengerOneGuess, challengerOneNameInput, '.challenger-one-reply');
  submitChallengerGuesses(challengerTwoGuess, challengerTwoNameInput, '.challenger-two-reply');
  countGuesses();
};

function countGuesses(){
  guessCount += 1;
};

function enterName(){
  challengerOneNew.innerText = challengerOneNameInput.value;
  challengerTwoNew.innerText = challengerTwoNameInput.value;
  latestScoreNameOne.innerText = challengerOneNameInput.value;
  latestScoreNameTwo.innerText = challengerTwoNameInput.value;
};

function limitGuesses(playerGuessInput, alertClass) {
  if (parseInt(playerGuessInput.value) < parseInt(minRangeSelection.value) || parseInt(playerGuessInput.value) > parseInt(maxRangeSelection.value)) {
    playerGuessInput.value = '';
    document.querySelector(alertClass).innerHTML = `<img src="error-icon.svg"
    alt="error message icon" class="alert-img"> Guess is outside range!`;
    playerGuessInput.style.border = '1px solid #DD1970';
  } else if (playerGuessInput.value === '') {
    document.querySelector(alertClass).innerHTML = `<img src="error-icon.svg"
    alt="error message icon" class="alert-img"> Enter a guess!`;
    playerGuessInput.style.border = '1px solid #DD1970';
  } else {
    document.querySelector(alertClass).innerHTML = '';
    playerGuessInput.style.border = '';
  }
};

function updateCurrentGuess() {
  currentOneGuess.innerText = challengerOneGuess.value;
  currentTwoGuess.innerText = challengerTwoGuess.value;
};

function submitChallengerGuesses(challengerGuess, challengerNameInput, challengerReplyClass) {
  updateCurrentGuess();
  if (parseInt(challengerGuess.value) === randomNumber) {
    document.querySelector(challengerReplyClass).innerText = "BOOM!";
    createWinnerCard(challengerNameInput.value);
  } else if (parseInt(challengerGuess.value) > randomNumber) {
    document.querySelector(challengerReplyClass).innerText = "that's too high";
  } else if (parseInt(challengerGuess.value) < randomNumber) {
    document.querySelector(challengerReplyClass).innerText = "that's too low";
  }
};

function createWinnerCard(winner) {
  var winnerCard = document.createElement('section');
  winnerCard.className = 'winner-card-border';
  winnerCard.innerHTML = `
      <p class="center-title"><span class="bold-name">${challengerOneNameInput.value}</span>
      <span class="VS"> VS </span><span class="bold-name">${challengerTwoNameInput.value}</span></p>
      <div>
        <h2 class="center-title above-border">${winner}</h2>
        <h2 class="center-title-2">WINNER</h2>
      </div>
      <div class="winner-card-botom-row">
        <p><span class ="score-card-guesses">${(guessCount * 2)}</span> GUESSES</p>
        <p><span class ="score-card-minutes">1.32</span> MINUTES</P>
        <button class ="score-card-button">X</button>
      </div>`;
    document.querySelector('.right-side-container').appendChild(winnerCard);
    widenRange();
    updateRange();
    createRandomNum();
};

function deleteWinnerCard(event) {
  if (event.target.className === 'score-card-button') {
    event.target.closest('.winner-card-border').remove();
  }
};

function widenRange() {
  maxRangeSelection.value = (parseInt(maxRangeSelection.value) + 10);
  minRangeSelection.value = (parseInt(minRangeSelection.value) - 10);
};

function clearInput() {
  document.querySelectorAll('.input').forEach(function(input) {
    input.value = '';
  });
};

function clearLatestScore() {
  latestScoreNameOne.innerText = 'Challenger 1 Name';
  latestScoreNameTwo.innerText = 'Challenger 2 Name';
  challengerOneNew.innerText = 'Challenger 1';
  challengerTwoNew.innerText = 'Challenger 2';
};

function clearLatestGuess() {
  currentOneGuess.innerText = '?';
  currentTwoGuess.innerText = '?';
  minNum.innerText = 1;
  maxNum.innerText = 100;
};

function removeElement() {
  var elements = document.querySelectorAll('.winner-card-border');
  elements.forEach(function(element) {
    element.parentNode.removeChild(element);
  })
};

function clearRange() {
  minNum.innerText = 1;
  maxNum.innerText = 100;
  minRangeSelection.value = '';
  maxRangeSelection.value = '';
}

function resetInput() {
  document.querySelectorAll('.input').forEach(function(input) {
    input.value = '';
  });
  removeElement();
  createRandomNum();
  document.querySelector('.challenger-two-reply').innerText = "";
  document.querySelector('.challenger-one-reply').innerText = "";
  clearLatestScore();
  clearLatestGuess();
  document.querySelector('.max-range-input').value = '';
  document.querySelector('.min-range-input').value = '';
  clearAlerts();
};

function rangeErrorCheck() {
  if (minRangeSelection.value === '' || maxRangeSelection.value === '') {
    emptyBoxError();
  } else if (parseInt(minRangeSelection.value) > parseInt(maxRangeSelection.value)) {
    alertText.innerHTML = `<img src="error-icon.svg"
      alt="error message icon" class="alert-img"> Sorry, the max must be higher than the min, try again!`;
  } else {
    createRandomNum();
    updateRange();
    clearAlerts();
  }
};

function clearAlerts() {
  alertText.innerHTML = '';
  maxRangeSelection.style.border = '';
  minRangeSelection.style.border = '';
  challengerOneGuess.style.border = '';
  challengerTwoGuess.style.border = '';
  document.querySelector('.guess-alert-text-one').innerHTML = '';
  document.querySelector('.guess-alert-text-two').innerHTML = '';
};

function emptyBoxError() {
    alertText.innerHTML = `<img src="error-icon.svg"
      alt="error message icon" class="alert-img"> Missing range entries, please complete`;
    if (minRangeSelection.value === '') {
      minRangeSelection.style.border = '1px solid #DD1970';
    } else {
      minRangeSelection.style.border = '';
    };
    if (maxRangeSelection.value === '') {
      maxRangeSelection.style.border = '1px solid #DD1970';
    } else {
      maxRangeSelection.style.border = '';
    }
};
