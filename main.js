const selections = document.querySelectorAll('.selection');
const score = document.querySelector('[data-score]');
const result = document.querySelector('[data-result]');
const restart = document.querySelector('[data-restart]');
const scoreboard = { player: 0, computer: 0 };
const history = document.querySelector('.container2');
const choices = {
  rock: { name: 'rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'spock', defeats: ['scissors', 'rock'] },
};

// Play game
function play(e) {
  const playerSelection = e.target.getAttribute('data-selection');
  const computerSelection = getComputerSelection();
  const winner = getWinner(playerSelection, computerSelection);
  addSelectionHistory(playerSelection, computerSelection);
  showWinner(winner);
}

//Get Computer Selection
function getComputerSelection() {
  const rand = Math.random();
  if (rand <= 0.2) {
    return 'rock';
  } else if (rand <= 0.4) {
    return 'paper';
  } else if (rand <= 0.6) {
    return 'scissors';
  } else if (rand <= 0.8) {
    return 'lizard';
  } else {
    return 'spock';
  }
}

//Get Winner
function getWinner(p, c) {
  if (p == c) {
    return 'draw';
  } else {
    p = choices[p];
    const victory = p.defeats.indexOf(c) > -1;
    if (victory) {
      return 'player';
    } else {
      return 'computer';
    }
  }
}

//Show Winner
function showWinner(winner) {
  if (winner === 'player') {
    scoreboard.player++;
    result.innerHTML = `<span class="round-winner">Round winner:</span><i class="win fas fa-user-circle"></i>`;
  } else if (winner === 'computer') {
    scoreboard.computer++;
    result.innerHTML = `<span class="round-winner">Round winner:</span><i class="lose fas fa-robot"></i>`;
  } else {
    result.innerHTML = `<p class="draw">DRAW</p> `;
  }

  // Show score
  score.innerHTML = `
<p>Player: ${scoreboard.player}</p>
<p>Computer: ${scoreboard.computer}</p>`;
}
let r = 0;
function addSelectionHistory(p, c) {
  r++;
  const div = document.createElement('div');
  let myclass;
  if (p === 'rock') {
    myclass = 'fas fa-hand-rock';
  } else if (p === 'paper') {
    myclass = 'fas fa-hand-paper';
  } else if (p === 'scissors') {
    myclass = 'fas fa-hand-scissors';
  } else if (p === 'lizard') {
    myclass = 'fas fa-hand-lizard';
  } else {
    myclass = 'fas fa-hand-spock';
  }
  let computerclass;
  if (c === 'rock') {
    computerclass = 'fas fa-hand-rock';
  } else if (c === 'paper') {
    computerclass = 'fas fa-hand-paper';
  } else if (c === 'scissors') {
    computerclass = 'fas fa-hand-scissors';
  } else if (c === 'lizard') {
    computerclass = 'fas fa-hand-lizard';
  } else {
    computerclass = 'fas fa-hand-spock';
  }
  if (getWinner(p, c) === 'draw') {
    div.innerHTML = `Round\n${r}: <i class='draw-color history-icon ${myclass}'></i><span class="history-vs">vs</span><i class='draw-color history-icon ${computerclass}'></i>`;
  } else {
    div.innerHTML = `Round\n${r}: <i class='player-color history-icon ${myclass}'></i><span class="history-vs">vs</span><i class='computer-color history-icon ${computerclass}'></i>`;
  }
  div.classList.add('result-selection');
  history.appendChild(div);
  history.scrollTop = history.scrollHeight;
}

// Restart game
function restartGame() {
  r = 0;
  history.innerHTML = '';
  result.innerHTML = '';
  scoreboard.player = 0;
  scoreboard.computer = 0;
  score.innerHTML = `
    <p>Player: 0</p>
    <p>Computer: 0</p>
  `;
}

//Event Listeres
selections.forEach((selection) => selection.addEventListener('click', play));
restart.addEventListener('click', restartGame);
