import PropTypes from "prop-types";

const CarAdd = ({ handleAddCar }) => {
  return (
    <>
      <form className="form-group">
        <label htmlFor="carModelAdd">Model/Year:</label>
        <input
          required
          id="carModelAdd"
          type="number"
          className="form-control"
        />
        <label htmlFor="carMakeAdd">Make:</label>
        <input required id="carMakeAdd" type="text" className="form-control" />
        <label htmlFor="carRegistrationAdd">Registration:</label>
        <input
          required
          id="carRegistrationAdd"
          type="text"
          className="form-control"
        />
        <label htmlFor="carOwnerAdd">Owner:</label>
        <input required id="carOwnerAdd" type="text" className="form-control" />
        <label htmlFor="carAddressAdd">Address:</label>
        <input
          required
          id="carAddressAdd"
          type="text"
          className="form-control"
        />
        <button onClick={handleAddCar} className="btn btn-success">
          Add Car
        </button>
      </form>
    </>
  );
};

CarAdd.propTypes = {
  handleAddCar: PropTypes.func.isRequired,
};

export default CarAdd;
