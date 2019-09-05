// Import stylesheets
import './style.css';

// Write Javascript code!
const colors = ['green', 'red', 'blue', 'yellow'];

const green = document.getElementById('green');
const red = document.getElementById('red');
const blue = document.getElementById('blue');
const yellow = document.getElementById('yellow');
const score = document.getElementById('score');

green.addEventListener('click', () => handleClick('green'));
red.addEventListener('click', () => handleClick('red'));
blue.addEventListener('click', () => handleClick('blue'));
yellow.addEventListener('click', () => handleClick('yellow'));

let game = [];
let playerGame = [];
let level = 1;

function updateGame(number) {
  game = [...game, number];
  playSequence()
}

async function playSequence() {
  for(const color of game) {
    activeButton(color);
    await sleep(500);
  }
}

function activeButton(color) {
  switch(color) {
    case 'green':
      green.classList.add('active');
      setTimeout(() => green.classList.remove('active'), 200);
      break; 

    case 'red':
      red.classList.add('active');
      setTimeout(() => red.classList.remove('active'), 200);
      break; 

    case 'blue':
      blue.classList.add('active');
      setTimeout(() => blue.classList.remove('active'), 200);
      break; 

    case 'yellow':
      yellow.classList.add('active');
      setTimeout(() => yellow.classList.remove('active'), 200);
      break;
  }
}

async function startGame() {
  await sleep(1000);
  score.innerHTML = level;
  const first = colors[[Math.floor(Math.random()*colors.length)]];
  updateGame(first);
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function handleClick(color) {
  playerGame = [...playerGame, color];
  activeButton(color);
  if(playerGame.length === game.length) {
    checkSequence();
  }
}

function checkSequence() {
  if(JSON.stringify(game) === JSON.stringify(playerGame)) {
    nextLevel();
  } else {
    reset();
  }
}

async function nextLevel() {
  await sleep(1000);
  playerGame = [];
  level = level + 1;
  score.innerHTML = level;
  const nextColor = colors[[Math.floor(Math.random()*colors.length)]];
  updateGame(nextColor);
}

function reset() {
  window.alert(`You loose, your score is : ${level}`);
  level = 1;
  game = [];
  playerGame = [];
  startGame();
}

startGame();