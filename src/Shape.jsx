import './App.css'
import { useState, useRef, createRef, useEffect } from "react"
import { CheckSolution, SolveNum } from "./Check"
import Timer from './Timer';
import { Solution } from "./Solution"
import { up, down, left, right } from "./RollFunctions"
import { useParams } from "react-router-dom"
const blankImg = "/blank.png";
const bottomImg = "/bottom.png";
const topImg = "/top.png";

const levelsData = [
  "shapec",
  "shapeu",
  "shapev",
  "shapej",
  "shapek",
  "shapel",
  "shapex",
  "shapeh",
  "shapei",
  "shapet",
  "shapey",
  "shapeo"
];


function App() {
  const n = 3
  const tempGrid = []
  const params = useParams()
  const [level, setLevel] = useState(parseInt(params.level))
  const [shape, setShape] = useState("shapec")
  const [mode, setMode] = useState("")
  const screenWidth = window.screen.width;
  const [prevMoves, setPrevMoves] = useState([])
  const [time, setTime] = useState(0);
  const [steps, SetSteps] = useState(0)
  const [finalTime, setFinalTime] = useState(0)
  const [loading, setLoading] = useState(false)
  const [score, setScore] = useState(0)
  const [open, setOpen] = useState(false)
  const [solved, setSolved] = useState(false)
  const [isRunning, setIsRunning] = useState(true);
  const [undoCount, setUndoCount] = useState(-1)
  const cellRefs = useRef(Array(n).fill().map(() => Array(n).fill().map(() => createRef())));


  for (let row = 0; row < n; row++) {
    const currentRow = []
    for (let col = 0; col < n; col++) {
      if (row === Math.floor(n / 2) && col === Math.floor(n / 2)) {
        currentRow.push(null)
      } else {
        currentRow.push({
          ref: cellRefs.current[row][col],
          nums: [0, 1, 2, 3, 4, 5],
          structure: ["left", "top", "right", "bottom", "front", "back"],
          images: [blankImg, topImg, blankImg, bottomImg, blankImg, blankImg]
        })
      }
    }
    tempGrid.push(currentRow)
  }

  const [grid, setGrid] = useState(tempGrid)
  const gridRef = useRef(grid);


  const directions = [
    { nums: [-1, 0], fun: up },
    { nums: [1, 0], fun: down },
    { nums: [0, -1], fun: left },
    { nums: [0, 1], fun: right }
  ]
  function getplayerScore(timeInSeconds, steps) {
    const basePoints = n * 300
    const solvedCount = SolveNum(grid, n)
    const gridSizeFactor = n / 4
    const timePenalty = 1
    const stepPenalty = 10
    const totalScore = (basePoints * solvedCount * gridSizeFactor) - (timeInSeconds * timePenalty) - (steps * stepPenalty)
    return Math.max(0, totalScore)
  }

  const roll = async (rowInx, colInx) => {
    if (loading || !grid[rowInx][colInx]) return;
    setLoading(true);

    try {
      SetSteps(prev => prev + 1)
      let moved = false;

      for (let { nums: [dx, dy], fun } of directions) {
        const newRow = rowInx + dx;
        const newCol = colInx + dy;

        if (
          newRow >= 0 && newRow < n &&
          newCol >= 0 && newCol < n &&
          grid[newRow][newCol] === null
        ) {
          setPrevMoves(prev => [...prev, [newRow, newCol]])
          await fun(rowInx, colInx, grid, setGrid);

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
    } finally {
      setLoading(false);
    }
  }
  const formatTime = (timeInSeconds) => {
    const hours = String(Math.floor(timeInSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(timeInSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    gridRef.current = grid;
    let gridSolved = CheckSolution(grid, n, shape)
    if (gridSolved) {
      setIsRunning(false)
    }
    if (gridSolved && !solved) {

      setScore(prev => getplayerScore(time, steps))
      setFinalTime(time)
      setOpen(true)
      console.log("Successfully solved :", getplayerScore(time, steps))
    }
  }, [grid])
  useEffect(() => {
    if (level < 1) {
      window.location.href = "/puzzle/1"
    }
    if (level > 12) {
      window.location.href = "/puzzle/12"
    }
    if (level < 4) {
      setMode("Easy")
    } else if (level < 7) {
      setMode("Medium")
      setUndoCount(10)
    } else if (level < 10) {
      setMode("Hard")
      setUndoCount(5)
    } else {
      setMode("Expert")
      setUndoCount(0)
    }
    setShape(levelsData[level - 1])
  }, [level])
  return (
    <>
      {open && <div className="win-popup">
        <div className="win-popup-content">

          <div className="win-popup-confetti-container">
            {[...Array(30)].map((_, i) => <div key={i} className="win-popup-confetti"></div>)}
          </div>
          <div className="win-popup-stars">
            <div className="win-popup-star win-popup-star-1">⭐</div>
            <div className="win-popup-star win-popup-star-2">🌟</div>
            <div className="win-popup-star win-popup-star-3">✨</div>
          </div>

          <div className="win-popup-header">
            <h1>🎉 YOU WIN! 🎉</h1>
            <div className="win-popup-trophy">🏆</div>
          </div>

          <div className="win-popup-stats">
            <div className="win-popup-stat-box">
              <div className="win-popup-stat-icon">⏱️</div>
              <div className="win-popup-stat-value">{formatTime(finalTime)}</div>
              <div className="win-popup-stat-label">Time</div>
            </div>

            <div className="win-popup-stat-box win-popup-main-stat">
              <div className="win-popup-stat-icon">⭐</div>
              <div className="win-popup-stat-value">{score}</div>
              <div className="win-popup-stat-label">Score</div>
            </div>

            <div className="win-popup-stat-box">
              <div className="win-popup-stat-icon">👟</div>
              <div className="win-popup-stat-value">{steps}</div>
              <div className="win-popup-stat-label">Moves</div>
            </div>
          </div>

          <div className="win-popup-performance-message">
            <div className="win-popup-message-icon">🔔</div>
            <p>You've successfully solved the puzzle — all cubes now show the rat on top and {shape[5].toUpperCase()} alphabet shape!</p>
          </div>

          <div className="win-popup-action-buttons">
            <button className="win-popup-btn win-popup-play-again" onClick={() => window.location.href = `/puzzle/${level}`}>
              Play Again 🔄
            </button>
            {level < levelsData.length && <button className="win-popup-btn win-popup-play-again" onClick={() => window.location.href = `/puzzle/${level + 1}`}>
              Next ⏭️
            </button>}

          </div>

          <div className="win-popup-character-celebration">
            <img
              src="/cat-rat.png"
              alt="Happy Rat"
              className="win-popup-celebrating-character"
            />
            <div className="win-popup-speech-bubble">Woohoo!</div>
          </div>
        </div>
      </div>}
      <main className='main'>
        <div className="floating-shapes">
          <div className="shape circle"></div>
          <div className="shape triangle"></div>
          <div className="shape square"></div>
        </div>
        <h1>
          Level {level} 🧩 {mode} Mode</h1>
        <p>Roll the cubes so that the <span className='highlight'>rat image</span> appears on top, forming a <span className='highlight'>{shape[5].toUpperCase()} alphabet shape!</span></p>

        <section className='result-play-section'>
          <div className="scene">
            <h2>Puzzle Arena</h2>
            <div className="grid" >
              {grid.map((row, rowInx) =>
                row.map((item, colInx) => (
                  <div
                    className="cube"
                    onClick={() => {

                      roll(rowInx, colInx)
                    }}
                    key={`${rowInx}-${colInx}`}
                    ref={item && item.ref}>
                    {item && item.nums?.map((num, ind) => (
                      <div
                        className={`face ${item.structure[ind]}`}
                        key={ind}
                        style={{
                          backgroundImage: `url(${item.images[ind]})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      />
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="result-scene">
            <h2>Target Shape</h2>
            <img className='result-image' src={`/templates/${shape}.png`} alt="result-img" />
          </div>
        </section>
        <div className="puzzle-status">
          <div className="status-item">
            <span className="status-icon">⏱️</span>
            <Timer time={time} setTime={setTime} isRunning={isRunning} />
          </div>
          <div className="status-item">
            <span className="status-icon">🧩</span>
            <span>{steps} Steps</span>
          </div>
        </div>
        <div className="puzzle-controls">
          {level > 1 && <button className="puzzle-btn shuffle-btn" onClick={() => window.location.href = `/puzzle/${level - 1}`}>⏮️ Previous</button>}
          {undoCount != 0 && <button className="puzzle-btn shuffle-btn" onClick={() => {
            if (undoCount > 0 || undoCount == -1) {
              if (prevMoves.length > 0 && !loading) {
                let tempSteps = JSON.parse(JSON.stringify(prevMoves))
                let prevStep = tempSteps.pop()
                roll(prevStep[0], prevStep[1])
                setPrevMoves(tempSteps)
                SetSteps(prev => prev - 2 >= 0 ? prev - 2 : 0)
                setUndoCount(prev => undoCount > 0 ? prev - 1 : prev)
              }

            }

          }}>↩️ Undo  {undoCount === -1 ? <strong style={{ fontSize: "large" }}>∞</strong> : undoCount}</button>}
          <button className="puzzle-btn shuffle-btn" onClick={() => window.location.href = `/puzzle/${level}`}>🔁 Refresh</button>
          <button className="puzzle-btn solve-btn" style={{ cursor: `${solved ? "no-drop" : "pointer"}` }} onClick={async () => {
            if (!solved) {
              setSolved(true)
              let temp = JSON.parse(JSON.stringify(prevMoves))
              Solution(grid, setGrid, n, gridRef, SetSteps, temp, shape)
            }
          }}>✅ Solve</button>
          {level < levelsData.length && <button className="puzzle-btn shuffle-btn" onClick={() => window.location.href = `/puzzle/${level + 1}`}>⏭️ Next</button>}
        </div>
      </main >
    </>
  )
}

export default App