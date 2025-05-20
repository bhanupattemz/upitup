import { up, down, left, right } from "./RollFunctions"
import { CheckSolution } from "./Check";
const Solution = async (grid, setGrid, n, gridRef, SetSteps, prevMoves) => {

    const wait = (num) => {
        return new Promise(resolve => setTimeout(resolve, num));
    };

    const directions = [
        { nums: [-1, 0], fun: up },
        { nums: [1, 0], fun: down },
        { nums: [0, -1], fun: left },
        { nums: [0, 1], fun: right }
    ]
    const roll = async (rowInx, colInx, animate = true) => {
        const currentGrid = gridRef.current;
        try {
            SetSteps(prev => prev + 1)
            let moved = false;
            for (let { nums: [dx, dy], fun } of directions) {
                const newRow = rowInx + dx;
                const newCol = colInx + dy;
                if (
                    newRow >= 0 && newRow < n &&
                    newCol >= 0 && newCol < n &&
                    currentGrid[newRow][newCol] === null
                ) {
                    await fun(rowInx, colInx, currentGrid, setGrid, animate);
                    setGrid(prev => {
                        const newGrid = prev.map(row => row.map(cell => (cell ? { ...cell } : null)));
                        const cube = newGrid[rowInx][colInx];

                        newGrid[newRow][newCol] = cube;
                        newGrid[rowInx][colInx] = null;

                        return newGrid;
                    });

                    moved = true;
                    break;
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
    // let mid = [1, 1]
    // let copyGrid = [...grid]
    // const solution = getSolution(copyGrid, n, mid, 50);
    prevMoves.reverse()
    let solution = [[2, 1], [2, 0], [1, 0], [1, 1], [1, 2], [0, 2], [0, 1], [0, 0], [1, 0], [1, 1], [0, 1], [0, 2], [1, 2], [1, 1], [0, 1], [0, 0], [1, 0], [1, 1], [0, 1], [0, 2], [1, 2], [2, 2], [2, 1], [1, 1], [1, 0], [2, 0], [2, 1], [1, 1], [1, 0], [0, 0], [0, 1], [1, 1], [1, 2], [0, 2], [0, 1], [1, 1]]
    
    for (let data of prevMoves) {
        roll(data[0], data[1], false)
        await wait(100)
    }
    SetSteps(prev=>0)
    for (let data of solution) {
        roll(data[0], data[1])
        await wait(500)
    }
}
const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
const deepCopyGrid = (grid) => {
    return grid.map(row => row.map(cell => {
        if (!cell) return null;
        return {
            ...cell,
            nums: [...cell.nums],
        };
    }));
};

const rotateCube = (nums, direction) => {
    const [left, top, right, bottom, front, back] = nums.slice();
    if (direction[0] === -1) {
        return [left, front, right, back, bottom, top];
    } else if (direction[0] === 1) {
        return [left, back, right, front, top, bottom];
    } else if (direction[1] === -1) {
        return [top, right, bottom, left, front, back];
    } else if (direction[1] === 1) {
        return [bottom, left, top, right, front, back];
    }
    return nums;
};

const getSolution = (grid, n, mid, maxDepth = 50) => {
    const visited = new Set();

    const dfs = (grid, path, depth, mid) => {
        if (depth > maxDepth) return null;

        const key = JSON.stringify(grid.map(row =>
            row.map(cell => (cell ? cell.nums.join('') : null))
        ));
        if (visited.has(key)) return null;
        visited.add(key);

        if (CheckSolution(grid, n)) return [...path];

        for (const dir of directions) {
            const [dx, dy] = dir;
            const newRow = mid[0] + dx;
            const newCol = mid[1] + dy;

            if (newRow < 0 || newRow >= n || newCol < 0 || newCol >= n) continue;
            if (!grid[newRow][newCol]) continue;

            const newGrid = deepCopyGrid(grid);
            const movingCube = newGrid[newRow][newCol];
            movingCube.nums = rotateCube(movingCube.nums, dir);
            newGrid[mid[0]][mid[1]] = movingCube;
            newGrid[newRow][newCol] = null;

            const result = dfs(newGrid, [...path, [newRow, newCol]], depth + 1, [newRow, newCol]);
            if (result) return result;
        }

        return null;
    };

    return dfs(grid, [], 0, mid) || [];
};


export { Solution }