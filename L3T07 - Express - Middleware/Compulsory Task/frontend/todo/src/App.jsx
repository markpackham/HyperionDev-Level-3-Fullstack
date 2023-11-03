import "bootstrap/dist/css/bootstrap.min.css";
import "../src/styles/App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/layout/Header";
import NavMenu from "./components/layout/NavMenu";
function App() {
  return (
    <div className="container">
      <Header />
      <NavMenu />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
