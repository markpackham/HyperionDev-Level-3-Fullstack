import PropTypes from "prop-types";

const CarItem = ({ cars, updateCar, deleteCar }) => {
  return (
    <>
      <h5 className="mb-2">Model - Make - Registration - Owner - Address</h5>
      <ul>
        {(cars.length > 0 &&
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
