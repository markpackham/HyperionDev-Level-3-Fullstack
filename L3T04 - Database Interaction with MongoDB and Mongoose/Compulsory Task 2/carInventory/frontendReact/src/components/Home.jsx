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
      <form>
        <h4>Add Car</h4>
        <label htmlFor="carModelAdd">Model</label>
        <input id="carModelAdd" size="6" type="number" />
        <label htmlFor="carMakeAdd">Make</label>
        <input id="carMakeAdd" size="14" type="text" />
        <label htmlFor="carOwnerAdd">Owner</label>
        <input id="carOwnerAdd" size="14" type="text" />
        <label htmlFor="carRegistrationAdd">Registration</label>
        <input id="carRegistrationAdd" size="14" type="text" />
        <label htmlFor="carAddressAdd">Address</label>
        <input id="carAddressAdd" size="35" type="text" />
        <button className="btn btn-success">Create</button>
      </form>

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
