import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Fragment } from "react"
import Header from "./Layout/Header"
import Footer from "./Layout/Footer"
import Home from "./Home"
import Shape from "./Shape"
export default function App() {
  return (
    <Fragment>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:shape" element={<Shape />} />
        </Routes>
      </Router>
    </Fragment>
  )
}