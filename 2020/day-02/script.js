function run_2020_02(input) {
    let list;
    showAlert("success", "Result - p1: " + runP1() + "<br>Result - p2: " + runP2());

    function runP1() {
        parseInput();
        let res = 0;

        list.forEach(line => {
            const min = parseInt(line.split(" ")[0].split("-")[0], 10);
            const max = parseInt(line.split(" ")[0].split("-")[1], 10);
            const letter = line.split(" ")[1][0];
            const password = line.split(" ")[2];

            const count = password.split(letter).length - 1;
            if (count >= min && count <= max) res++;
        });

        console.log("Result - p1: " + res);
        return res;
    }
    
    function runP2() {  
        parseInput();        
        let res = 0;

        list.forEach(line => {
            const pos1 = parseInt(line.split(" ")[0].split("-")[0], 10) - 1;
            const pos2 = parseInt(line.split(" ")[0].split("-")[1], 10) - 1;
            const letter = line.split(" ")[1][0];
            const password = line.split(" ")[2];

            if ((password[pos1] === letter || password[pos2] === letter) && (password[pos1] !== password[pos2])) res++;
        });

        console.log("Result - p2: " + res);
        return res;
    }

    function parseInput() {
        list = input.split("\n");
    }
}