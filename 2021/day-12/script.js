function run_2021_12(input) {
    const map = parseInput();
    showAlert("success", "Result - p1: " + runP1() + "<br>Result - p2: " + runP2());

    function runP1() {
        const res = getAllPaths("p1").length;
        console.log("Result - p1: " + res);
        return res;
    }

    function runP2() {
        const res = getAllPaths("p2").length;
        console.log("Result - p2: " + res);
        return res;
    }

    function parseInput() {
        const map = {};
        const lines = input.split("\n");
        lines.forEach(line => {
            const parts = line.split("-");
            if (!map[parts[0]]) map[parts[0]] = [];
            if (!map[parts[1]]) map[parts[1]] = [];
            map[parts[0]].push(parts[1]);
            map[parts[1]].push(parts[0]);
        });
        return map;
    }

    function getAllPaths(part) {
        return part === "p1" ? buildPathP1(["start"]) : buildPathP2(["start"]);
    }

    function buildPathP1(path) {
        const last = path[path.length - 1];
        if (last === "end") return [path];

        const options = map[last].filter(option => !isLowercase(option) || !path.includes(option));
        if (options.length === 0) return null;

        let paths = [];
        for (const option of options) {
            const newPath = buildPathP1([...path, option]);
            if (newPath) paths = paths.concat(newPath);
        }
        return paths;
    }

    function buildPathP2(path) {
        const last = path[path.length - 1];
        if (last === "end") return [path];

        const isSaturated = isSmallCaveSaturated(path);
        const options = map[last].filter(option => !isLowercase(option) || (option !== "start" && (!isSaturated || !path.includes(option))));
        if (options.length === 0) return null;

        let paths = [];
        for (const option of options) {
            const newPath = buildPathP2([...path, option]);
            if (newPath) paths = paths.concat(newPath);
        }
        return paths;
    }

    function isLowercase(char) {
        return char.match(/[a-z]/g)?.length > 0;
    }

    function isSmallCaveSaturated(path) {
        const count = {};
        for (const cave of path) {
            if (isLowercase(cave)) {
                if (!count[cave]) count[cave] = 0;
                if (++count[cave] === 2) return true;
            }
        }
        return false;
    }
}