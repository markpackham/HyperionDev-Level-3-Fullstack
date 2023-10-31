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

  // CREATE / POST
  // Add a car
  const handleAddCar = () => {
    const car = {
      Model: document.getElementById("carModelAdd").value,
      Make: document.getElementById("carMakeAdd").value,
      Owner: document.getElementById("carOwnerAdd").value,
      Registration: document.getElementById("carRegistrationAdd").value,
      Address: document.getElementById("carAddressAdd").value,
    };
    // Send Post method to Express
    fetch("http://localhost:8080/cars/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // DELETE
  const deleteCar = async (registration) => {
    const url = `http://localhost:8080/cars/delete-car/${registration}`;
    const response = await fetch(url, { method: "DELETE" });
    if (response.ok) {
      alert(`Car with registration ${registration} has been deleted.`);
    } else {
      console.error(`Failed to delete car with registration ${registration}.`);
    }
  };

  return (
    <div className="container">
      <form>
        <h4>Add Car</h4>
        <label htmlFor="carModelAdd">Model/Year</label>
        <input id="carModelAdd" size="6" type="number" />
        <label htmlFor="carMakeAdd">Make</label>
        <input id="carMakeAdd" size="14" type="text" />
        <label htmlFor="carOwnerAdd">Owner</label>
        <input id="carOwnerAdd" size="14" type="text" />
        <label htmlFor="carRegistrationAdd">Registration</label>
        <input id="carRegistrationAdd" size="14" type="text" />
        <label htmlFor="carAddressAdd">Address</label>
        <input id="carAddressAdd" size="35" type="text" />
        <button onClick={handleAddCar} className="btn btn-success">
          Create
        </button>
      </form>

      <ul>
        {cars.map((car) => (
          <li key={car._id}>
            <input
              id="carModel"
              size="6"
              type="text"
              defaultValue={car.Model}
            />
            <input id="carMake" size="14" type="text" defaultValue={car.Make} />
            <input id="carOwner" type="text" defaultValue={car.Owner} />
            <input
              id="carRegistration"
              size="14"
              type="text"
              defaultValue={car.Registration}
            />
            <input
              id="carAddress"
              size="35"
              type="text"
              defaultValue={car.Address}
            />
            <button className="btn btn-warning">Update</button>
            <button
              onClick={() => deleteCar(car.Registration)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
