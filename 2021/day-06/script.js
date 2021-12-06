function run_2021_06(input) {
    const fishes = parseInput();
    const CYCLE_LENGTH = 7;

    showAlert("success", "Result - p1: " + runP1() + "<br>Result - p2: " + runP2());

    function runP1() {
        const res = simulate(fishes, 80);
        console.log("Result - p1: " + res);
        return res;
    }
    
    function runP2() { 
        const res = simulate(fishes, 256);
        console.log("Result - p1: " + res);
        return res;
    }

    function parseInput() {
        return input.split(",").map(n => parseInt(n, 10));
    }

    function simulate(fishes, days) {
        const queue = Array(CYCLE_LENGTH + 2).fill(0);

        for (const fish of fishes) {
            queue[fish]++;
        }

        let day = 0;
        while (day++ < days) {
            const current = queue.shift();
            queue[6] += current;
            queue.push(current);
        }

        return queue.reduce((a, b) => a + b, 0);
    }
}