function run_2021_10(input) {
    const lines = parseInput();
    showAlert("success", "Result - p1: " + runP1() + "<br>Result - p2: " + runP2());

    function runP1() {
        let res = 0;

        lines.forEach(line => {
            const stack = [];
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                if (isOpenChar(char)) stack.push(char);
                else if (!isMatchingCloseChar(stack.pop(), char)) res += getSyntaxPoints(char); 
            }
        });

        console.log("Result - p1: " + res);
        return res;
    }

    function runP2() {
        const scores = [];

        for (const line of lines) {
            const stack = [];
            let corrupted = false;
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                if (isOpenChar(char)) stack.push(char);
                else if (!isMatchingCloseChar(stack.pop(), char)) {
                    corrupted = true;
                    break; 
                }
            }
            if (corrupted) continue;

            let score = 0;
            while (stack.length > 0) {
                const char = stack.pop();
                score = score * 5 + getAutocompletePoints(char);
            }
            scores.push(score);
        }

        scores.sort((a, b) => a - b);
        const res = scores[Math.floor(scores.length / 2)];

        console.log("Result - p2: " + res);
        return res;
    }

    function parseInput() {
        return input.split("\n");
    }

    function isOpenChar(char) {
        const openChars = ["(", "[", "{", "<"];
        return openChars.includes(char);
    }

    function isMatchingCloseChar(open, char) {
        if (open === "(") return char === ")";
        else if (open === "[") return char === "]";
        else if (open === "{") return char === "}";
        else if (open === "<") return char === ">";
    }

    function getSyntaxPoints(char) {
        if (char === ")") return 3;
        else if (char === "]") return 57;
        else if (char === "}") return 1197;
        else if (char === ">") return 25137;
    }

    function getAutocompletePoints(char) {
        if (char === "(") return 1;
        else if (char === "[") return 2;
        else if (char === "{") return 3;
        else if (char === "<") return 4;
    }
}