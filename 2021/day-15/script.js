function run_2021_15(input) {
    showAlert("success", "Result - p1: " + runP1() + "<br>Result - p2: " + runP2());

    function runP1() {
        const graph = parseInput();
        const res = runDijkstra(graph);

        console.log("Result - p1: " + res);
        return res;
    }

    function runP2() { 
        input = repeatInput(5); 
        const graph = parseInput();
        const res = runDijkstra(graph);

        console.log("Result - p2: " + res);
        return res;
    }

    function parseInput() {
        const graph = {}
        input.split("\n").forEach((line, l, array) => {
            const len = line.length;

            for (let c = 0; c < len; c++) {
                const id = l + "-" + c;
                if (l > 0) updateGraph(graph, id, { id: (l - 1) + "-" + c, dist: parseInt(array[l - 1][c], 10) }); // top
                if (l < len - 1) updateGraph(graph, id, { id: (l + 1) + "-" + c, dist: parseInt(array[l + 1][c], 10) }); // bottom
                if (c > 0) updateGraph(graph, id, { id: l + "-" + (c - 1), dist: parseInt(array[l][c - 1], 10) }); // left
                if (c < len - 1) updateGraph(graph, id, { id: l + "-" + (c + 1), dist: parseInt(line[c + 1], 10) }); // right
            }
        });

        return graph;

        function updateGraph(graph, id, neighbor) {
            if (graph[id]) graph[id].addNeighbor(neighbor);
            else graph[id] = new Node(id, neighbor, Number.MAX_SAFE_INTEGER);
        }
    }

    function repeatInput(times) {
        const lines = input.split("\n");
        const tileSize = lines[0].length;

        let rightTimes = times;
        while (--rightTimes > 0) {

            // Extend to the right
            for (let l = 0; l < lines.length; l++) {
                let line = lines[l];
                const start = (line.length / tileSize - 1) * tileSize;

                for (let i = start; i < start + tileSize; i++) {
                    let val = parseInt(line[i], 10) + 1;
                    if (val > 9) val = 1;
                    line = line.concat(val);
                }
                lines[l] = line;
            }
        }

        let downTimes = times;
        while (--downTimes > 0) {

            // Extend to the bottom
            const start = (lines.length / tileSize - 1) * tileSize;
            for (let l = start; l < start + tileSize; l++) {
                const line = lines[l];
                lines.push("");
                const lastIndex = lines.length - 1;

                for (let i = 0; i < line.length; i++) {
                    let val = parseInt(line[i], 10) + 1;
                    if (val > 9) val = 1;
                    lines[lastIndex] = lines[lastIndex].concat(val);
                }
            }
        }

        return lines.join("\n");
        
    }

    function runDijkstra(graph) {
        const maxLen = Math.sqrt(Object.keys(graph).length);
        const dest = (maxLen - 1) + "-" + (maxLen - 1);

        // Initialization
        const source = "0-0";
        graph[source].setValue(0);
        const queue = [source];
        const visited = new Set();
        
        // Running
        while (current = queue.shift()) {
            const unvisitedNeighbors = graph[current].getNeighbors().filter(neighbor => !visited.has(neighbor.id));

            let needsSorting = false;
            for (const neighbor of unvisitedNeighbors) {
                const dist = graph[current].getValue() + neighbor.dist;
                if (dist < graph[neighbor.id].getValue()) {
                    graph[neighbor.id].setValue(dist);
                    needsSorting = true;
                    if (!queue.includes(neighbor.id)) queue.push(neighbor.id);
                }
            }

            if (needsSorting) queue.sort((a, b) => graph[a].getValue() - graph[b].getValue());
            if (current === dest || queue[0] && graph[dest].getValue() < graph[queue[0]].getValue()) break;

            visited.add(current);
        }

        return graph[dest].getValue();
    }
}

class Node {
    constructor(id, neighbor, value) {
        this.id = id;
        this.neighbors = [neighbor];
        this.value = value;
    }

    getValue() {
        return this.value;
    }

    setValue(val) {
        this.value = val;
    }

    getNeighbors() {
        return this.neighbors;
    }

    addNeighbor(neighbor) {
        this.neighbors.push(neighbor);
    }
}