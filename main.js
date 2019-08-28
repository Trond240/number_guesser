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
var latestScoreNameOne = document.querySelector('.latest-score-name-1');
var latestScoreNameTwo = document.querySelector('.latest-score-name-2');
var clearResetButtons = document.querySelectorAll('.dark-button');
var resetButton = document.querySelector('#reset-button')
var randomNumber = null;
var clearButton = document.querySelector('#clear-button');
var alertText = document.querySelector('.alert-text');
var rightSide = document.querySelector('.right-side-container');

// reveset after event bubbling lesson.
rightSide.addEventListener('click', deleteWinnerCard);
rangeButton.addEventListener('click', effectRange);
rangeButton.addEventListener('click', createRandomNum);
submitGuessButton.addEventListener('click', submitGuess);
clearButton.addEventListener('click', clearInput);
resetButton.addEventListener('click', resetInput);
document.querySelectorAll('.input').forEach(function(input) {
  input.addEventListener('keyup', checkButtonDisable);
});

clearResetButtons.forEach(function(button) {
  button.disabled = true;
});

function effectRange() {
  rangeError();
};

function updateRange() {
  minNum.innerText = minRangeSelection.value;
  maxNum.innerText = maxRangeSelection.value;
};

function createRandomNum() {
  randomNumber = Math.floor(Math.random() * (parseInt(maxRangeSelection.value)
    - parseInt(minRangeSelection.value) + 1) + parseInt(minRangeSelection.value));
  console.log(randomNumber);
};

function checkButtonDisable() {
  if (challengerOneNameInput.value !== '' &&
    challengerTwoNameInput.value !== '' &&
    challengerOneGuess.value !== '' &&
    challengerTwoGuess.value !== '') {
      // Make sure we can write this as a for loop too!
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
  updateCurrentGuess();
  submitChallengerOneGuess();
  submitChallengerTwoGuess();
  enterName();
  emptyGuessError();
};

function enterName(){
  challengerOneNew.innerText = challengerOneNameInput.value;
  challengerTwoNew.innerText = challengerTwoNameInput.value;
  latestScoreNameOne.innerText = challengerOneNameInput.value;
  latestScoreNameTwo.innerText = challengerTwoNameInput.value;
};

function limitGuessOne(input) {
  if (input.value < minRangeSelection.value || input.value > maxRangeSelection.value) {
    input.value = '';
    document.querySelector('.guess-alert-text-one').innerHTML = `<img src="error-icon.svg"
      alt="error message icon" class="alert-img"> Guess is outside range!`;
    challengerOneGuess.style.border = '1px solid #DD1970';
  } else {
      document.querySelector('.guess-alert-text-one').innerHTML = '';
      challengerOneGuess.style.border = '';
  }
};

function limitGuessTwo(input) {
  if (input.value < minRangeSelection.value || input.value > maxRangeSelection.value) {
    input.value = '';
    document.querySelector('.guess-alert-text-two').innerHTML = `<img src="error-icon.svg"
      alt="error message icon" class="alert-img"> Guess is outside range!`;
    challengerOneGuess.style.border = '1px solid #DD1970';
  } else {
      document.querySelector('.guess-alert-text-two').innerHTML = '';
      challengerOneGuess.style.border = '';
  }
};

function updateCurrentGuess() {
  currentOneGuess.innerText = challengerOneGuess.value;
  currentTwoGuess.innerText = challengerTwoGuess.value;
};

function submitChallengerOneGuess() {
  if (parseInt(challengerOneGuess.value) === randomNumber) {
    document.querySelector('.challenger-one-reply').innerText = "BOOM!";
    createWinnerCard(challengerOneNameInput.value);
  } else if (parseInt(challengerOneGuess.value) > randomNumber) {
    document.querySelector('.challenger-one-reply').innerText = "that's too high";
  } else if (parseInt(challengerOneGuess.value) < randomNumber) {
    document.querySelector('.challenger-one-reply').innerText = "that's too low";
  }
};

function submitChallengerTwoGuess() {
  if (parseInt(challengerTwoGuess.value) === randomNumber) {
    document.querySelector('.challenger-two-reply').innerText = "BOOM!";
    createWinnerCard(challengerTwoNameInput.value);
  } else if (parseInt(challengerTwoGuess.value) > randomNumber) {
    document.querySelector('.challenger-two-reply').innerText = "that's too high";
  } else if (parseInt(challengerTwoGuess.value) < randomNumber) {
    document.querySelector('.challenger-two-reply').innerText = "that's too low";
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
        <p><span class ="score-card-guesses">42</span> GUESSES</p>
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
  console.log('firing');
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
};

function removeElement() {
  var elements = document.querySelectorAll('.winner-card-border');
  elements.forEach(function(element) {
    element.parentNode.removeChild(element);
  })
};

function resetInput() {
  document.querySelectorAll('.input').forEach(function(input) {
    input.value = '';
  });
  document.querySelector('.challenger-two-reply').innerText = "";
  document.querySelector('.challenger-one-reply').innerText = "";
  removeElement();
  createRandomNum();
  clearLatestScore();
  clearLatestGuess();
};
// need to test all alert functionality
function rangeError() {
  if (minRangeSelection.value === '' || maxRangeSelection.value === '') {
    emptyBoxError();
  } else if (parseInt(minRangeSelection.value) > parseInt(maxRangeSelection.value)) {
    alertText.innerHTML = `<img src="error-icon.svg"
      alt="error message icon" class="alert-img"> Sorry, the max must be higher than the min, try again!`;
  } else {
    updateRange();
    clearAlerts();
  }
};

function clearAlerts() {
  alertText.innerHTML = '';
  maxRangeSelection.style.border = '';
  minRangeSelection.style.border = '';
}

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

function emptyGuessError() {
  if (challengerOneGuess.value === '') {
    document.querySelector('.guess-alert-text-one').innerHTML = `<img src="error-icon.svg"
      alt="error message icon" class="alert-img"> Enter a guess!`;
    challengerOneGuess.style.border = '1px solid #DD1970';
  } else {
    document.querySelector('.guess-alert-text-one').innerHTML = '';
    challengerOneGuess.style.border = '';
  };
  if (challengerTwoGuess.value === '') {
    document.querySelector('.guess-alert-text-two').innerHTML = `<img src="error-icon.svg"
      alt="error message icon" class="alert-img"> Enter a guess!`;
    challengerTwoGuess.style.border = '1px solid #DD1970';
  } else {
    document.querySelector('.guess-alert-text-two').innerHTML = '';
    challengerTwoGuess.style.border = '';

  }
};
