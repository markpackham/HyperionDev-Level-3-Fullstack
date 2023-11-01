import PropTypes from "prop-types";

const CarItem = ({ cars, updateCar, deleteCar }) => {
  return (
    <>
      <h5 className="mb-2">
        Model Year - Make - Registration - Owner - Address
      </h5>
      <ul>
        <div className="list-group">
          {(cars.length > 0 &&
            // Ideally the car._id that MongoDB creates on its own would be enough for the key
            // however the state would take too long to retrieve it so I have to make do with the
            // car.Registration which should be unique, adding the car._id to is is a safe guard
            // against user data entry
            cars.map((car) => (
              <a
                href="#"
                className="list-group-item list-group-item-action"
                key={car.Registration + car._id}
              >
                <div className="row">
                  <div className="col-sm-6 col-md-3">
                    <input
                      id={`carModel-${car.Registration}`}
                      className="form-control"
                      type="number"
                      defaultValue={car.Model}
                    />
                  </div>
                  <div className="col-sm-6 col-md-3">
                    <input
                      id={`carMake-${car.Registration}`}
                      className="form-control"
                      type="text"
                      defaultValue={car.Make}
                    />
                  </div>
                  <div className="col-sm-6 col-md-3">
                    <input
                      id={`carRegistration-${car.Registration}`}
                      className="form-control"
                      type="text"
                      defaultValue={car.Registration}
                    />
                  </div>
                  <div className="col-sm-6 col-md-3">
                    <input
                      id={`carOwner-${car.Registration}`}
                      className="form-control"
                      type="text"
                      defaultValue={car.Owner}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 col-md-9">
                    <input
                      id={`carAddress-${car.Registration}`}
                      className="form-control"
                      type="text"
                      defaultValue={car.Address}
                    />
                  </div>
                  <div className="col-sm-12 col-md-3">
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
                  </div>
                </div>
              </a>
            ))) || <h3>Loading ...</h3>}
        </div>
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
