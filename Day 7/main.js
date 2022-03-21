const fs = require('fs');
const { join } = require('path');

const file = fs.readFileSync(join(__dirname, './input.txt'), 'utf8');
// const file = `16,1,2,0,4,2,7,1,2,14`;
const inputs = file.split(',').map(number => parseInt(number));


{
    const minAlign = (positions) => {
        const length = positions.length;
        const sorted = positions.sort((a, b) => a - b);
        let medIndex = (length % 2 === 0 ? length / 2 : (length / 2) - 1);
        const median = sorted[medIndex];
        let sum = 0;
        for (number of sorted) sum += Math.abs(number - median);
        return sum;
    }

    console.log(`Answer: ${minAlign(inputs)}`);
}

{
    const minAlign2 = (positions) => {
        const length = positions.length;
        const sorted = positions.sort((a, b) => a - b);
        let sumSorted = 0;
        for (number of sorted) sumSorted += number;
        const mean = sumSorted / length;
        const reducer = Math.floor(mean);
        let sum = 0;
        for (number of sorted) {
            const difference = Math.abs(number - reducer)
            const result = (difference * (difference + 1)) / 2;
            sum += result;
        }
        return sum;
    }

    console.log(`Answer: ${minAlign2(inputs)}`);
}