import { useState, useEffect } from "react";

function Home() {
  const [cars, setCars] = useState([]);

  // READ / GET
  // Fetch All cars
  useEffect(() => {
    fetch("http://localhost:8080/cars")
      .then((response) => response.json())
      .then((data) => setCars(data));
  }, []);

  return (
    <div className="container">
      <ul>
        {cars.map((car) => (
          <li key={car._id}>
            <input id="carModel" size="6" type="text" value={car.Model} />
            <input id="carMake" size="14" type="text" value={car.Make} />
            <input id="carOwner" type="text" value={car.Owner} />
            <input
              id="carRegistration"
              size="14"
              type="text"
              value={car.Registration}
            />
            <input id="carAddress" size="35" type="text" value={car.Address} />
            <button className="btn btn-warning">Update</button>
            <button className="btn btn-danger">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
