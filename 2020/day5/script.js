function runDay5(input) {
    input = input.split("\n");

    NUM_ROWS = 128;
    NUM_COLUMNS = 8;

    const res1 = runP1();
    const res2 = runP2();
    showAlert("success", "Result - p1: " + res1 + "<br>Result - p2: " + res2);

    function runP1() {
        let max = 0;

        input.forEach(bp => {
            const row = discover(bp.substring(0, bp.length - 3), 0, NUM_ROWS - 1);
            const column = discover(bp.substring(bp.length - 3), 0, NUM_COLUMNS - 1);
            const seatID = row * 8 + column;
            if (seatID > max) max = seatID;
        });

        console.log("Result - p1: " + max);
        return max;
    }
    
    function runP2() {          
        const seatMap = Array(NUM_ROWS).fill(Array.from(Array(NUM_COLUMNS).keys()));

        input.forEach(bp => {
            const row = discover(bp.substring(0, bp.length - 3), 0, NUM_ROWS - 1);
            const column = discover(bp.substring(bp.length - 3), 0, NUM_COLUMNS - 1);
            seatMap[row] = seatMap[row].filter(c => c !== column);
        });

        for (let r = 1; r < NUM_ROWS - 1; r++) {
            const row = seatMap[r];
            if (row.length === 0) continue;

            for (const c of row) {
                if (hasPreviousID(r, c, seatMap) && hasNextID(r, c, seatMap)) {
                    console.log("Result - p2: " + (r * 8 + c));
                    return r * 8 + c;
                }
            }
        }
    }

    function discover(actions, min, max) {
        if (!actions && min === max) return min;

        const action = actions[0];
        let half;
        if (action === "F" || action === "L") half = lowerHalf(min, max);
        else if (action === "B" || action === "R") half = upperHalf(min, max);

        min = half[0];
        max = half[1];
        return discover(actions.substring(1), min, max);
    }

    function lowerHalf(min, max) {
        return [min, (max - min + 1) / 2 + min - 1];
    }

    function upperHalf(min, max) {
        return [(max - min + 1) / 2 + min, max];
    }

    function hasPreviousID(r, c, map) {
        if (c === 0) return !map[r - 1].includes(NUM_COLUMNS - 1);
        else return !map[r][c - 1];
    }

    function hasNextID(r, c, map) {
        if (c === NUM_COLUMNS - 1) return !map[r + 1].includes(0);
        else return !map[r][c + 1];
    }
}