function run_2020_10(input) {
    showAlert("success", "Result - p1: " + runP1() + "<br>Result - p2: " + runP2());

    function runP1() {
        let ratings = parseInput(input).sort((a, b) => a - b);
        ratings.unshift(0);
        ratings.push(ratings[ratings.length - 1] + 3);

        let count = {};
        ratings.forEach((rating, i, array) => {
            if (i >= ratings.length - 1) return;

            const diff = array[i + 1] - rating;
            count[diff] = count[diff] ? count[diff] + 1 : 1;
        });

        const res = count[1] * count[3];
        console.log("Result - p1: " + res);
        return res;
    }
    
    function runP2() { 
        let ratings = parseInput(input).sort((a, b) => a - b);
        ratings.unshift(0);
        const max = ratings[ratings.length - 1] + 3;
        ratings.push(max);
        console.log("ratings", ratings)

        const possibilities = [0];
        let res = 1;
        while (possibilities.length > 0) {
            const rating = possibilities[0];

            const validOptions = [];
            for (let option = rating + 1; option <= rating + 3; option++) {
                if (ratings.includes(option)) validOptions.push(option);
            }

            if (validOptions.length !== 1) {
                for (const option of validOptions.slice(1)) {
                    if (option === max || possibilities.includes(option)) continue;
                    possibilities.push(option);
                }
                res = possibilities.length !== 1 ? res + (validOptions.length - 1) : res * validOptions.length;
            }

            if (validOptions[0] === max || possibilities.includes(validOptions[0])) {
                possibilities.shift();

            } else {
                possibilities[0] = validOptions[0];
            }
        }

        console.log("Result - p2: " + res);
        return res;
    }

    function parseInput(input) {
       return input.split("\n").map(Number);
    }
}