function run_2020_07(input) {
    const rules = parseInput(input);
    showAlert("success", "Result - p1: " + runP1() + "<br>Result - p2: " + runP2());

    function runP1() {
        let res = [];
        searchOuter("shiny_gold", rules, res);

        console.log("Result - p1: " + res.length);
        return res.length;
    }
    
    function runP2() {          
        let res = searchInner("shiny_gold", rules, 0);

        console.log("Result - p2: " + res);
        return res;
    }

    function parseInput(input) {
        let rules = {};

        const lines = input.split("\n");
        lines.forEach(line => {

            const parsed = line
                .split(/bags*/g)
                .map(str => str.replace(/\s*([,.]|contain)\s*|^\s*|\s*$/g, ""))
                .filter(str => !!str);

            const type = parsed[0].split(" ").join("_");
            
            parsed.slice(1).forEach(rule => {
                const parts = rule.split(" ");
                const qt = parts[0] === "no" ? 0 : parseInt(parts[0], 10);
                const bagType = parts.slice(1).join("_");

                if (!rules[type]) rules[type] = {};
                if (qt !== 0) rules[type][bagType] = qt;
            });
        });

        return rules;
    }

    function searchOuter(type, rules, res) {
        if (Object.keys(rules).length === 0) return false;
        
        for (const key in rules) {
            if (Number.isInteger(rules[key]) && key === type) return true;

            if (!Number.isInteger(rules[key]) && searchOuter(type, rules[key], res) && !res.includes(key)) {
                res.push(key);
                searchOuter(key, rules, res);
            }
        }
        return false;
    }

    function searchInner(type, rules, res) {
        if (rules.hasOwnProperty(type)) {
            if (Object.keys(rules).length === 0) return 0;

            for (const key in rules[type]) {
                res += rules[type][key] + rules[type][key] * searchInner(key, rules, 0);
            }
        }
        return res;
    }
}