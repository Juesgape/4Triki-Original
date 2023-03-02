import { currentBoard } from "../index.js"
import { totalPosibilities } from "../index.js";
import { setWinningConditions } from "../index.js";
import { setTotalPosibilities } from "../index.js";

function setWinningPosibilities() {
    let currentBoardValue = currentBoard
    //determine the conditions to win taking into consideration the boardSize
    if (currentBoardValue === 4){
        let options = [
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
        //sets the winning condition back to 
        setWinningConditions(options)
        setTotalPosibilities(options.length)

    } else if (currentBoardValue === 5) {
        let options = [
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
        //sets the winning condition back to 
        setWinningConditions(options)
        setTotalPosibilities(options.length)

    } else if (currentBoardValue === 6){
        let options = [
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
        //sets the winning condition back to 
        setWinningConditions(options)
        setTotalPosibilities(options.length)
    }
}

export {setWinningPosibilities}