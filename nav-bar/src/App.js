import Navbar from "./Navbar";
import "./styles.css";
import Careers from "./pages/Careers";
import About from "./pages/About";
import Home from "./pages/Home";

import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <>
            <Navbar></Navbar>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/careers" element={<Careers />}></Route>
                    <Route path="/about" element={<About />}></Route>
                </Routes>
            </div>
        </>
    );
}

export default App;
