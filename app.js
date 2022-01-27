let block = document.querySelectorAll('.block');
let text = document.querySelector('#heading')
let strategy = document.querySelector('#strategy')
let restartBtn = document.querySelector('#restart')

const spaces = [];
const tick_x = 'x';
const tick_circle = 'o';
let currentPlayer = tick_x


console.log(block);
for (let i = 0; i < block.length; i++) {
    block[i].addEventListener('click', cellClicked)
}

function cellClicked() {
    event.target.textContent = tick_x
}


const board = () => {
    boxes.forEach(box, i => {
        let styleString ='';
        if (i < 3){
            styleString += 'border-bottom: 3px solid var(--text);';
        }
        if (i % 3 === 0){
            styleString += 'border-right: 3px solid var(--text):';
        }
        if (i % 3 === 2){
            styleString += 'border-left: 3px solid var(--text);';
        }
        if (i > 5) {
            styleString += 'border-top: 3px solid var(--text);';
        }
        box.style = styleString
        box.addEventListener('click', boxClicked)
    });
}
const boxClicked = (e) => {
  const id = e.target.id;
  console.log(e);
  if (!spaces[id]) {
    console.log(spaces[id]);
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playerWon()) {
      text.innerText = `${currentPlayer} has won!`;
      restart();
      return;
    }

    if (playerDraw()) {
      return;
    }
    currentPlayer = currentPlayer === tick_x ? tick_circle : tick_x;
  }
};
function playerWon() {
    if (spaces[0] === currentPlayer) {
        if (spaces[1] === currentPlayer && spaces[2] === currentPlayer) {
            strategy.innerText = `${currentPlayer} wins up to top`;
            return true;
        }
        if (spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
            strategy.innerText = `${currentPlayer} wins on the left`;
            return true;
        }
        if (spaces[4] === currentPlayer && spaces[8] === currentPlayer) {
            strategy.innerText = `${currentPlayer} wins diagonally`;
            return true;
        }
    }
    if (spaces[8] === currentPlayer) {
        if (spaces[2] === currentPlayer && spaces[5] === currentPlayer) {
            strategy.innerText = `${currentPlayer} wins on the right`;
            return true;
        }
        if (spaces[6] === currentPlayer && spaces[7] === currentPlayer) {
            strategy.innerText = `${currentPlayer} wins on the bottom`;
            return true;
        }
    }
    if (spaces[4] === currentPlayer) {
        if (spaces[1] === currentPlayer && spaces[7] === currentPlayer) {
            strategy.innerText = `${currentPlayer} wins vertically on middle`;
            return true;
        }
        if (spaces[3] === currentPlayer && spaces[5] === currentPlayer) {
            strategy.innerText = `${currentPlayer} wins horizontally on the middle`;
            return true;
        }
        if (spaces[2] === currentPlayer && spaces[6] === currentPlayer) {
            strategy.innerText = `${currentPlayer} wins diagonally`;
            return true;
        }
    }
}

const playerDraw = () => {
  let draw = 0;
  spaces.forEach((space, i) => {
    if (spaces[i] !== null) draw++;
  });
  if (draw === 9) {
    text.innerText = `Draw`;
    restart();
  }
};

const restart = () => {
  setTimeout(() => {
    spaces.forEach((space, i) => {
      spaces[i] = null;
    });
    boxes.forEach((box) => {
      box.innerText = '';
    });
    text.innerText = `Play`;
    strategy.innerText = ``;
  }, 1000);
};
