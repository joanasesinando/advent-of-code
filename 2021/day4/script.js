function runDay4(input) {
    let order, boards;

    showAlert("success", "Result - p1: " + runP1() + "<br>Result - p2: " + runP2());

    function runP1() {
        parseInput(input);
        let sumUnmarked = sumOfBoards();

        for (const num of order) {
            const winners = markNumber(num, sumUnmarked);

            if (winners.length > 0) {
                const first = winners[0];
                console.log("Result - p1: " + first.sum * first.num);
                return first.sum * first.num;
            }
        }
    }
    
    function runP2() { 
        parseInput(input);
        let sumUnmarked = sumOfBoards();
        let boardWinners = Array.from(Array(boards.length), x => false);
        let last;

        for (const num of order) {
            const winners = markNumber(num, sumUnmarked);

            if (winners.length > 0) {
                winners.forEach(winner => {
                    if (!boardWinners[winner.pos]) {
                        boardWinners[winner.pos] = winner;
                        last = winner;
                    }
                });

                if (boardWinners.filter(val => !!val).length === boards.length) {
                    console.log("Result - p2: " + last.sum * last.num);
                    return last.sum * last.num;
                }
            }
        }
    }

    function parseInput(input) {
        let lines = input.split("\n");
        order = lines[0].split(",").map(n => parseInt(n, 10));
        
        lines = lines.slice(2);
        boards = [];
        for (let i = 0, j = 0; i < lines.length; i++) {
            let line = lines[i];
            if (!line) {
                j++;
                continue;
            }

            line = line.split(/\s+/g).filter(n => !!n).map(n => parseInt(n, 10));
            boards[j] ? boards[j].push(line) : boards[j] = [line];
        }
    }

    function sumOfBoards() {
        const sumUnmarked = {};
        boards.forEach((board, pos) => {
            let sum = 0;
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[0].length; j++) {
                    sum += board[i][j];
                }
            }
            sumUnmarked[pos] = sum;
        });
        return sumUnmarked;
    }

    function markNumber(num, sumUnmarked) {
        let winners = [];
        
        for (let pos = 0; pos < boards.length; pos++) {
            const board = boards[pos];
            let marked = false;

            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[0].length; j++) {
                    if (board[i][j] === num) {
                        board[i][j] = "X";
                        sumUnmarked[pos] -= num;

                        if (isWinner(pos, i, j)) winners.push({ sum: sumUnmarked[pos], num, pos });

                        marked = true;
                        break;
                    }
                }

                if (marked) break;
            }
        }
        return winners;
    }

    function isWinner(pos, r, c) {
        const board = boards[pos];
        let marked = 0;

        for (let i = 0; i < board[r].length; i++) {
            if (board[r][i] === "X") marked++;
        }
        if (marked === board[r].length) return true;

        marked = 0;
        for (let i = 0; i < board.length; i++) {
            if (board[i][c] === "X") marked++;
        }
        if (marked === board.length) return true;

        return false;
    }
}