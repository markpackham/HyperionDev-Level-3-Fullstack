import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import CarItem from "./CarItem";
import CarAdd from "./CarAdd";

const ulrPath = "http://localhost:8080/cars";

function Home() {
  const [cars, setCars] = useState([]);

  // READ / GET
  // Fetch All cars
  useEffect(() => {
    fetch(`${ulrPath}`)
      .then((response) => response.json())
      // Show latest additions first
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
    const res = await fetch(url, { method: "DELETE" });
    if (res.ok) {
      Swal.fire({
        title: `Car with reg: ${reg} deleted.`,
        icon: "warning",
      });
      // Update the state to avoid having to refresh
      setCars(cars.filter((car) => car.Registration !== reg));
    } else {
      console.error(`Failed to delete car reg: ${reg}.`);
    }
  };

  // UPDATE
  const updateCar = (reg) => {
    // All input fields have unique ids thanks to the reg being unique
    // so basic input field name + reg thus only the correct car is updated
    const myCar = {
      Model: Number(document.getElementById(`carModel-${reg}`).value),
      Make: document.getElementById(`carMake-${reg}`).value,
      Owner: document.getElementById(`carOwner-${reg}`).value,
      Registration: document.getElementById(`carRegistration-${reg}`).value,
      Address: document.getElementById(`carAddress-${reg}`).value,
    };

    // Find car we want to update
    const updatedCar = cars.find((car) => car.Registration === reg);
    setCars(cars.map((car) => (car.Registration === reg ? updatedCar : car)));

    Swal.fire({
      title: `Car with reg: ${reg} updated.`,
      icon: "info",
    });

    // PUT request to server
    const url = `${ulrPath}/update-car/${reg}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myCar),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  // UPDATE ALL based on Owner
  const handleUpdateAllOwner = (owner) => {
    event.preventDefault();
    console.log(owner);
  };

  return (
    <div className="container">
      <CarAdd handleAddCar={handleAddCar} />

      <form className="form-group">
        <label htmlFor="carModelUpdateAll">Model/Year:</label>
        <input
          required
          id="carModelUpdateAll"
          type="number"
          className="form-control"
        />
        <label htmlFor="carMakeUpdateAll">Make:</label>
        <input
          required
          id="carMakeUpdateAll"
          type="text"
          className="form-control"
        />
        <label htmlFor="carRegistrationUpdateAll">Registration:</label>
        <input
          required
          id="carRegistrationUpdateAll"
          type="text"
          className="form-control"
        />
        <label htmlFor="carOwnerUpdateAll">Owner:</label>
        <input
          required
          id="carOwnerUpdateAll"
          type="text"
          className="form-control"
        />
        <label htmlFor="carAddressUpdateAll">Address:</label>
        <input
          required
          id="carAddressUpdateAll"
          type="text"
          className="form-control"
        />
        <button
          onClick={() =>
            handleUpdateAllOwner(
              document.getElementById(`carOwnerUpdateAll`).value
            )
          }
          className="btn btn-success"
        >
          Update All Cars based on Owner
        </button>
      </form>

      <CarItem cars={cars} updateCar={updateCar} deleteCar={deleteCar} />
    </div>
  );
}

export default Home;
