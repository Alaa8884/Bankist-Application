/** @format */
'use strict'

let secretNum = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let heighScore = 0;

const message = function (msg) {
  document.querySelector('.message').textContent = msg;
};

document.querySelector('.check').addEventListener('click', function () {
  let guess = Number(document.getElementById('guess').value);

  if (!guess) {
    message('No Number');
  } else if (guess === secretNum) {
    message('Correct Number');
    document.querySelector('.number').textContent = secretNum;

    document.body.style.backgroundImage =
      'linear-gradient(135deg, green, #15aa1d)';
    if (score > heighScore) {
      heighScore = score;
      document.querySelector('.high-score').textContent = heighScore;
    }
  } else if (guess !== secretNum) {
    if (score > 1) {
      message(guess > secretNum ? 'Too high' : 'Too Low');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      message('You Loose The Game');
      document.querySelector('.score').textContent = 0;
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNum = Math.trunc(Math.random() * 20) + 1;
  message('Start guessing ....');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.getElementById('guess').value = '';
  document.body.style.backgroundImage =
    'linear-gradient(135deg, #1D2B53, #7E2553)';
});
// document.querySelector('.again').addEventListener('click', function () {
//   score = 20;
//   secretNumber = Math.trunc(Math.random() * 20) + 1;

//   // document.querySelector('.message').textContent = 'Start guessing...';
//   displayMessage('Start guessing...');
//   document.querySelector('.score').textContent = score;
//   document.querySelector('.number').textContent = '?';
//   document.querySelector('#guess').value = '';

//   document.querySelector('body').style.backgroundColor = '#222';
// });
