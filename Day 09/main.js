const fs = require('fs');
const { join } = require('path');

const file = fs.readFileSync(join(__dirname, './input.txt'), 'utf8');
// const file = `2199943210
// 3987894921
// 9856789892
// 8767896789
// 9899965678`
const inputs = file.split('\n').map(row => row.replace('\r', '').split('').map(number => parseInt(number)));
const h = inputs.length;
const w = inputs[0].length;

// console.log(inputs);

const isLower = (y, x) => {
    const tile = inputs[y][x];

    if (y > 0 && inputs[y - 1][x] <= tile) return false;
    if (x > 0 && inputs[y][x - 1] <= tile) return false;
    if (x < w - 1 && inputs[y][x + 1] <= tile) return false;
    if (y < h - 1 && inputs[y + 1][x] <= tile) return false;

    return true;
}

const getBasin = (y, x, checked = []) => {
    if (x < 0 || x >= w || y < 0 || y >= h) return 0;
    if (inputs[y][x] === 9) return 0;

    const key = `${y}_${x}`;
    if (checked.includes(key)) return 0;
    
    let count = 1;
    checked.push(key);

    count += getBasin(y + 1, x, checked);
    count += getBasin(y, x + 1, checked);
    count += getBasin(y - 1, x, checked);
    count += getBasin(y, x - 1, checked);

    return count;
}

{
    let answer = 0;
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            if (isLower(y, x)) {
                answer += inputs[y][x] + 1;
            }
        }
    }

    console.log(`Answer 1: ${answer}`);
}

{
    const basins = [];

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            if (isLower(y, x)) {
                basins.push(getBasin(y, x));
            }
        }
    }

    const sorted = [...basins.sort((a, b) => b - a)];
    const result = sorted[0] * sorted[1] * sorted[2];
    
    console.log(`Answer 2: ${result}`);
}

// {
//     const riskLevel = (heightmap) => {
//         let lowArray = [];
//         for (let row = 0; row < heightmap.length; row++) {
//             for (let column = 0; column < heightmap[row].length; column++) {
//                 switch (row) {
//                     case 0:
//                         if (column === 0) {
//                             if (heightmap[row][column] < heightmap[row][column + 1] && heightmap[row][column] < heightmap[row + 1][column]) {
//                                 lowArray.push(heightmap[row][column]);
//                             }
//                         }
//                         else if (column === heightmap[row].length - 1) {
//                             if (heightmap[row][column] < heightmap[row][column - 1] && heightmap[row][column] < heightmap[row + 1][column]) {
//                                 lowArray.push(heightmap[row][column]);
//                             }
//                         }
//                         else {
//                             if (heightmap[row][column] < heightmap[row][column - 1] &&
//                                 heightmap[row][column] < heightmap[row + 1][column] &&
//                                 heightmap[row][column] < heightmap[row][column + 1]) lowArray.push(heightmap[row][column]);
//                         }
//                         break;
//                     case heightmap.length - 1:
//                         if (column === 0) {
//                             if (heightmap[row][column] < heightmap[row - 1][column] && heightmap[row][column] < heightmap[row][column + 1]) {
//                                 lowArray.push(heightmap[row][column]);
//                             }
//                         }
//                         else if (column === heightmap[row].length - 1) {
//                             if (heightmap[row][column] < heightmap[row][column - 1] && heightmap[row][column] < heightmap[row - 1][column]) {
//                                 lowArray.push(heightmap[row][column]);
//                             }
//                         }
//                         else {
//                             if (heightmap[row][column] < heightmap[row][column - 1] &&
//                                 heightmap[row][column] < heightmap[row - 1][column] &&
//                                 heightmap[row][column] < heightmap[row][column + 1]) lowArray.push(heightmap[row][column]);
//                         }
//                         break;
//                     default:
//                         if (column === 0) {
//                             if (heightmap[row][column] < heightmap[row - 1][column] &&
//                                 heightmap[row][column] < heightmap[row][column + 1] &&
//                                 heightmap[row][column] < heightmap[row + 1][column]) {
//                                     lowArray.push(heightmap[row][column]);
//                                 }
//                             }
//                         else if (column === heightmap[row].length - 1) {
//                             if (heightmap[row][column] < heightmap[row - 1][column] &&
//                                 heightmap[row][column] < heightmap[row][column - 1] &&
//                                 heightmap[row][column] < heightmap[row + 1][column]) {
//                                     lowArray.push(heightmap[row][column]);
//                                 }
//                             }
//                         else {
//                             if (heightmap[row][column] < heightmap[row - 1][column] &&
//                                 heightmap[row][column] < heightmap[row][column + 1] &&
//                                 heightmap[row][column] < heightmap[row + 1][column] &&
//                                 heightmap[row][column] < heightmap[row][column - 1]) lowArray.push(heightmap[row][column]);
//                         }
//                         break;
//                 }
//             }
//         }

//         let sum = 0;
//         for (number of lowArray) {
//             sum += number + 1;
//         }

//         return sum;
//     }

//     console.log(`Answer: ${riskLevel(inputs)}`);
// }