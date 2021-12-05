function run_2021_05(input) {
    let max = 0;
    const lines = parseInput();
    showAlert("success", "Result - p1: " + runP1() + "<br>Result - p2: " + runP2());

    function runP1() {
        const noDiagonalLines = filterDiagonals(lines);
        const res = countOverlaps(drawDiagram(noDiagonalLines));

        console.log("Result - p1: " + res);
        return res;
    }
    
    function runP2() { 
        const onlyValidLines = filterInvalid(lines);
        const res = countOverlaps(drawDiagram(onlyValidLines));

        console.log("Result - p2: " + res);
        return res;
    }

    function parseInput() {
        const lines = input.split("\n").map(line => {
            const parts = line.split(" ");

            const x1 = parseInt(parts[0].split(",")[0], 10);
            const y1 = parseInt(parts[0].split(",")[1], 10);
            const x2 = parseInt(parts[2].split(",")[0], 10);
            const y2 = parseInt(parts[2].split(",")[1], 10);

            max = x1 > max ? x1 : x2 > max ? x2 : y1 > max ? y1 : y2 > max ? y2 : max;

            return [ [x1, y1], [x2, y2] ];
        });

        max++;
        return lines;
    }

    function filterDiagonals(lines) {
        return lines.filter(line => 
            line[0][0] === line[1][0] || 
            line[0][1] === line[1][1]);
    }

    function filterInvalid(lines) {
        return lines.filter(line => 
            line[0][0] === line[1][0] || 
            line[0][1] === line[1][1] ||
            Math.abs(line[0][0] - line[1][0]) === Math.abs(line[0][1] - line[1][1]));
    }

    function drawDiagram(lines) {
        let diagram = Array.from(Array(max), x => Array.from(Array(max), x => "."));
        
        for (const line of lines) {
            drawLine(line, diagram);
        }

        return diagram;
    }

    function drawLine(line, diagram) {
        const x1 = line[0][0];
        const y1 = line[0][1];
        const x2 = line[1][0];
        const y2 = line[1][1];

        if (x1 === x2) drawVerticalLine(y1 < y2 ? y1 : y2, y2 >= y1 ? y2 : y1, x1, diagram);
        else if (y1 === y2) drawHorizontalLine(x1 < x2 ? x1 : x2, x2 >= x1 ? x2 : x1 , y1, diagram);
        else drawDiagonalLine(x1, y1, x2, y2, diagram);
    }

    function drawHorizontalLine(x1, x2, y, diagram) {
        for (let x = x1; x <= x2; x++) {
            diagram[y][x] = diagram[y][x] === "." ? 1 : diagram[y][x] + 1;
        }
    }

    function drawVerticalLine(y1, y2, x, diagram) {
        for (let y = y1; y <= y2; y++) {
            diagram[y][x] = diagram[y][x] === "." ? 1 : diagram[y][x] + 1;
        }
    }

    function drawDiagonalLine(x1, y1, x2, y2, diagram) {
        const decline = x1 < x2 ? y1 < y2 ? 1 : -1 : y2 < y1 ? 1 : -1;
        
        const x0 = x1 < x2 ? x1 : x2;
        const y0 = x1 < x2 ? y1 : y2;

        let xMin = x0;
        let xMax = x1 < x2 ? x2 : x1;
        let yMin = y1 < y2 ? y1 : y2;
        let yMax = y1 < y2 ? y2 : y1;
        
        for (let x = x0, y = y0; x >= xMin && x <= xMax && y >= yMin && y <= yMax; x = x + 1, y = decline < 0 ? y - 1 : y + 1) {
            diagram[y][x] = diagram[y][x] === "." ? 1 : diagram[y][x] + 1;
        }
    }

    function countOverlaps(diagram) {
        let numOverlaps = 0;
        diagram.forEach(row => {
            row.forEach(cell => {
                if (overlap(cell)) numOverlaps++;
            });
        });
        return numOverlaps;

        function overlap(cell) {
            return cell !== "." && cell >= 2;
        }
    }
}