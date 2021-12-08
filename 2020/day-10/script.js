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
        ratings.push(ratings[ratings.length - 1] + 3);
        console.log("ratings", ratings)

        
        const count = {1: 1};
        const possibilities = {};
        for (let i = 0; i < ratings.length; i++) {
            possibilities[i] = [ratings[i]];
        }

        for (let i = 0; i < ratings.length - 1; i++) {
            const min = possibilities[i][0] + 1;
            const max = possibilities[i][possibilities[i].length - 1] + 3;

            for (let j = min; j <= max; j++) {
                if (ratings.includes(j) && !possibilities[i + 1].includes(j)) {
                    possibilities[i + 1].push(j);
                    possibilities[i + 1].sort((a, b) => a - b);
                }
            }
            
            const len = possibilities[i + 1].length;
            count[len] = count[len] ? count[len] + 1 : 1;
        }
        console.log(count)
        console.log(possibilities)

        const res =  Object.values(count).reduce((a, b) => a + b) - Object.values(count).length - 1;
        console.log("Result - p2: " + res);
        return res;
    }

    function parseInput(input) {
       return input.split("\n").map(Number);
    }
}