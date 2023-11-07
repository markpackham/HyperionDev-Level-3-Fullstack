import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";
import CarItem from "./CarItem";
import AddTodo from "./AddTodo";

const ulrPath = "http://localhost:8080/todos/";

function Home() {
  const [cars, setCars] = useState([]);

  // READ / GET
  // Fetch All cars
  useEffect(() => {
    fetch(`${ulrPath}`)
      .then((res) => res.json())
      // Show latest additions first
      .then((data) => setCars(data.reverse()));
  }, []);

  // CREATE / POST
  // Add a car
  const handleAddTodo = (event) => {
    event.preventDefault();

    let model = Number(document.getElementById("carModelAdd").value);
    let make = document.getElementById("carMakeAdd").value;
    let owner = document.getElementById("carOwnerAdd").value;
    let reg = document.getElementById("carRegistrationAdd").value;
    let address = document.getElementById("carAddressAdd").value;

    if (
      model < 1900 ||
      make.length < 1 ||
      owner.length < 1 ||
      reg.length < 1 ||
      address.length < 1
    ) {
      Swal.fire({
        title: `All fields required!`,
        icon: "error",
      });
      // Escape method if user has failed to provide all fields
      return;
    }

    const car = {
      Model: DOMPurify.sanitize(model),
      Make: DOMPurify.sanitize(make),
      Owner: DOMPurify.sanitize(owner),
      Registration: DOMPurify.sanitize(reg),
      Address: DOMPurify.sanitize(address),
    };
    // Send Post method to Express
    fetch(`${ulrPath}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    })
      .then((res) => {
        console.log(res);
        // Update state with new car
        setCars([car, ...cars]);
      })
      .then(() => {
        Swal.fire({
          title: `Car created!`,
          icon: "success",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // CLEAR ADD CAR Form
  const handleClearAddTodo = () => {
    document.getElementById("carModelAdd").value = 0;
    document.getElementById("carMakeAdd").value = "";
    document.getElementById("carOwnerAdd").value = "";
    document.getElementById("carRegistrationAdd").value = "";
    document.getElementById("carAddressAdd").value = "";
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
    const upCar = {
      Model: DOMPurify.sanitize(
        Number(document.getElementById(`carModel-${reg}`).value)
      ),
      Make: DOMPurify.sanitize(document.getElementById(`carMake-${reg}`).value),
      Owner: DOMPurify.sanitize(
        document.getElementById(`carOwner-${reg}`).value
      ),
      Registration: DOMPurify.sanitize(
        document.getElementById(`carRegistration-${reg}`).value
      ),
      Address: DOMPurify.sanitize(
        document.getElementById(`carAddress-${reg}`).value
      ),
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
      body: JSON.stringify(upCar),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      <AddTodo
        handleAddTodo={handleAddTodo}
        handleClearAddTodo={handleClearAddTodo}
      />

      <CarItem cars={cars} updateCar={updateCar} deleteCar={deleteCar} />
    </div>
  );
}

export default Home;
