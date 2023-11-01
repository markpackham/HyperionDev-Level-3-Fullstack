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
      <div className="list-group">
        {cars.map((car) => (
          <div key={car._id} className="list-group-item list-group-item-action">
            <div className="row">
              <div className="col-sm-6 col-md-3">
                <i>{car.Model}</i>
              </div>
              <div className="col-sm-6 col-md-3">
                <strong>{car.Make}</strong>
              </div>
              <div className="col-sm-6 col-md-3">{car.Registration}</div>
              <div className="col-sm-6 col-md-3">
                <strong>{car.Owner}</strong>
              </div>
              <div className="col-sm-6 col-md-3">{car.Address}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OldCars;
