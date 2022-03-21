const fs = require('fs');
const {join} = require('path');

const file = fs.readFileSync(join(__dirname, './input.txt'), 'utf8');
const inputs = file.split('\n').map(line => line.replace(' -> ', ',').split(',').map(number => parseInt(number)));

// let input = `0,9 -> 5,9
// 8,0 -> 0,8
// 9,4 -> 3,4
// 2,2 -> 2,1
// 7,0 -> 7,4
// 6,4 -> 2,0
// 0,9 -> 2,9
// 3,4 -> 1,4
// 0,0 -> 8,8
// 5,5 -> 8,2`

// lines = input.match(/\d+\054\d+\s\055\076\s\d+\054\d+/g).map(command => command.match(/\d+/g));
const board = [];

const size = 1000;
for (let i = 0; i < size; i++) {
    board[i] = [];
    for (let j = 0; j < size; j++) {
        board[i][j] = 0; 
    }
}

{
    const fillBoard = (lines, board) => {
        let count = 0;
        let newLines = [...lines];
        for (line of newLines) {
            let [x1, y1, x2, y2] = [...line];
            if (x1 !== x2 && y1 !== y2) continue;
            if (x1 > x2) [x1, x2] = [x2, x1];
            if (y1 > y2) [y1, y2] = [y2, y1];
            
            for (let x = x1; x <= x2; x++) {
                for (let y = y1; y <= y2; y++) {
                    board[y][x]++;
                    if (board[y][x] === 2) count++;
                }
            }
        }

        return count;
    }

    console.log(fillBoard(inputs, board));
}

{
    const fillBoard2 = (lines, board) => {
        let count = 0;
        let newLines = [...lines];
        for (line of newLines) {
            let [x1, y1, x2, y2] = [...line];
            if (x1 !== x2 && y1 !== y2) {
                if (Math.abs(x1 - x2) === Math.abs(y1 - y2)) {
                    if (x1 > x2) [x1, y1, x2, y2] = [x2, y2, x1, y1];
                    for (let x = x1; x <= x2; x++) {
                        if (y1 > y2) {
                            board[y1 - (x - x1)][x]++;
                            if (board[y1 - (x - x1)][x] === 2) count++;
                        } else {
                            board[y1 + (x - x1)][x]++;
                            if (board[y1 + (x - x1)][x] === 2) count++;
                        }
                    }
                }
            } else {
                if (x1 > x2) [x1, x2] = [x2, x1];
                if (y1 > y2) [y1, y2] = [y2, y1];
                
                for (let x = x1; x <= x2; x++) {
                    for (let y = y1; y <= y2; y++) {
                        board[y][x]++;
                        if (board[y][x] === 2) count++;
                    }
                }
            }
        }

        return count;
    }

    console.log(fillBoard2(inputs, board2));
}