const fs = require('fs');
const { join } = require('path');

const file = fs.readFileSync(join(__dirname, './input.txt'), 'utf8');
const inputs = file.split(',').map(number => parseInt(number));
// const inputs = '3,4,3,1,2'.split(',').map(number => parseInt(number));

const days = 256;

// {
//     const lanternfish = (inputs, days) => {
//         let inputs1 = [...inputs];
//         for (let i = 0; i < days; i++) {
//             let eights = [];
//             inputs1 = inputs1.map(timer => {
//                 if (timer === 0) {
//                     eights.push(8);
//                     return 6;
//                 } else return timer - 1;
//             })
//             inputs1 = inputs1.concat(eights);
//         }
//         return inputs1;
//     }

//     console.log(lanternfish(inputs, days).length);
// }

{
    const lanternfish2 = (inputs, days) => {
        // total 9 days of lifetime
        let counts = new Array(9).fill(0);
        
        for (input of inputs) counts[input]++;

        for (let i = 0; i < days; i++) {
            const newCounts = counts.shift();
            counts[6] += newCounts;
            counts.push(newCounts);
        }

        let sum = 0;
        for (count of counts) {
            sum += count;
        }

        return sum;
    }

    console.log(lanternfish2(inputs, days));
}