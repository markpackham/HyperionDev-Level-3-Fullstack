import PropTypes from "prop-types";

const TodoItem = ({ todos, updateCar, deleteCar }) => {
  return (
    <>
      <h5 className="mb-2">
        Model Year - Make - Registration - Owner - Address
      </h5>
      <div className="list-group">
        {(todos.length > 0 &&
          cars.map((car) => (
            <div
              className="list-group-item list-group-item-action"
              key={car.Registration + car._id}
            >
              <div className="row">
                <div className="col-sm-6 col-md-2">
                  <input
                    id={`carModel-${car.Registration}`}
                    className="form-control"
                    type="number"
                    defaultValue={car.Model}
                    title="model"
                  />
                </div>
                <div className="col-sm-6 col-md-3">
                  <input
                    id={`carMake-${car.Registration}`}
                    className="form-control"
                    type="text"
                    defaultValue={car.Make}
                    title="make"
                  />
                </div>
                <div className="col-sm-6 col-md-2">
                  <input
                    id={`carRegistration-${car.Registration}`}
                    className="form-control"
                    type="text"
                    defaultValue={car.Registration}
                    title="registration"
                  />
                </div>
                <div className="col-sm-6 col-md-2">
                  <input
                    id={`carOwner-${car.Registration}`}
                    className="form-control"
                    type="text"
                    defaultValue={car.Owner}
                    title="owner"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <input
                    id={`carAddress-${car.Registration}`}
                    className="form-control"
                    type="text"
                    defaultValue={car.Address}
                    title="address"
                  />
                </div>
                <div className="col-sm-12 col-md-4">
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
            </div>
          ))) || <h3>Loading ...</h3>}
      </div>
    </>
  );
};

TodoItem.propTypes = {
  cars: PropTypes.array.isRequired,
  updateCar: PropTypes.func.isRequired,
  deleteCar: PropTypes.func.isRequired,
};

export default TodoItem;
