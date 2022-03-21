const instructions = require('./Day4Input').input.match(/\d+/g).map(number => parseInt(number));
const boxes = require('./Day4Input').boxes;

let bingo = boxes.match(/((((\d+)\s+){4})\d+\n){4}((((\d+)\s+){4})\d+)/g).map(box => {
    return box.match(/(((\d+)\s+){4})\d+/g).map(row => {
        return row.match(/\d+/g).map(number => parseInt(number));
    });
});

// let instructions = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1`.match(/\d+/g).map(number => parseInt(number));
// // console.log(instructions)

// let bingo = `22 13 17 11  0
// 8  2 23  4 24
// 21  9 14 16  7
// 6 10  3 18  5
// 1 12 20 15 19

// 3 15  0  2 22
// 9 18 13 17  5
// 19  8  7 25 23
// 20 11 10 24  4
// 14 21 16 12  6

// 14 21 17 24  4
// 10 16 15  9 19
// 18  8 23 26 20
// 22 11 13  6  5
// 2  0 12  3  7`
// .match(/((((\d+)\s+){4})\d+\n){4}((((\d+)\s+){4})\d+)/g).map(box => {
//     return box.match(/(((\d+)\s+){4})\d+/g).map(row => {
//         return row.match(/\d+/g).map(number => parseInt(number));
//     });
// })

let boolBox = new Array(bingo.length).fill().map(() => new Array(bingo[0].length).fill().map(() => new Array(bingo[0][0].length).fill().map(() => false)));
let winBool = new Array(bingo.length).fill(false);

const bingoChecker = (instructions, booleanBox, winningBool) => {
    let count = 0;
    for (instruction of instructions) {
        for (let k = 0; k < bingo.length; k++) {
            if (!winningBool[k]) {
                for (let i = 0; i < 5; i++) {
                    for (let j = 0; j < 5; j++) {
                        if (bingo[k][i][j] === instruction) {
                            booleanBox[k][i][j] = true;
                            if (booleanBox[k][0][j] === true && 
                                booleanBox[k][1][j] === true &&
                                booleanBox[k][2][j] === true &&
                                booleanBox[k][3][j] === true &&
                                booleanBox[k][4][j] === true) {
                                let sum = 0;
                                for (let p = 0; p < 5; p++) {
                                    for (let q = 0; q < 5; q++) {
                                        if (!booleanBox[k][p][q]) {
                                            sum += bingo[k][p][q];
                                        }
                                    }
                                }
                                winningBool[k] = true;
                                let last = true;
                                for (let s = 0; s < winningBool.length; s++) {
                                    if (!winningBool[s]) {
                                        last = false;
                                    }
                                }
                                count++;
                                console.log(count, '1');
                                console.log(winningBool, last);
    
                                if (last) {
                                    return console.log(sum * instruction, `sum = ${sum}, instruction = ${instruction}`)
                                }
                            } else if (booleanBox[k][i][0] === true &&
                                       booleanBox[k][i][1] === true &&
                                       booleanBox[k][i][2] === true &&
                                       booleanBox[k][i][3] === true &&
                                       booleanBox[k][i][4] === true) {
                                let sum = 0;
                                for (let p = 0; p < 5; p++) {
                                    for (let q = 0; q < 5; q++) {
                                        if (!booleanBox[k][p][q]) {
                                            sum += bingo[k][p][q];
                                        }
                                    }
                                }
                                winningBool[k] = true;
                                let last = true;
                                for (let s = 0; s < winningBool.length; s++) {
                                    if (!winningBool[s]) {
                                        last = false;
                                    }
                                }
                                count++;
                                console.log(count, '2');
                                console.log(winningBool, last);
                                if (last) {
                                    return console.log(sum * instruction, `sum = ${sum}, instruction = ${instruction}`)
                                }
                            }
                        }
                    }
                }
            }
        }
        // console.log(winningBool);
    }
}

bingoChecker(instructions, boolBox, winBool);