var minRangeSelection = document.querySelector('.min-range-input');
var maxRangeSelection = document.querySelector('.max-range-input');
var minNum = document.querySelector('.min-number');
var maxNum = document.querySelector('.max-number');
var rangeButton = document.querySelector('.range-button');
var randomNumber = null;

rangeButton.addEventListener('click', updateMinRange);
rangeButton.addEventListener('click', createRandomNum);

function updateMinRange() {
  minNum.innerText = minRangeSelection.value;
  maxNum.innerText = maxRangeSelection.value;
};

function createRandomNum() {
  randomNumber = Math.floor(Math.random() * (parseInt(maxRangeSelection.value) - parseInt(minRangeSelection.value) + 1) + parseInt(minRangeSelection.value));
  console.log(randomNumber);
}
