function runDay2(input) {
    input = input.split("\n").map((line) => [ line.split(" ")[0], parseInt(line.split(" ")[1], 10) ]);

    const res1 = runP1();
    const res2 = runP2();
    showAlert("success", "Result - p1: " + res1 + "<br>Result - p2: " + res2);

    function runP1() {
        let horizontal = 0, depth = 0;
    
        input.forEach(action => {
            const move = action[0];
            const steps = action[1];

            if (move === "forward") horizontal += steps;
            else if (move === "down") depth += steps;
            else if (move === "up") depth -= steps;
        });

        console.log("Result - p1: " + horizontal * depth);
        return horizontal * depth;
    }
    
    function runP2() {          
        let horizontal = 0, depth = 0, aim = 0;
    
        input.forEach(action => {
            const move = action[0];
            const steps = action[1];

            if (move === "forward") {
                horizontal += steps;
                depth += aim * steps;
            }
            else if (move === "down") aim += steps;
            else if (move === "up") aim -= steps;
        });

        console.log("Result - p2: " + horizontal * depth);
        return horizontal * depth;
    }
}