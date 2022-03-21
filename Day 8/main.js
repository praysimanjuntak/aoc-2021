const fs = require('fs');
const { join } = require('path');

const file = fs.readFileSync(join(__dirname, './input.txt'), 'utf8');
// const file = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
// edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
// fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
// fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
// aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
// fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
// dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
// bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
// egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
// gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`
const inputs = file.split('\n').map(input => input.replace(' | ', ',').replace('\r', '').split(',').map(text => text.split(' ')));

{
    const count1478 = (displays) => {
        let count = 0;
        for (display of displays) {
            for (string of display[1]) {
                // console.log(string);
                if (string.length === 2 ||
                    string.length === 4 ||
                    string.length === 3 ||
                    string.length === 7) {
                        count += 1;
                    }
            }
        }

        return count;
    } 

    console.log(`Answer: ${count1478(inputs)}`);
}

{
    const displayOutput = (displays) => {
        const inside = (string1, string2) => {
            const word = string1.split('');
            for (letter of word) {
                if (!string2.includes(letter)) return false;
            }
            return true;
        }

        const equalSegment = (string1, string2) => {
            if (string1.length === string2.length) {
                const word = string1.split('');
                for (letter of word){
                    if (!string2.includes(letter)) return false;
                }
                return true;
            }
            return false;
        }

        let sum = 0;
        for (display of displays) {
            let meaning = new Array(10).fill();
            let rest = [];
            for (string of display[0]) {
                switch (string.length) {
                    case 2:
                        meaning[1] = string;
                        break;
                    case 4:
                        meaning[4] = string;
                        break;
                    case 3:
                        meaning[7] = string;
                        break;
                    case 7:
                        meaning[8] = string;
                        break;
                    default:
                        rest.push(string);
                        break;
                }
            }
            // console.log(rest);
            
            const unknown = [9, 3, 2, 5, 6, 0];
            for (number of unknown) {
                switch (number) {
                    case 9:
                        for (string of rest) {
                            if (inside(meaning[4], string) && inside(meaning[7], string) && string.length === 6) meaning[9] = string;
                        }
                        break;
                    case 3:
                        for (string of rest) {
                            if (inside(meaning[1], string) && string.length === 5) meaning[3] = string;
                        }
                        break;
                    case 6:
                        for (string of rest) {
                            if (inside(meaning[5], string) && string.length === 6 && meaning[9] !== string) {
                                meaning[6] = string;
                            }
                        }
                        break;
                    case 2:
                        for (string of rest) {
                            if (!inside(string, meaning[9]) && string.length === 5 && meaning[3] !== string) meaning[2] = string;
                        }
                        break;
                    case 5:
                        for (string of rest) {
                            if (string.length === 5 &&
                                string !== meaning[3] &&
                                string !== meaning[2]) meaning[5] = string;
                        }
                        break;
                    case 0:
                        for (string of rest) {
                            if (string.length === 6 &&
                                string !== meaning[9] &&
                                string !== meaning[6]) meaning[0] = string;
                        }
                        break;
                    default:
                        break;
                }
            }
            
            // console.log(meaning);

            let integer = 0;
            for (let i = 0; i < display[1].length; i++) {
                for (let j = 0; j < meaning.length; j++) {
                    if (equalSegment(meaning[j],display[1][i])) {
                        // console.log(meaning[j], 'meaning[j]');
                        const result = j * (10 ** (display[1].length - i - 1));
                        // console.log(result, 'result')
                        integer += result;
                    }
                }
            }
            // console.log(integer, 'integer');

            sum += integer;
            // console.log(`sum = ${sum}`)
        }
        return sum;
    }

    console.log(`Answer: ${displayOutput(inputs)}`);
}