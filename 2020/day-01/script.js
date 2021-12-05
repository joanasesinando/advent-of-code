function run_2020_01(input) {
    let report;
    showAlert("success", "Result - p1: " + runP1() + "<br>Result - p2: " + runP2());

    function runP1() {
        parseInput();
        for (let i = report.length - 1; i >= 0; i--) {
            const n = report[i];
            const rest = 2020 - n;

            if (report.includes(rest)) {
                console.log("Result - p1: " + n * rest);
                return n * rest;
            }

            report.pop();
        }
    }
    
    function runP2() { 
        parseInput();         
        for (const n1 of report) {
            for (const n2 of report) {
                if (n1 === n2) continue;

                const rest = 2020 - n1 - n2;
                if (report.includes(rest) && rest !== n1 && rest !== n2) {
                    console.log("Result - p2: " + n1 * n2 * rest);
                    return n1 * n2 * rest;
                }
            }
        }
    }

    function parseInput() {
        report = input.split("\n").map((n) => parseInt(n, 10));
    }
}