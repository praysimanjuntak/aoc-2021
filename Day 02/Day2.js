const input = require('./Day2Input').input;
const re = /\w+(\s\d)/g;
const steps = input.match(re);

let horizontal = 0;
// let vertical = 0;
let aim = 0;
let depth = 0;

for (step of steps) {
    let direction = step.replace(/\s\d/g, '');
    let magnitude = step.replace(/\D/g, '');
    if (direction === 'forward') {
        horizontal += parseInt(magnitude);
        depth += aim * parseInt(magnitude);
    } else if (direction === 'down') {
        // vertical -= parseInt(magnitude);
        aim += parseInt(magnitude);
    } else {
        // vertical += parseInt(magnitude);
        aim -= parseInt(magnitude);
    }
}

console.log(horizontal * depth);