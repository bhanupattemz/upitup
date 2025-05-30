import { useState } from "react";
import "./layout.css";

export default function Header() {
    const [open, setopen] = useState(false)
    return (
        <>
            {open &&
                <div className="rules-popup">
                    <div className="popup-content">
                        <div className="popup-header">
                            <h1>📜 Game Rules</h1>
                            <div className="confetti"></div>
                            <div className="confetti"></div>
                            <div className="confetti"></div>
                        </div>

                        <div className="rules-text">
                            <div className="rule-section">
                                <div className="rule-icon">🎯</div>
                                <div>
                                    <h3>Objective:</h3>
                                    <p>Roll all the cubes so that the <span className='highlight'>rat image</span> appears on top, forming a specific alphabet shape!</p>
                                </div>
                            </div>

                            <div className="rule-section">
                                <div className="rule-icon">🕹️</div>
                                <div>
                                    <h3>How to Play:</h3>
                                    <ul>
                                        <li>The grid has cubes in every cell <span className="highlight">except the center</span> (it's empty!)</li>
                                        <li>Click a cube <span className="highlight">next to the empty space</span> (up/down/left/right)</li>
                                        <li>Cubes will <span className="highlight">roll and rotate</span> into the empty spot</li>
                                        <li>Keep rolling until <span className="highlight">all tops show the rat!</span> 🐀</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="rule-section">
                                <div className="rule-icon">🏆</div>
                                <div>
                                    <h3>Scoring:</h3>
                                    <div className="score-factors">
                                        <div className="factor">
                                            <span className="emoji">⏱️</span>
                                            <span>Faster = Better!</span>
                                        </div>
                                        <div className="factor">
                                            <span className="emoji">🔢</span>
                                            <span>Fewer moves = More points!</span>
                                        </div>
                                        <div className="factor">
                                            <span className="emoji">🐭</span>
                                            <span>More rats = Good progress!</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="got-it-btn" onClick={() => { setopen(false) }}>
                            GOT IT! <span className="jumping-emoji">🎉</span>
                        </button>
                    </div>
                </div>}
            <header className="header">
                <nav className="nav">
                    <img src="/logo.png" alt="Puzzle Game Logo" className="logo bounce" />
                </nav>
                <div className="nav-links">
                    {window.location.pathname != "/" && <button className="nav-link rules-btn" onClick={() => { window.location.href = "/" }}>
                        <span>🔲Templates</span>
                    </button>}

                    <button className="nav-link rules-btn" onClick={() => { setopen(true) }}>
                        <span>📖 Rules</span>
                    </button>
                </div>

            </header>

        </>

    )
}