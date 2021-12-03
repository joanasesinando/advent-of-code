function runDay1(input) {
    input = input.split("\n").map((n) => parseInt(n, 10));

    const res1 = runP1();
    const res2= runP2();
    showAlert("success", "Result - p1: " + res1 + "<br>Result - p2: " + res2);

    function runP1() {
        let res = 0, previous = null;
    
        input.forEach((n) => {
            if (previous && n > previous) res++;
            previous = n;
        });

        console.log("Result - p1: " + res);
        return res;
    }
    
    function runP2() {          
        let res = 0, previous = null;
    
        input.forEach((n, i, arr) => {
            if (i > arr.length - 3) return;
    
            const total = n + arr[i + 1] + arr[i + 2];
    
            if (previous && total > previous) res++;
            previous = total;
        });

        console.log("Result - p2: " + res);
        return res;
    }
}