import { useState, useEffect } from "react";

function OldCars() {
  const [cars, setCars] = useState([]);

  // READ / GET
  // Fetch All cars older than 5 years
  useEffect(() => {
    fetch("http://localhost:8080/cars/olderThan5")
      .then((res) => res.json())
      .then((data) => setCars(data));
  }, []);

  return (
    <div className="container">
      <h2 className="mb-2">Cars Older Than 5 Years</h2>
      <h5 className="mb-2">
        Model Year - Make - Registration - Owner - Address
      </h5>
      <ul className="text-center">
        {cars.map((car) => (
          <li key={car._id} className="mb-2">
            <i>{car.Model}</i> - <strong>{car.Make}</strong> -{" "}
            {car.Registration} - <strong>{car.Owner}</strong> - {car.Address}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OldCars;
