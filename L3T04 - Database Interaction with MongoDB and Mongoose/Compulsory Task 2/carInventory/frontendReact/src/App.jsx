import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import OldCars from "./components/OldCars";
import Navbar from "./components/sitewide/Navbar";

function App() {
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/olderThan5" element={<OldCars />} />
      </Routes>
    </div>
  );
}

export default App;
