function run_2020_03(input) {
    let map, nrRows, nrColumns;
    showAlert("success", "Result - p1: " + runP1() + "<br>Result - p2: " + runP2());

    function runP1() {
        parseInput();
        let pos = [0, 0];
        let res = 0;

        while (pos[1] < nrRows - 1) {
            pos[0] = (pos[0] + 3) % nrColumns;
            pos[1]++;
            if (map[pos[1]][pos[0]] === "#") res++;
        }        

        console.log("Result - p1: " + res);
        return res;
    }
    
    function runP2() { 
        parseInput();         
        const slopes = [ [1, 1], [3, 1], [5, 1], [7, 1], [1, 2] ];
        let res = 1;

        slopes.forEach(slope => {
            let pos = [0, 0];
            let count = 0;

            while (pos[1] < nrRows - 1) {
                pos[0] = (pos[0] + slope[0]) % nrColumns;
                pos[1] += slope[1];
                if (map[pos[1]][pos[0]] === "#") count++;
            }

            res *= count;
        });   

        console.log("Result - p2: " + res);
        return res;
    }

    function parseInput() {
        map = input.split("\n");
        nrRows = map.length;
        nrColumns = map[0].length;
    }
}