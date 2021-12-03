function runDay1(input) {
    input = input.split("\n").map((n) => parseInt(n, 10));

    const res1 = runP1();
    const res2= runP2();
    showAlert("success", "Result - p1: " + res1 + "<br>Result - p2: " + res2);

    function runP1() {
        for (let i = input.length - 1; i >= 0; i--) {
            const n = input[i];
            const rest = 2020 - n;

            if (input.includes(rest)) {
                console.log("Result - p1: " + n * rest);
                return n * rest;
            }

            input.pop();
        }
    }
    
    function runP2() {          
        for (const n1 of input) {
            for (const n2 of input) {
                if (n1 === n2) continue;

                const rest = 2020 - n1 - n2;
                if (input.includes(rest) && rest !== n1 && rest !== n2) {
                    console.log("Result - p2: " + n1 * n2 * rest);
                return n1 * n2 * rest;
                }
            }
        }
    }
}