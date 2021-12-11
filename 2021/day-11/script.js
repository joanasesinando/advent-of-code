function run_2021_11(input) {
    showAlert("success", "Result - p1: " + runP1() + "<br>Result - p2: " + runP2());

    function runP1() {
        const energy = parseInput();

        let flashes = 0;
        for (let step = 1; step <= 100; step++) {
            incrementEnergy(energy);

            for (let i = 0; i < energy.length; i++) {
                for (let j = 0; j < energy[i].length; j++) {
                    if (energy[i][j] > 9) flashes += flash(energy, i, j);
                }
            }
        }

        console.log("Result - p1: " + flashes);
        return flashes;
    }

    function runP2() {
        const energy = parseInput();

        let flashes = 0;
        let step = 0;
        while (++step) {
            incrementEnergy(energy);

            let stepFlashes = flashes;
            for (let i = 0; i < energy.length; i++) {
                for (let j = 0; j < energy[i].length; j++) {
                    if (energy[i][j] > 9) flashes += flash(energy, i, j);
                }
            }

            stepFlashes = flashes - stepFlashes;
            if (stepFlashes === energy.length * energy[0].length) {
                console.log("Result - p2: " + step);
                return step;
            }
        }
    }

    function parseInput() {
        const energy = Array(10);
        input.split("\n").forEach((line, i) => {
            for (let j = 0; j < line.length; j++) {
                if (!energy[i]) energy[i] = [];
                energy[i].push(parseInt(line[j], 10));
            }
        });
        return energy;
    }

    function incrementEnergy(energy) {
        for (let i = 0; i < energy.length; i++) {
            for (let j = 0; j < energy[i].length; j++) {
                energy[i][j]++;
            }
        }
    }

    function flash(energy, i, j) {
        energy[i][j] = 0;
        let flashes = 1;

        if (i > 0) {
            flashes += incrementNeighbor(energy, i - 1, j);
            if (j > 0) flashes += incrementNeighbor(energy, i - 1, j - 1);
            if (j < energy[i].length - 1) flashes += incrementNeighbor(energy, i - 1, j + 1);
        }

        if (i < energy.length - 1) {
            flashes += incrementNeighbor(energy, i + 1, j);
            if (j > 0) flashes += incrementNeighbor(energy, i + 1, j - 1);
            if (j < energy[i].length - 1) flashes += incrementNeighbor(energy, i + 1, j + 1);
        }

        if (j > 0) flashes += incrementNeighbor(energy, i, j - 1);
        if (j < energy[i].length - 1) flashes += incrementNeighbor(energy, i, j + 1);

        return flashes;

        function incrementNeighbor(energy, i, j) {
            if (energy[i][j] !== 0) energy[i][j]++;
            if (energy[i][j] > 9) return flash(energy, i, j);
            return 0;
        }
    }
}