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
            <input id="carModel" type="text" value={car.Model} />
            <input id="carMake" type="text" value={car.Make} />
            <input id="carOwner" type="text" value={car.Owner} />
            <input id="carRegistration" type="text" value={car.Registration} />
            <input id="carAddress" type="text" value={car.Address} />
            <button className="btn btn-warning">Update</button>
            <button className="btn btn-danger">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
