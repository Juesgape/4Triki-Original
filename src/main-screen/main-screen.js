import { setCurrentBoard } from "../index.js"
import { populateBoard } from "../index.js"
import { currentBoard } from "../index.js"

const btn4x4 = document.getElementById('btn-4x4')
const btn5x5 = document.getElementById('btn-5x5')
const btn6x6 = document.getElementById('btn-6x6')
export const mainScreen = document.querySelector('.main-screen')
export const mainGame = document.querySelector('#main-game')
export const loader = document.querySelector('.loader')

window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('hide')
    },4000)
})

function animation() {
    setTimeout(() => {
        loader.classList.add('hide')
        mainGame.classList.remove('hide')
    }, 1000)

    loader.classList.remove('hide')
    mainScreen.classList.add('hide')
}
//Adding event Listener to whenever the button is clicked, do something else
btn4x4.addEventListener('click', () => {
    setCurrentBoard(4)
    //adding Animation
    animation()
    populateBoard(currentBoard)
})

btn5x5.addEventListener('click', () => {
    setCurrentBoard(5)
    //adding Animation
    animation()

    populateBoard(currentBoard)
})

btn6x6.addEventListener('click', () => {
    setCurrentBoard(6)
    //adding Animation
    animation()

    populateBoard(currentBoard)
})