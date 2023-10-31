import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const ulrPath = "http://localhost:8080/cars";

function Home() {
  const [cars, setCars] = useState([]);

  // READ / GET
  // Fetch All cars
  useEffect(() => {
    fetch(`${ulrPath}`)
      .then((response) => response.json())
      .then((data) => setCars(data.reverse()));
  }, []);

  // CREATE / POST
  // Add a car
  const handleAddCar = (event) => {
    event.preventDefault();
    const car = {
      Model: document.getElementById("carModelAdd").value,
      Make: document.getElementById("carMakeAdd").value,
      Owner: document.getElementById("carOwnerAdd").value,
      Registration: document.getElementById("carRegistrationAdd").value,
      Address: document.getElementById("carAddressAdd").value,
    };
    // Send Post method to Express
    fetch(`${ulrPath}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    })
      .then((response) => {
        console.log(response);
        Swal.fire({
          title: `Car created!`,
          icon: "success",
        });

        // Update state with new car
        setCars([car, ...cars]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // DELETE
  const deleteCar = async (reg) => {
    const url = `${ulrPath}/delete-car/${reg}`;
    const response = await fetch(url, { method: "DELETE" });
    if (response.ok) {
      Swal.fire({
        title: `Car with reg: ${reg} deleted.`,
        icon: "info",
      });
      // Update the state to avoid having to refresh
      setCars(cars.filter((car) => car.Registration !== reg));
    } else {
      console.error(`Failed to delete car reg: ${reg}.`);
    }
  };

  // UPDATE
  const updateCar = (reg) => {
    const updatedCars = cars.map((car) => {
      if (car.Registration === reg) {
        return {
          ...car,
          Model: document.getElementById("carModel").value,
          Make: document.getElementById("carMake").value,
          Owner: document.getElementById("carOwner").value,
          Registration: document.getElementById("carRegistration").value,
          Address: document.getElementById("carAddress").value,
        };
      } else {
        return car;
      }
    });
    console.log(updatedCars);
    setCars(updatedCars);

    // PUT request to Express
    const url = `${ulrPath}/update-car/${reg}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCars.find((car) => car.Registration === reg)),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      <form className="form-group">
        <h4>Add Car</h4>
        <label htmlFor="carModelAdd">Model/Year:</label>
        <input
          required
          id="carModelAdd"
          type="number"
          className="form-control"
        />
        <label htmlFor="carMakeAdd">Make:</label>
        <input required id="carMakeAdd" type="text" className="form-control" />
        <label htmlFor="carOwnerAdd">Owner:</label>
        <input required id="carOwnerAdd" type="text" className="form-control" />
        <label htmlFor="carRegistrationAdd">Registration:</label>
        <input
          required
          id="carRegistrationAdd"
          type="text"
          className="form-control"
        />
        <label htmlFor="carAddressAdd">Address:</label>
        <input
          required
          id="carAddressAdd"
          type="text"
          className="form-control"
        />
        <button onClick={handleAddCar} className="btn btn-success">
          Create
        </button>
      </form>

      <ul>
        {cars.map((car) => (
          <li key={car.Registration}>
            <input
              id="carModel"
              size="6"
              type="number"
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
            <button
              onClick={() => updateCar(car.Registration)}
              className="btn btn-warning"
            >
              Update
            </button>
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
