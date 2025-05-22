const wait = (num) => {
    return new Promise(resolve => setTimeout(resolve, num));
};
const up = async (row, col, grid, setGrid, animate = true) => {
    const cubeRef = grid[row][col]?.ref?.current;
    if (cubeRef && animate) {
        const audio = new Audio('/drop-sound.mp3');
        audio.play();
        await wait(50)
        const originalTransform = cubeRef.style.transform;
        cubeRef.style.transition = "transform 0.6s ease-in-out";
        cubeRef.style.transform = `rotateX(90deg) rotateY(-10deg) translateY(-300px)`;
        await wait(350);
        cubeRef.style.transition = "none";
        cubeRef.style.transform = originalTransform || `rotateX(10deg) rotateY(-10deg) translateY(0px)`;
    }

    setGrid(prev => {
        const newGrid = prev.map(r => r.map(cell => (cell ? { ...cell } : null)))
        const cube = newGrid[row][col]
        if (!cube) return prev
        ["left", "top", "right", "bottom", "front", "back"]
        const newNums = [cube.nums[0], cube.nums[4], cube.nums[2], cube.nums[5], cube.nums[3], cube.nums[1]]
        const newImages = [cube.images[0], cube.images[4], cube.images[2], cube.images[5], cube.images[3], cube.images[1]]
        newGrid[row][col] = {
            ...cube,
            nums: newNums,
            images: newImages
        }
        return newGrid
    })
}

const down = async (row, col, grid, setGrid, animate = true) => {
    const cubeRef = grid[row][col]?.ref?.current;
    if (cubeRef && animate) {
        const audio = new Audio('/drop-sound.mp3');
        audio.play();
        await wait(50)
        const originalTransform = cubeRef.style.transform;
        cubeRef.style.transition = "transform 0.6s ease-in-out";
        cubeRef.style.transform = `rotateX(-90deg) rotateY(-10deg) translateY(300px)`;
        await wait(350);
        cubeRef.style.transition = "none";
        cubeRef.style.transform = originalTransform || `rotateX(10deg) rotateY(-10deg) translateY(0px)`;
    }

    setGrid(prev => {
        const newGrid = prev.map(r => r.map(cell => (cell ? { ...cell } : null)))
        const cube = newGrid[row][col]
        if (!cube) return prev

        const newNums = [cube.nums[0], cube.nums[5], cube.nums[2], cube.nums[4], cube.nums[1], cube.nums[3]]
        const newImages = [cube.images[0], cube.images[5], cube.images[2], cube.images[4], cube.images[1], cube.images[3]]

        newGrid[row][col] = {
            ...cube,
            nums: newNums,
            images: newImages
        }

        return newGrid
    })
}

const left = async (row, col, grid, setGrid, animate = true) => {
    const cubeRef = grid[row][col]?.ref?.current;
    if (cubeRef && animate) {
        const audio = new Audio('/drop-sound.mp3');
        audio.play();
        await wait(50)
        const originalTransform = cubeRef.style.transform;
        cubeRef.style.transition = "transform 0.6s ease-in-out";
        cubeRef.style.transform = `rotateX(0deg) rotateY(-90deg) translateX(-300px)`;
        await wait(350);
        cubeRef.style.transition = "none";
        cubeRef.style.transform = originalTransform || `rotateX(10deg) rotateY(-10deg) translateY(0px)`;
    }

    setGrid(prev => {
        const newGrid = prev.map(r => r.map(cell => (cell ? { ...cell } : null)))
        const cube = newGrid[row][col]
        if (!cube) return prev
        const newNums = [cube.nums[1], cube.nums[2], cube.nums[3], cube.nums[0], cube.nums[4], cube.nums[5]]
        const newImages = [cube.images[1], cube.images[2], cube.images[3], cube.images[0], cube.images[4], cube.images[5]]
        newGrid[row][col] = {
            ...cube,
            nums: newNums,
            images: newImages
        }
        return newGrid
    })
}

const right = async (row, col, grid, setGrid, animate = true) => {
    const cubeRef = grid[row][col]?.ref?.current;
    if (cubeRef && animate) {
        const audio = new Audio('/drop-sound.mp3');
        audio.play();
        await wait(50)
        const originalTransform = cubeRef.style.transform;
        cubeRef.style.transition = "transform 0.6s ease-in-out";
        cubeRef.style.transform = `rotateX(0deg) rotateY(90deg) translateX(300px)`;
        await wait(350);
        cubeRef.style.transition = "none";
        cubeRef.style.transform = originalTransform || `rotateX(10deg) rotateY(-10deg) translateX(0px)`;
    }

    setGrid(prev => {
        const newGrid = prev.map(r => r.map(cell => (cell ? { ...cell } : null)))
        const cube = newGrid[row][col]
        if (!cube) return prev

        const newNums = [cube.nums[3], cube.nums[0], cube.nums[1], cube.nums[2], cube.nums[4], cube.nums[5]]
        const newImages = [cube.images[3], cube.images[0], cube.images[1], cube.images[2], cube.images[4], cube.images[5]]

        newGrid[row][col] = {
            ...cube,
            nums: newNums,
            images: newImages
        }

        return newGrid
    })
}

export { left, right, up, down }