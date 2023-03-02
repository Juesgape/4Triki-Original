import { setWinningPosibilities } from "./winning-posibilities/winning-posibilities.js"

//setting the board size
let currentBoard
let container = document.querySelector('.container')

//total posibilities
let winningConditions
let totalPosibilities

//This function sets a new value for the current board
function setCurrentBoard(newValue) {
    currentBoard = newValue
}

function setWinningConditions(conditions) {
    winningConditions = conditions
    console.log(winningConditions);
}

function setTotalPosibilities(value) {
    totalPosibilities = value
}

//function to populate the board with the user's input
function populateBoard(size) {
    for(let i = 0; i < size * size; i++) {
        const tile = document.createElement('div')
        tile.classList.add('tile')

        //modifying styles fot the tiles
        let tileSize = ''
        for(let i = 0; i < size; i++) {
            tileSize += '30% '
        }

        //setting styles for the tile
        container.style.gridTemplateColumns = tileSize
        container.style.gridTemplateRows = tileSize;
        container.appendChild(tile)
    }
    //sendding the size of the board into the run game function
    runGame(size * size)
}

function runGame(boardSize) {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    //for loop to generate the board with the size that the user chose
    let board = [];

    for(let i = 0; i <= boardSize; i++) {
        board.push('')
    }

    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    //determine the conditions to win taking into consideration the boardSize
    setWinningPosibilities()
    
    function handleResultValidation(size) {
        let roundWon = false;
        for (let i = 0; i < totalPosibilities; i++) {
            console.log(winningConditions);
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            const d = board[winCondition[3]];
            if (a === '' || b === '' || c === '' || d === '') {
                continue;
            }
            if (a === b && b === c && c === d) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

    if (!board.includes(''))
        announce(TIE);
    }

    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    };

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            //sending board Size as a parameter
            handleResultValidation(boardSize);
            changePlayer();
        }
    }
    
    const resetBoard = () => {
        //Making the board go blank
        board = []
        for(let i = 0; i <= boardSize; i++) {
            board.push('')
        }

        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
}




export {
    currentBoard, 
    setCurrentBoard, 
    populateBoard, 
    winningConditions, 
    totalPosibilities, 
    setWinningConditions,
    setTotalPosibilities
}