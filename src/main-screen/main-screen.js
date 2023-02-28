import { setCurrentBoard } from "../index.js"
import { populateBoard } from "../index.js"
import { currentBoard } from "../index.js"

const btn4x4 = document.getElementById('btn-4x4')
const btn5x5 = document.getElementById('btn-5x5')
const btn6x6 = document.getElementById('btn-6x6')
const mainScreen = document.querySelector('.main-screen')
const mainGame = document.querySelector('#main-game')

//Adding event Listener to whenever the button is clicked, do something else
btn4x4.addEventListener('click', () => {
    setCurrentBoard(4)
    mainScreen.classList.add('hide')
    mainGame.classList.remove('hide')
    populateBoard(currentBoard)
})

btn5x5.addEventListener('click', () => {
    setCurrentBoard(5)
    mainScreen.classList.add('hide')
    mainGame.classList.remove('hide')
    populateBoard(currentBoard)
})

btn6x6.addEventListener('click', () => {
    setCurrentBoard(6)
    mainScreen.classList.add('hide')
    mainGame.classList.remove('hide')
    populateBoard(currentBoard)
})