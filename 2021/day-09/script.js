function run_2021_09(input) {
    const map = parseInput();
    showAlert("success", "Result - p1: " + runP1() + "<br>Result - p2: " + runP2());

    function runP1() {
        const lowPoints = findLowPoints();

        let risk = 0;
        for (const lowPoint of lowPoints) {
            risk += (1 + map[lowPoint[0]][lowPoint[1]]);
        }

        console.log("Result - p1: " + risk);
        return risk;
    }

    function runP2() {
        const basinSizes = [];

        const lowPoints = findLowPoints();
        for (const lowPoint of lowPoints) {
            basinSizes.push(findBasinSize(lowPoint));
        }

        basinSizes.sort((a, b) => b - a);
        const res = basinSizes[0] * basinSizes[1] * basinSizes[2];

        console.log("Result - p2: " + res);
        return res;
    }

    function parseInput() {
        const map = [];

        const rows = input.split("\n");
        rows.forEach(row => {
            const temp = [];
            for (let i = 0; i < row.length; i++) {
                temp.push(parseInt(row[i], 10));
            }
            map.push(temp);
        });

        return map;
    }

    function findLowPoints() {
        const lowPoints = [];

        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                const height = map[i][j];

                if (j > 0 && height >= map[i][j - 1]) continue;
                else if (j < map[i].length - 1 && height >= map[i][j + 1]) continue;
                else if (i > 0 && height >= map[i - 1][j]) continue;
                else if (i < map.length - 1 && height >= map[i + 1][j]) continue;
                
                lowPoints.push([i, j]);
            }
        }

        return lowPoints;
    }

    function findBasinSize(lp) {
        let size = 1;
        const queue = [lp];
        const validated = [];

        while (queue.length > 0) {
            const first = queue.shift();
            const i = first[0];
            const j = first[1];
            const height = map[i][j];

            if (j > 0 && map[i][j - 1] > height && map[i][j - 1] !== 9) addToBasin([i, j - 1]); // left
            if (j < map[i].length - 1 && map[i][j + 1] > height && map[i][j + 1] !== 9) addToBasin([i, j + 1]); // right
            if (i > 0 && map[i - 1][j] > height && map[i - 1][j] !== 9) addToBasin([i - 1, j]); // top
            if (i < map.length - 1 && map[i + 1][j] > height && map[i + 1][j] !== 9) addToBasin([i + 1, j]); // bottom

            validated.push(first);
        }

        return size;

        function addToBasin(point) {
            if (!hasPoint(validated, point) && !hasPoint(queue, point)) {
                size++;
                queue.push(point);
            }
        }

        function hasPoint(array, point) {
            return array.filter(p => p[0] === point[0] && p[1] === point[1]).length !== 0;
        }
    }
}