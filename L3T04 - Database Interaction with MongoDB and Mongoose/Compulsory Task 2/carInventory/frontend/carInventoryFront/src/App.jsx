import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/cars")
      .then((response) => response.json())
      .then((data) => setCars(data));
  }, []);

  return (
    <div className="container">
      <h1>Car Inventory</h1>
      <ul>
        {cars.map((car) => (
          <li key={car._id}>
            {car.Model} {car.Make} {car.Owner}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
