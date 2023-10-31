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
      <h4 className="mb-2">Model - Make - Owner - Registration - Address</h4>
      <ul className="text-center">
        {cars.map((car) => (
          <li key={car._id} className="mb-2">
            {car.Model} - {car.Make} - {car.Owner} - {car.Registration} -{" "}
            {car.Address}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OldCars;
