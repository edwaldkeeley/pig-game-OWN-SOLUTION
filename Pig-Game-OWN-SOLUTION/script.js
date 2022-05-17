'use strict';
// Everything Needed
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let Playing = true;

//Startings
score0.textContent = 0;
score1.textContent = 0;
currentScore = 0;

//New
const Reset = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  Playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  dice.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

function PlayerSwitched() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

//Random Number Generator
function randomNumber() {
  return Math.trunc(Math.random() * 6) + 1;
}

btnRoll.addEventListener('click', function () {
  if (Playing) {
    // Functions
    dice.classList.remove('hidden');
    const number = randomNumber();
    dice.src = `dice-${number}.png`;

    // if dice is 1
    if (number !== 1) {
      currentScore += number;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch Player
      PlayerSwitched();

      // activePlayer = activePlayer === 0 ? 1 : 0;
    }
  }
});

btnHold.addEventListener('click', function () {
  if (Playing) {
    //  Add current score to active player's score
    score[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    //  Check if player's score is >= 100
    if (score[activePlayer] >= 50) {
      dice.classList.add('hidden');
      Playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch
      PlayerSwitched();
    }
  }
});

btnNew.addEventListener('click', Reset);
