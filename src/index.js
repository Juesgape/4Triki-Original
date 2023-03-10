import { setWinningPosibilities } from "./winning-posibilities/winning-posibilities.js"

import { mainScreen } from "./main-screen/main-screen.js"
import { mainGame } from "./main-screen/main-screen.js"
import { loader } from "./main-screen/main-screen.js"

//setting the board size
let currentBoard = 0
let container = document.querySelector('.container')

//total posibilities
let winningConditions = []
let totalPosibilities = 0

//This function sets a new value for the current board
function setCurrentBoard(newValue) {
    currentBoard = newValue
}

function setWinningConditions(conditions) {
    winningConditions = conditions
}

function setTotalPosibilities(value) {
    totalPosibilities = value
}

//function to populate the board with the user's input
function populateBoard(size, ) {
    //Empty the container with all his nodeChilds
    container.innerHTML = ''

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
    const announcerContainer = document.querySelector('.announcer-container')
    const goBackToMenu = document.querySelector('#btn-goBackToMenu')
    const player1Score = document.querySelector('#player1')
    const player2Score = document.querySelector('#player2')

    //Correcting bugs
    let counter = 0

    //for loop to generate the board with the size that the user chose
    let board = [];

    for(let i = 0; i < boardSize; i++) {
        board.push('')
    }

    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';


    //determine the conditions to win taking into consideration the boardSize
    setWinningPosibilities()
    
    function handleResultValidation() {
        let roundWon = false;
        let control = false;
        console.log('New set-----------------');
        for (let i = 0; i < totalPosibilities; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            const d = board[winCondition[3]];

            /* console.log({a, b, c, d, i}); */

            //checking for winner
            if (a === b && b === c && c === d) {
                if(a !== '' && b !== '' && c !== '' && d !== '') {
                    console.log(`La combinaci??n ganadora fue ${winCondition}`);
                    roundWon = true;
                    break;
                } else {
                    continue
                }
            }

            //Checking for tie
            function checkForTie() {
                counter = 0
                for(let j = 0; j < winningConditions.length; j ++) {
                    const winCondition = winningConditions[j];
                    const a = board[winCondition[0]];
                    const b = board[winCondition[1]];
                    const c = board[winCondition[2]];
                    const d = board[winCondition[3]];

                    let arrCompare = new Set([a, b, c, d])

                    if(arrCompare.has('X') && arrCompare.has('O')) {
                        counter += 1
                        console.log(counter);
                        console.log(winningConditions.length);
                    }
                }
                if(counter === winningConditions.length) {
                    console.log('EMPATE');
                    announce(TIE);
                    isGameActive = false;
                }
            }

            checkForTie()

        }

    if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

}
    const resetBoard = () => {
        //Making the board go blank
        board = []
        for(let i = 0; i < boardSize; i++) {
            board.push('')
        }

        isGameActive = true;
        setWinningPosibilities()
        announcerContainer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });

        //animation 
        announcer.classList.remove('announcer-styles');
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    let playerX_points=0;
    let playerO_points=0;
    let last_winner="";
    console.log("Player O points:"+playerO_points);
    console.log("Player X points:"+playerX_points);
    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                //conditional that Phol implemented but within a switch, like, who does that?
                if (last_winner!="O") {
                playerO_points+=1;
                //displaying score
                player2Score.innerText = playerO_points
                last_winner="O"
            } else{
                    playerO_points*=3
                    //displaying score
                    player2Score.innerText = playerO_points
                    last_winner=""
                }
                console.log("Player O points:"+playerO_points);
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                //conditional that Phol implemented but within a switch, like, who does that?
                if (last_winner!="X") {
                    playerX_points+=1;
                    //displaying score
                    player1Score.innerText = playerX_points
                    last_winner="X"
                } else {
                        playerX_points*=3
                        //displaying score
                        player1Score.innerText = playerX_points
                        last_winner=""
                    }
                console.log("Player X points:"+playerX_points);
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcerContainer.classList.remove('hide');
        announcer.classList.add('announcer-styles');
        setTimeout(() => {
            announcerContainer.classList.add('hide');
            announcer.classList.remove('announcer-styles')
            resetBoard()
        }, 1000)
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
            handleResultValidation();
            changePlayer();
        }
    }

    resetButton.addEventListener('click', resetBoard);

    goBackToMenu.addEventListener('click', () => {

        //adding animation
        setTimeout(() => {
            mainScreen.classList.remove('hide')
            loader.classList.add('hide')
        }, 1000)

        loader.classList.remove('hide')
        mainGame.classList.add('hide')

        resetBoard()

        player2Score.innerText = '0'
        player1Score.innerText = '0'
    })
}




export {
    currentBoard, 
    setCurrentBoard, 
    populateBoard, 
    winningConditions, 
    setWinningConditions,
    setTotalPosibilities
}