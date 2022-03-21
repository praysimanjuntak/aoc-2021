// const input = require('./Day3Input').input;
const input = require('./Day3Input').input;
const binaries = input.match(/\d+/g);

const convertToDecimal = (binaryInArray) => {
    sum = 0;
    for (let j = binaryInArray.length - 1; j >= 0; j--) {
        let calc = (2**(j) * binaryInArray[binaryInArray.length - j - 1]);
        sum += calc;
    }
    return sum;
}

const powerConsumption = (binaryArray) => {
    let gamma = [];
    let epsilon = [];
    for (let i = 0; i < binaryArray[1].length; i++) {
        let arrayOfZero = [];
        let arrayOfOne = [];
        for (binary of binaryArray) {
            if (parseInt(binary[i]) === 0) {
                arrayOfZero.push(0);
            } else {
                arrayOfOne.push(1);
            }
        }
        if (arrayOfOne.length > arrayOfZero.length) {
            gamma.push(1);
            epsilon.push(0);
        } else {
            gamma.push(0);
            epsilon.push(1);
        }
    }
    return convertToDecimal(gamma) * convertToDecimal(epsilon);
}

// console.log(powerConsumption(binaries));

const oxyRating = (binaryArray, result) => {
    let arrayOfZero = [];
    let arrayOfOne = [];
    
    if (binaryArray.length !== 1) {
        for (binary of binaryArray) {
            if (parseInt(binary[0]) === 0) {
                arrayOfZero.push(0);
            } else {
                arrayOfOne.push(1);
            }
        }

        let significant = arrayOfOne.length < arrayOfZero.length ? 0 : 1;
    
        let newBinaries = binaryArray
            .filter((binary) => {
                return parseInt(binary[0]) === significant;
            })
            if (newBinaries.length > 1) {
                newBinaries = newBinaries.map(binary => binary.replace(/\w/, ''));
            }
            result.push(significant);
            oxyRating(newBinaries, result);
    } else {
        if (binaryArray[0].length !== 1) {
            let remainder = binaryArray[0].split('');
            remainder.splice(0, 1);
            remainder.forEach(number => result.push(parseInt(number)));
        }
    }
}

let oxyResult = [];
oxyRating(binaries, oxyResult);

const CO2Rating = (binaryArray, result) => {
    let arrayOfZero = [];
    let arrayOfOne = [];
    
    if (binaryArray.length !== 1) {
        for (binary of binaryArray) {
            if (parseInt(binary[0]) === 0) {
                arrayOfZero.push(0);
            } else {
                arrayOfOne.push(1);
            }
        }

        let significant = arrayOfZero.length <= arrayOfOne.length ? 0 : 1;
    
        let newBinaries = binaryArray
            .filter((binary) => {
                return parseInt(binary[0]) === significant;
            })
            if (newBinaries.length > 1) {
                newBinaries = newBinaries.map(binary => binary.replace(/\w/, ''));
            }
            result.push(significant);
            CO2Rating(newBinaries, result);
    } else {
        if (binaryArray[0].length !== 1) {
            let remainder = binaryArray[0].split('');
            remainder.splice(0, 1);
            remainder.forEach(number => result.push(parseInt(number)));
        }
    }
}

let CO2Result = [];
CO2Rating(binaries, CO2Result);
console.log(convertToDecimal(CO2Result) * convertToDecimal(oxyResult));
// console.log(oxyRating(binaries));