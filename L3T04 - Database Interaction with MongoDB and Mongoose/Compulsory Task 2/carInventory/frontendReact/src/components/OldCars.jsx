import { useState, useEffect } from "react";

function OldCars() {
  const [cars, setCars] = useState([]);

  // READ / GET
  // Fetch All cars older than 5 years
  useEffect(() => {
    fetch("http://localhost:8080/cars/olderThan5")
      .then((response) => response.json())
      .then((data) => setCars(data));
  }, []);

  return (
    <div className="container">
      <h2>Cars Older Than 5 Years</h2>
      <ul>
        {cars.map((car) => (
          <li key={car._id}>
            <input id="carModel" size="6" type="number" value={car.Model} />
            <input id="carMake" size="14" type="text" value={car.Make} />
            <input id="carOwner" type="text" value={car.Owner} />
            <input
              id="carRegistration"
              size="14"
              type="text"
              value={car.Registration}
            />
            <input id="carAddress" size="35" type="text" value={car.Address} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OldCars;
