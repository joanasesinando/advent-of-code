function run_2021_08(input) {
    const notes = parseInput();
    showAlert("success", "Result - p1: " + runP1() + "<br>Result - p2: " + runP2());

    function runP1() {
        let res = 0;
        notes.forEach(note => {
            note.output.forEach(val => {
                const len = val.length;
                if (len === 2 || len === 4 || len === 3 || len === 7)
                    res++;
            });
        });

        console.log("Result - p1: " + res);
        return res;
    }

    function runP2() {
        const keys = {
            0: "abcefg",
            1: "cf",
            2: "acdeg",
            3: "acdfg",
            4: "bcdf",
            5: "abdfg",
            6: "abdefg",
            7: "acf",
            8: "abcdefg",
            9: "abcdfg"
        };

        const commonBetween = {
            5: "adg",
            6: "abfg"
        };

        let res = 0;

        notes.forEach(note => {
            const config = {
                a: "abcdefg",
                b: "abcdefg",
                c: "abcdefg",
                d: "abcdefg",
                e: "abcdefg",
                f: "abcdefg",
                g: "abcdefg"
            };

            let done_5 = false;
            let done_6 = false;

            // Find correct configuration
            for (let i = 0; i < 10; i++) {
                const pattern = note.patterns[i];
                const len = pattern.length;

                const matching = [];
                if (len === 2) matching.push(1);
                else if (len === 3) matching.push(7);
                else if (len === 4) matching.push(4);
                else if (len === 5) matching.push(2, 3, 5);
                else if (len === 6) matching.push(0, 6, 9);
                else if (len === 7) matching.push(8);

                const code = matching.length === 1 ? pattern : findCommon(findCommon(pattern, note.patterns[i + 1]), note.patterns[i + 2]);
                const options = matching.length === 1 ? keys[matching[0]] : len === 5 ? commonBetween[5] : commonBetween[6];
                reduce(code, options, config);

                if (i === 3) i = 5;
                else if (i === 6) break;
            }

            // Decode digits
            let num = "";
            note.output.forEach(code => {
                for (let i = 0; i < code.length; i++) {
                    code = code.replace(code[i], config[code[i]]);
                }
                code = code.split("").sort((a, b) => a.localeCompare(b)).join("");

                for (const key of Object.keys(keys)) {
                    if (keys[key] === code) {
                        num = num.concat(key);
                        break;
                    }
                }
            });

            // Sum 
            res += parseInt(num, 10);    
        });

        console.log("Result - p2: " + res);
        return res;
    }

    function parseInput() {
        const notes = [];
        input.split("\n").forEach(line => {
            const parts = line.split("|");
            notes.push({ 
                patterns: parts[0].split(" ").filter(part => !!part).sort((a, b) => a.length - b.length), 
                output: parts[1].split(" ").filter(part => !!part)
            });
        });
        return notes;
    }

    function reduce(code, options, config) {
        for (let i = 0; i < code.length; i++) {
            config[code[i]] = findCommon(config[code[i]], options);
            if (config[code[i]].length === 1) clean(config[code[i]], config);
        }
    }

    function findCommon(str1, str2) {
        const big = str1.length > str2.length ? str1 : str2;
        const small = str1.length > str2.length ? str2 : str1;

        let res = "";
        for (let i = 0; i < big.length; i++) {
            if (small.includes(big[i])) res = res.concat(big[i]);
        }
        return res;
    }

    function clean(letter, config) {
        for (const key of Object.keys(config)) {
            if (config[key].length !== 1) {
                config[key] = config[key].replace(letter, "");
                if (config[key].length === 1) clean(config[key], config);
            }
        }
    }
}