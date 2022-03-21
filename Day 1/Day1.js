const Day1Input = require('./Day1input').input;
const found = Day1Input.match(/\d+/g);
const IntInput = found.map((number) => {
    return parseInt(number);
})

const countIncreasedMeasurement = (IntArray) => {
    let count = 0;
    for (let i = 1; i < IntArray.length + 1; i++) {
        if (IntArray[i] > IntArray[i - 1]) {
            count++;
            // console.log(`${IntInput[i]} is larger than ${IntInput[i - 1]}`);
        }
    }
    return count;
}

let sum3Numbers = [];
for (let j = 2; j < IntInput.length + 1; j++) {
    const sum = IntInput[j] + IntInput[j - 1] + IntInput[j - 2];
    sum3Numbers.push(sum);
}

console.log(countIncreasedMeasurement(IntInput));
console.log(countIncreasedMeasurement(sum3Numbers));

