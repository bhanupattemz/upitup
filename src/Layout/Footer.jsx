import "./layout.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* <div className="copyright">
                    © {new Date().getFullYear()} XYZ
                </div> */}
                <div className="fun-message">
                    Made with ❤️ and 🧩 for kids everywhere!
                </div>
            </div>
            <div className="floating-shapes">
                <div className="shape circle"></div>
                <div className="shape triangle"></div>
                <div className="shape square"></div>
            </div>
        </footer>
    )
}