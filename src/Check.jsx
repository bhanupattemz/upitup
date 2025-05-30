const templates = {
    shapec: [[0, 1], [0, 2], [0, 0], [1, 0], [2, 0], [2, 1], [2, 2]],
    shapeh: [[0, 0], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 2]],
    shapei: [[0, 0], [0, 1], [0, 2], [1, 1], [2, 0], [2, 1], [2, 2]],
    shapej: [[0, 0], [0, 1], [0, 2], [1, 1], [2, 0], [2, 1]],
    shapek: [[0, 0], [0, 2], [1, 0], [1, 1], [2, 0], [2, 2]],
    shapel: [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]],
    shapeo: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2]],
    shapet: [[0, 0], [0, 1], [0, 2], [1, 1], [2, 1]],
    shapeu: [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [1, 2], [0, 2]],
    shapev: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 1]],
    shapex: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
    shapey: [[0, 0], [0, 2], [1, 1], [2, 1]]
}
const CheckSolution = (grid, n, shape) => {
    const solvedCubes = templates[shape];
    const solvedSet = new Set(solvedCubes.map(([r, c]) => `${r},${c}`));

    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            const cell = grid[row][col];
            const key = `${row},${col}`;

            if (solvedSet.has(key)) {
                if (!cell || cell.nums[1] !== 3) return false;
            } else {
                if (cell && cell.nums[1] === 3) return false;
            }
        }
    }
    return true;
};

const SolveNum = (grid, n) => {
    let num = 0
    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            if (!grid[row][col]) continue
            if (grid[row][col].nums[1] == 3) {
                num += 1
            }
        }
    }
    return num

}
export { CheckSolution, SolveNum }