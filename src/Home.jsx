import "./Home.css"
import { useNavigate } from "react-router-dom"

export default function Home() {
    let games = [
        { name: "Template C", link: "shapec" },
        { name: "Template H", link: "shapeh" },
        { name: "Template I", link: "shapei" },
        { name: "Template J", link: "shapej" },
        { name: "Template K", link: "shapek" },
        { name: "Template L", link: "shapel" },
        { name: "Template O", link: "shapeo" },
        { name: "Template T", link: "shapet" },
        { name: "Template U", link: "shapeu" },
        { name: "Template V", link: "shapev" },
        { name: "Template X", link: "shapex" },
        { name: "Template Y", link: "shapey" },
    ]
    return (
        <main className="home-page-main">
            <div className="floating-shapes">
                <div className="shape circle"></div>
                <div className="shape triangle"></div>
                <div className="shape square"></div>
            </div>
            <h2>Pick a Template to begin</h2>
            <div className="home-page-container">
                {games.map((game, inx) => {
                    return (
                        <div className="home-page-game" key={inx} onClick={() => {
                            window.location.href = `/${game.link}`
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