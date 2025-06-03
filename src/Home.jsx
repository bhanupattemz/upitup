import "./Home.css"
import { useNavigate } from "react-router-dom"

export default function Home() {
    let games = [
        { name: "Easy", link: "shapev", level: 1 },
        { name: "Medium", link: "shapel", level: 4 },
        { name: "Hard", link: "shapei", level: 7 },
        { name: "Expert", link: "shapeo", level: 10 },
    ]
    return (
        <main className="home-page-main">
            <div className="floating-shapes">
                <div className="shape circle"></div>
                <div className="shape triangle"></div>
                <div className="shape square"></div>
            </div>
            <h2>Pick a Mode to begin</h2>
            <div className="home-page-container">
                {games.map((game, inx) => {
                    return (
                        <div className="home-page-game" key={inx} onClick={() => {
                            window.location.href = `/puzzle/${game.level}`
                        }}>
                            <img src={`/templates/${game.link}.png`} alt="game-image" />
                            <h3>{game.name}</h3>
                        </div>
                    )
                })}
            </div>

        </main>
    )
}