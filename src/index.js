//setting the board size
let currentBoard
let container = document.querySelector('.container')

//This function sets a new value for the current board
function setCurrentBoard(newValue) {
    currentBoard = newValue
    console.log(currentBoard);
}

//function to populate the board with the user's input
function populateBoard(size) {
    for(let i = 0; i < size * size; i++) {
        const tile = document.createElement('div')
        tile.classList.add('tile')

        //modifying styles fot the tiles
        let tileSize = ''
        for(let i = 0; i < size; i++) {
            tileSize += '33% '
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
    console.log(tiles);
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

    let winningConditions
    //total posibilities
    let totalPosibilities

    //determine the conditions to win taking into consideration the boardSize
    if (boardSize === 16){
        winningConditions = [
            //horizontally
            [0, 1, 2, 3],
            [4, 5, 6, 7],
            [8, 9, 10, 11],
            //vertically
            [0, 4, 8, 12],
            [1, 5, 9, 13],
            [2, 6, 10, 14],
            [3, 7, 11, 15],
            //diagonal
            [0, 5, 10, 15],
            [3, 6, 9, 12]
        ];
        totalPosibilities = winningConditions.length

    } else if (boardSize === 25) {
        winningConditions = [
            //horizontally
            [0, 1, 2, 3],
            [1, 2, 3, 4],

            [5, 6, 7, 8],
            [6, 7, 8, 9],

            [10, 11, 12, 13],
            [11, 12, 13, 14],

            [15, 16, 17, 18],
            [16, 17, 18, 19],

            [20, 21, 22, 23],
            [21, 22, 23, 24],

            //vertically
            [0, 5, 10, 15],
            [5, 10, 15, 20],

            [1, 6, 11, 16],
            [6, 11, 16, 21],

            [2, 7, 12, 17,],
            [7, 12, 17, 22],

            [3, 8, 13, 18],
            [8, 13, 18, 23],

            [4, 9, 14, 19],
            [9, 14, 19, 24],

            //diagonal left to right
            [0, 6, 12, 18],
            [6, 12, 18, 24],
            [5, 11, 17, 23],
            [1, 7, 13, 19],

            //diagonal right to left
            [4, 8, 12, 16],
            [8, 12, 16, 20],
            [9, 13, 17, 21],
            [3, 7, 11, 15]
        ];
        totalPosibilities = winningConditions.length

    } else if (boardSize === 36){
        winningConditions = [
            //horizontally
            [0, 1, 2, 3],
            [1, 2, 3, 4],
            [2, 3, 4, 5],

            [6, 7, 8, 9],
            [7, 8, 9, 10],
            [8, 9, 10, 11],

            [12, 13, 14, 15],
            [13, 14, 15, 16],
            [14, 15, 16, 17],

            [18, 19, 20, 21],
            [19, 20, 21, 22],
            [20, 21, 22, 23],

            [24, 25, 26, 27],
            [25, 26, 27, 28],
            [26, 27, 28, 29],

            [30, 31, 32, 33],
            [31, 32, 33, 34],
            [32, 33, 34, 35],

            //vertically
            [0, 6, 12, 18],
            [6, 12, 18, 24],
            [12, 18, 24, 30],

            [1, 7, 13, 19],
            [7, 13, 19, 25],
            [13, 19, 25, 31],

            [2, 8, 14, 20],
            [8, 14, 20,26],
            [14, 20, 26, 32],

            [3, 9, 15, 21],
            [9, 15, 21, 27],
            [5, 21, 27, 33],

            [4, 10, 16, 22],
            [10, 16, 22, 28],
            [16, 22, 28, 34],

            [5, 11, 17, 23],
            [11, 17, 23, 29],
            [17, 23, 29, 35],

            //diagonal left to right
            [2, 9, 16, 23],

            [1, 8, 15, 22],
            [8, 15, 22, 29],

            [0, 7, 14, 21],
            [7, 14, 21, 28],
            [14, 21, 28, 35],

            [6, 13, 20, 27],
            [13, 20, 27, 34],

            [12, 19, 26, 33],

            //diagonal right to left
            [3, 8, 13, 18],

            [4, 9, 14, 19],
            [9, 14, 19, 24],

            [5, 10, 15, 20],
            [10, 15, 20, 25],
            [15, 20, 25, 30],

            [11, 16, 21, 26],
            [16, 21, 26, 31],

            [17, 22, 27, 32],
        ];
        totalPosibilities = winningConditions.length
    }

    function handleResultValidation(size) {
        let roundWon = false;
        for (let i = 0; i < totalPosibilities; i++) {
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




export {currentBoard, setCurrentBoard, populateBoard}