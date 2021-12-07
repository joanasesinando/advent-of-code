function run_2020_09(input) {
    const numbers = parseInput(input);
    showAlert("success", "Result - p1: " + runP1() + "<br>Result - p2: " + runP2());

    function runP1() {
        const res = findInvalidNum(25);
        console.log("Result - p1: " + res);
        return res;
    }
    
    function runP2() { 
        const res = findWeakness(findInvalidNum(25));
        console.log("Result - p2: " + res);
        return res;
    }

    function parseInput(input) {
       return input.split("\n").map(Number);
    }

    function findInvalidNum(preamble) {
        for (let i = preamble; i < numbers.length; i++) {
            if (!isValidNum(preamble, i))
                return numbers[i];  
        }
        return true;
    }

    function isValidNum(preamble, index) {
        for (let j = index - preamble; j < index - 1; j++) {
            for (let k = j + 1; k < index; k++) {
                if (numbers[j] + numbers[k] === numbers[index]) 
                    return true;
            }
        }
        return false;
    }

    function findWeakness(invalid) {
        for (let i = 0; i < numbers.length - 1; i++) {
            let res = [numbers[i]];
            let sum = numbers[i];

            for (let j = i + 1; j < numbers.length; j++) {
                res.push(numbers[j]);
                sum += numbers[j];

                if (sum === invalid) {
                    res.sort((a, b) => a - b);
                    return res.shift() + res.pop();
                    
                } else if (sum > invalid) break;
            }
        }
    }
}