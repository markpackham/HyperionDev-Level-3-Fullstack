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
            {car.Model} - {car.Make} - {car.Owner} - {car.Registration} -{" "}
            {car.Address}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OldCars;
