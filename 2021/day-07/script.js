function run_2021_07(input) {
    const positions = parseInput();
    showAlert("success", "Result - p1: " + runP1() + "<br>Result - p2: " + runP2());

    function runP1() {
        const res = cheapestMove("constant");
        console.log("Result - p1: " + res);
        return res;
    }

    function runP2() {
        const res = cheapestMove("non-constant");
        console.log("Result - p2: " + res);
        return res;
    }

    function parseInput() {
        return input.split(",").map(Number);
    }

    function cheapestMove(rate) {
        const maxPos = positions.sort((a, b) => a - b)[positions.length - 1];

        let minFuel = 0;
        for (let pos = 0; pos <= maxPos; pos++) {
            let fuel = 0;
            positions.forEach(position => {
                fuel += rate === "constant" ? Math.abs(position - pos) : sum(Math.abs(position - pos));
            });
            if (minFuel === 0 || fuel < minFuel) minFuel = fuel;
        }

        return minFuel;
    }

    function sum(n) {
        return (n * (n + 1)) / 2;
    }
}