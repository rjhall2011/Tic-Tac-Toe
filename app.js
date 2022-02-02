let block = document.querySelectorAll('.block');
let text = document.querySelector('#heading')
let strategy = document.querySelector('#winner')
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
  event.target.textContent = currentPlayer
  playerWon()
  if ( currentPlayer == tick_x){
    currentPlayer = tick_circle
  } else{
    currentPlayer = tick_x
  }
}


const board = () => {
    block.forEach(block, i => {
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
        block.style = styleString
        block.addEventListener('click', blockClicked)
    });
}
const blockClicked = (e) => {
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
const playerWon = () => {
  console.log(block[0])
  console.log(currentPlayer)
    if (block[0].innerHTML === currentPlayer) {
      console.log("test")
        if (block[1].innerHTML === currentPlayer && block[2].innerHTML === currentPlayer) {
            strategy.innerText = `${currentPlayer} wins up to top`;
            return true;
        }
        if (block[3].innerHTML === currentPlayer && block[6].innerHTML === currentPlayer) {
            strategy.innerText = `${currentPlayer} wins on the left`;
            return true;
        }
        if (block[4].innerHTML === currentPlayer && block[8].innerHTML === currentPlayer) {
            strategy.innerText = `${currentPlayer} wins diagonally`;
            return true;
        }
    }
    if (block[8].innerHTML === currentPlayer) {
        if (block[2].innerHTML === currentPlayer && block[5].innerHTML === currentPlayer) {
            strategy.innerText = `${currentPlayer} wins on the right`;
            return true;
        }
        if (block[6].innerHTML === currentPlayer && block[7].innerHTML === currentPlayer) {
            strategy.innerText = `${currentPlayer} wins on the bottom`;
            return true;
        }
    }
    if (block[4].innerHTML === currentPlayer) {
        if (block[1].innerHTML === currentPlayer && block[7].innerHTML === currentPlayer) {
            strategy.innerText = `${currentPlayer} wins vertically on middle`;
            return true;
        }
        if (block[3].innerHTML === currentPlayer && block[5].innerHTML === currentPlayer) {
            strategy.innerText = `${currentPlayer} wins horizontally on the middle`;
            return true;
        }
        if (block[2].innerHTML === currentPlayer && block[6].innerHTML === currentPlayer) {
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

function restart() {
  setTimeout(() => {
    spaces.forEach((space, i) => {
      spaces[i] = null;
    });
    block.forEach((block) => {
      block.innerText = '';
    });

    const playerDraw = () => {
      let draw = 0;
      spaces.forEach((space, i) => {
        if (spaces[i] !== null)
          draw++;
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
        block.forEach((block) => {
          block.innerText = '';
        });
        text.innerText = `Play`;
        strategy.innerText = ``;
      }, 1000);
      currentPlayer = tick_x
    };

    restartBtn.addEventListener('click', restart);
    restart();
    drawBoard();
  });
}