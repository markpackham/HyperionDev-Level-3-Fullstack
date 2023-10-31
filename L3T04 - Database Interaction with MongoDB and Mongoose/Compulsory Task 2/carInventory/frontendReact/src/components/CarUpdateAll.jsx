import PropTypes from "prop-types";

const CarUpdateAll = ({ handleUpdateAllOwner }) => {
  return (
    <>
      <h4>Mass Update on Owner</h4>
      <p>
        If you have multiple cars with the same owner this lets you update them
        all with identical details - not advised but proves that MongoDB
        function, updateMany works.
      </p>
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
        <button onClick={handleUpdateAllOwner} className="btn btn-warning">
          Update All on Owner
        </button>
      </form>
    </>
  );
};

CarUpdateAll.propTypes = {
  handleUpdateAllOwner: PropTypes.func.isRequired,
};

export default CarUpdateAll;
