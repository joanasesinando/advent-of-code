function run_2021_14(input) {
    const parsedInput = parseInput();
    const template = parsedInput.template;
    const rules = parsedInput.rules;

    showAlert("success", "Result - p1: " + runP1() + "<br>Result - p2: " + runP2());

    function runP1() {
        const pairs = runProcess(template, 10);
        const minMax = getMinMax(pairs);
        const res = minMax.max - minMax.min;

        console.log("Result - p1: " + res);
        return res;
    }

    function runP2() {        
        const pairs = runProcess(template, 40);
        const minMax = getMinMax(pairs);
        const res = minMax.max - minMax.min;

        console.log("Result - p2: " + res);
        return res;
    }

    function parseInput() {
        let template, rules = {};
        input.split("\n").forEach((line, i) => {
            if (i === 0) template = line;
            else if (line) {
                const parts = line.split(" -> ");
                rules[parts[0]] = parts[1];
            }
        });
        return {template, rules};
    }

    function runProcess(polymer, nrSteps) {
        let pairs = {};
        for (let i = 0; i < polymer.length - 1; i++) {
            incrementObject(pairs, polymer[i] + polymer[i + 1]);
        }

        for (let step = 1; step <= nrSteps; step++) {
            const newPairs = {};
            for (const pair in pairs) {
                const c1 = pair[0];
                const c2 = pair[1];

                const rule = rules[pair];
                if (rule) {
                    incrementObject(newPairs, c1 + rule, pairs[pair]);
                    incrementObject(newPairs, rule + c2, pairs[pair]);

                } else {
                    incrementObject(newPairs, pair, pairs[pair]);
                }
            }
            pairs = newPairs;
        }

        return pairs;
    }

    function incrementObject(obj, key, value = 1) {
        if (!obj[key]) obj[key] = 0;
        obj[key] += value;
    }

    function getMinMax(pairs) {
        const count = countElements(pairs);
        let min = Number.MAX_SAFE_INTEGER, max = 0;

        for (const element in count) {
            const value = count[element];
            if (value < min) min = value;
            if (value > max) max = value;
        }
        return {min: Math.ceil(min / 2), max: Math.ceil(max / 2)};
    }

    function countElements(pairs) {
        const count = {};
        for (const pair in pairs) {
            const value = pairs[pair];
            incrementObject(count, pair[0], value);
            incrementObject(count, pair[1], value);
        }
        return count;
    }
}