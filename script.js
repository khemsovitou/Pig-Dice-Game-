'use strict';
// All elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const score = [0 , 0 ];
let currentScore = 0;
let activePlayer = 0;
let playing = true


const switchPlayer = function(){
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
}
// Start Game
score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add('hidden');
// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];

    // 2. Check if player's score is >= 10
    if (score[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceElement.classList.add('hidden');

      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', function () {
  // Resetting all game variables
  score[0] = 0;
  score[1] = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Resetting all display elements
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  diceElement.classList.add('hidden');
  
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
});
