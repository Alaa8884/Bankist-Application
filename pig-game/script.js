/** @format */
'use strict';

const newGameBtn = document.querySelector('.new-game');
const rollBtn = document.querySelector('.roll');
const holdBtn = document.querySelector('.hold');
const diceImg = document.querySelector('.dice');

const player = document.querySelectorAll('.player');
const playerTwo = document.getElementsByClassName('player p-0');
console.log(player);
// const playerTwo = document.querySelector('.p-1');

const playersScore1 = document.querySelector('.score-1');
const playersScore2 = document.querySelector('.score-2');

const currentOne = document.querySelector('#current-1');
const currentTwo = document.querySelector('#current-2');
let score = 0;
let scores = [0, 0];
let activePlayer = 0;
const switchPlayer = function () {
  console.log(playerTwo);
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  score = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player[activePlayer].classList.toggle('active');
  playerTwo.classList.toggle('active');
  // playerTwo.classList.toggle('active');
};
console.log(document.getElementById(`current-${activePlayer}`));

rollBtn.addEventListener('click', function () {
  const dice = Math.round(Math.random() * 6 + 1);
  diceImg.classList.remove('hidden');
  diceImg.src = `images/dice-${dice}.png`;

  if (dice !== 1) {
    score += dice;
    document.getElementById(`current-${activePlayer}`).textContent = score;
  } else {
    switchPlayer();
  }
});

holdBtn.addEventListener('click', function () {
  scores[activePlayer] += score;
  document.getElementById(`score-${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 100) {
    document.querySelector(`p-${activePlayer}`).classList.add('player-win');
    document.querySelector(`p-${activePlayer}`).classList.remove('active');
  } else {
    switchPlayer();
  }
  switchPlayer();
});

newGameBtn.addEventListener('click', function () {
  diceImg.classList.add('hidden');
  scores[activePlayer] = 0;
  score = 0;
});
