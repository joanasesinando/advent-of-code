function runDay3(input) {
    input = input.split("\n");

    const res1 = runP1();
    const res2 = runP2();
    showAlert("success", "Result - p1: " + res1 + "<br>Result - p2: " + res2);

    function runP1() {
        let count;
        const len = input[0].length;
        let gamma = epsilon = "";

        for (let pos = 0; pos < len; pos++) {
            count = [0, 0];
            input.forEach(el => el[pos] === "0" ? count[0]++ : count[1]++);

            gamma = gamma.concat(count[0] >= count[1] ? "0" : "1");
            epsilon = epsilon.concat(count[0] >= count[1] ? "1" : "0");
        }

        gamma = parseInt(gamma, 2);
        epsilon = parseInt(epsilon, 2);

        console.log("Result - p1: " + gamma * epsilon);
        return gamma * epsilon;
    }
    
    function runP2() { 
        let countO2, countCO2;
        const len = input[0].length;

        let O2 = [...input];
        let CO2 = [...input];

        for (let pos = 0; pos < len; pos++) {
            countO2 = [0, 0];
            countCO2 = [0, 0];

            O2.forEach(el => el[pos] === "0" ? countO2[0]++ : countO2[1]++);
            CO2.forEach(el => el[pos] === "0" ? countCO2[0]++ : countCO2[1]++);

            if (O2.length > 1) O2 = O2.filter(el => countO2[0] > countO2[1] ? el[pos] === "0" : el[pos] === "1");
            if (CO2.length > 1) CO2 = CO2.filter(el => countCO2[0] > countCO2[1] ? el[pos] === "1" : el[pos] === "0");
        }

        O2 = parseInt(O2, 2);
        CO2 = parseInt(CO2, 2);

        console.log("Result - p2: " + O2 * CO2);
        return O2 * CO2;
    }
}