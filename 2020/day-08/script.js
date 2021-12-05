function run_2020_08(input) {
    let code;
    showAlert("success", "Result - p1: " + runP1() + "<br>Result - p2: " + runP2());

    function runP1() {
        parseInput(input);
        const acc = runProgram().acc;

        console.log("Result - p1: " + acc);
        return acc;
    }
    
    function runP2() { 
        for (let i = 0; i < code.length; i++) {
            parseInput(input); 
            if (code[i].op === "acc") continue;

            changeCode(i); 
            const output = runProgram();
         
            if (!output.loop) {
                console.log("Result - p2: " + output.acc);
                return output.acc;
            }        
        }
    }

    function parseInput(input) {
        code = [];
        const lines = input.split("\n");
        lines.forEach(line => {
            const op = line.split(" ")[0];
            const qt = parseInt(line.split(" ")[1]);
            code.push({op, qt, visited: false});
        });
    }

    function runInstruction(instr, i, acc) {
        switch (instr.op) {
            case "nop":
                return {i: ++i, acc};

            case "jmp":
                return {i: i + instr.qt, acc};

            case "acc":
                return {i: ++i, acc: acc + instr.qt};

            default:
                return {i, acc};
        }
    }

    function changeCode(i) {
        code[i].op = code[i].op === "nop" ? "jmp" : "nop";
    }

    function runProgram() {
        let instr = code[0];
        let i = 0;
        let acc = 0;

        while (!instr.visited) {
            const output = runInstruction(instr, i, acc);

            instr.visited = true;
            acc = output.acc;
            i = output.i;

            if (i >= code.length) return {loop: false, acc};
            
            instr = code[i];
        }
        return {loop: true, acc};
    }
}