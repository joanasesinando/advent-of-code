function run_2020_06(input) {
    const groups = parseInput();
    showAlert("success", "Result - p1: " + runP1() + "<br>Result - p2: " + runP2());

    function runP1() {
        let res = 0;

        groups.forEach(group => {
            const lines = group.split("\n");
            let questions = "";

            lines.forEach(line => {
                for (let i = 0; i < line.length; i++) {
                    const char = line[i];
                    if (!questions.includes(char)) questions = questions.concat(char);
                }
            });

            res += questions.length;
        });

        console.log("Result - p1: " + res);
        return res;
    }
    
    function runP2() {          
        let res = 0;

        groups.forEach(group => {
            const lines = group.split("\n");
            let questions = lines[0];

            lines.forEach(line => {
                let copy = questions;
                for (let i = 0; i < questions.length; i++) {
                    const char = questions[i];
                    if (!line.includes(char)) copy = copy.replace(char, "");
                    if (!copy) break;
                }
                questions = copy;
            });

            res += questions.length;
        });

        console.log("Result - p2: " + res);
        return res;
    }

    function parseInput() {
        return input.split("\n\n");
    }
}