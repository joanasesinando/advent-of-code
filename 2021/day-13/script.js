function run_2021_13(input) {
    showAlert("success", "Result - p1: " + runP1() + "<br>Result - p2: " + runP2());

    function runP1() {
        const parsedInput = parseInput();     

        const folded = fold(parsedInput.manual.marks, parsedInput.dots, parsedInput.manual.instructions[0]);
        const res = folded.dots;

        console.log("Result - p1: " + res);
        return res;
    }

    function runP2() {
        const parsedInput = parseInput();  
        let manual = parsedInput.manual; 

        manual.instructions.forEach(instruction => {
            const folded = fold(manual.marks, 0, instruction);
            manual.marks = folded.marks;
            console.log("marks", manual.marks)
        });

        console.log("Result - p2: ", manual.marks);
        return "check console for answer";
    }

    function parseInput() {
        const manual = {marks: [], instructions: []};

        let maxX = 0, maxY = 0;
        const marks = [];
        input.split("\n").forEach(line => {
            if (line.startsWith('fold')) {
                const parts = line.substring(11).split("=");
                manual.instructions.push([parts[0], parseInt(parts[1], 10)])

            } else if (line) {
                const parts = line.split(",");
                const x = parseInt(parts[0], 10);
                const y = parseInt(parts[1], 10);

                if (x > maxX) maxX = x;
                if (y > maxY) maxY = y;

                marks.push([x, y]);
            }
        });

        let dots = 0;
        maxX++;
        maxY++;
        manual.marks = Array.from(Array(maxY), x => Array(maxX).fill("."));
        marks.forEach(mark => {
            manual.marks[mark[1]][mark[0]] = "#";
            dots++;
        });
        return {manual, dots};
    }

    function fold(marks, dots, instr) {
        const vertical = instr[0] === "x";

        const maxY = vertical ? marks.length : instr[1];
        for (let i = 0; i < maxY; i++) {

            const maxX = vertical ? instr[1] : marks[i].length;
            for (let j = 0; j < maxX; j++) {
                
                const oldPos = vertical ? marks[i][marks[i].length - j - 1] : marks[marks.length - i - 1][j]; 
                let newPos = marks[i][j];
                const newChar = oldPos === "#" || newPos === "#" ? "#" : ".";

                if (oldPos === "#" && newPos === "#") dots--;
                marks[i][j] = newChar;
            }
        }
        marks = reduce(marks, vertical ? instr[1] : marks[0].length, vertical ? marks.length : instr[1]);

        return {marks, dots};
    }

    function reduce(array, xMax, yMax) {
        array = array.slice(0, yMax);
        for (let i = 0; i < array.length; i++) {
            array[i] = array[i].slice(0, xMax);
        }
        return array;
    }
}