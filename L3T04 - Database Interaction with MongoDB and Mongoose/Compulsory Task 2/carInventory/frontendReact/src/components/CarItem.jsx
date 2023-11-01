import PropTypes from "prop-types";

const CarItem = ({ cars, updateCar, deleteCar }) => {
  return (
    <>
      <h5 className="mb-2">
        Model Year - Make - Registration - Owner - Address
      </h5>
      <ul>
        {(cars.length > 0 &&
          // Ideally the car._id that MongoDB creates on its own would be enough for the key
          // however the state would take too long to retrieve it so I have to make do with the
          // car.Registration which should be unique, adding the car._id to is is a safe guard
          // against user data entry
          cars.map((car) => (
            <li key={car.Registration + car._id}>
              <input
                id={`carModel-${car.Registration}`}
                size="6"
                type="number"
                defaultValue={car.Model}
              />
              <input
                id={`carMake-${car.Registration}`}
                size="14"
                type="text"
                defaultValue={car.Make}
              />
              <input
                id={`carRegistration-${car.Registration}`}
                size="14"
                type="text"
                defaultValue={car.Registration}
              />
              <input
                id={`carOwner-${car.Registration}`}
                type="text"
                defaultValue={car.Owner}
              />
              <input
                id={`carAddress-${car.Registration}`}
                size="35"
                type="text"
                defaultValue={car.Address}
              />
              <button
                onClick={() => updateCar(car.Registration)}
                className="btn btn-info"
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
          ))) || <h3>Loading ...</h3>}
      </ul>
    </>
  );
};

CarItem.propTypes = {
  cars: PropTypes.array.isRequired,
  updateCar: PropTypes.func.isRequired,
  deleteCar: PropTypes.func.isRequired,
};

export default CarItem;
