const CheckSolution = (grid, n) => {
    
    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            if(!grid[row][col]) continue
            if (grid[row][col].nums[1] != 3) {
                return false
            }
        }
    }
    return true
}

const SolveNum=(grid,n)=>{
    let num=0
    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            if(!grid[row][col]) continue
            if (grid[row][col].nums[1] == 3) {
                num+=1
            }
        }
    }
    return num

}
export { CheckSolution,SolveNum }