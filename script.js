const boardEl = document.getElementById('board');
const chooseS = document.getElementById('choose-s');
const chooseO = document.getElementById('choose-o');
const playerEl = document.getElementById('player');
const score1El = document.getElementById('score1');
const score2El = document.getElementById('score2');
const restartBtn = document.getElementById('restart');

let board = Array(9).fill('');
let currentPlayer = 1;
let choice = 'S';
let score = {1:0,2:0};
const player1El = document.getElementById('player1');
const player2El = document.getElementById('player2');

const triplets = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function init(){
  boardEl.innerHTML = '';
  board = Array(9).fill('');
  for(let i=0;i<9;i++){
    const cell = document.createElement('button');
    cell.className = 'cell';
    cell.dataset.index = i;
    cell.addEventListener('click', () => onCellClick(i, cell));
    boardEl.appendChild(cell);
  }
  updateUI();
}

function onCellClick(i, el){
  if(board[i]) return;
  board[i] = choice;
  el.textContent = choice;
  el.classList.add('filled');

  const scored = checkScore(i);
  if(scored>0){
    score[currentPlayer]+=scored;
    updateScores();
    // player keeps turn
  } else {
    // switch player
    currentPlayer = currentPlayer===1?2:1;
    playerEl.textContent = currentPlayer;
    updateActivePlayer();
  }

  if(board.every(v=>v)){
    setTimeout(()=>{
      const result = score[1]===score[2] ? 'Seri!' : `Pemenang: Player ${score[1]>score[2]?1:2}`;
      alert(`Permainan selesai. ${result}\nSkor — P1: ${score[1]} | P2: ${score[2]}`);
    },100);
  }
}

function checkScore(idx){
  let points = 0;
  for(const t of triplets){
    if(t.includes(idx)){
      const [a,b,c] = t;
      if(board[a]==='S' && board[b]==='O' && board[c]==='S'){
        points++;
        highlightTriplet(t);
      }
    }
  }
  return points;
}

function highlightTriplet(tr){
  tr.forEach(i=>{
    const el = boardEl.querySelector(`[data-index='${i}']`);
    if(el) el.style.background = '#ffeaa7';
  });
}

function updateScores(){
  score1El.textContent = score[1];
  score2El.textContent = score[2];
}

function updateActivePlayer(){
  if(currentPlayer===1){
    player1El.classList.add('active');
    player2El.classList.remove('active');
  } else {
    player2El.classList.add('active');
    player1El.classList.remove('active');
  }
}

chooseS.addEventListener('click', ()=>{
  choice='S';
  chooseS.classList.add('active');
  chooseO.classList.remove('active');
});
chooseO.addEventListener('click', ()=>{
  choice='O';
  chooseO.classList.add('active');
  chooseS.classList.remove('active');
});

restartBtn.addEventListener('click', ()=>{
  score = {1:0,2:0};
  currentPlayer = 1;
  playerEl.textContent = currentPlayer;
  updateScores();
  init();
  updateActivePlayer();
});

// initialize defaults
chooseS.classList.add('active');
init();
updateActivePlayer();
