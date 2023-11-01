import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";

const CarAdd = ({ handleAddCar, handleClearAddCar }) => {
  // Use Formik and Yup to tell user off for not filling in fields
  const validationSchema = Yup.object({
    carModelAdd: Yup.number().moreThan(1900).required("Model/Year is required"),
    carMakeAdd: Yup.string().required("Make is required"),
    carRegistrationAdd: Yup.string().required("Registration is required"),
    carOwnerAdd: Yup.string().required("Owner is required"),
    carAddressAdd: Yup.string().required("Address is required"),
  });

  const formik = useFormik({
    initialValues: {
      carModelAdd: 0,
      carMakeAdd: "",
      carRegistrationAdd: "",
      carOwnerAdd: "",
      carAddressAdd: "",
    },
    validationSchema,
  });

  return (
    <>
      <h4>Add Car</h4>

      <form className="form-group">
        <label htmlFor="carModelAdd">Model Year (older than 1900):</label>
        <input
          id="carModelAdd"
          type="number"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.carModelAdd}
        />

        {formik.touched.carModelAdd && formik.errors.carModelAdd ? (
          <div className="fw-bold text-danger mb-1">
            {formik.errors.carModelAdd}
          </div>
        ) : null}

        <label htmlFor="carMakeAdd">Make:</label>
        <input
          id="carMakeAdd"
          type="text"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.carMakeAdd}
        />

        {formik.touched.carMakeAdd && formik.errors.carMakeAdd ? (
          <div className="fw-bold text-danger mb-1">
            {formik.errors.carMakeAdd}
          </div>
        ) : null}

        <label htmlFor="carRegistrationAdd">Registration:</label>
        <input
          id="carRegistrationAdd"
          type="text"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.carRegistrationAdd}
        />

        {formik.touched.carRegistrationAdd &&
        formik.errors.carRegistrationAdd ? (
          <div className="fw-bold text-danger mb-1">
            {formik.errors.carRegistrationAdd}
          </div>
        ) : null}

        <label htmlFor="carOwnerAdd">Owner:</label>
        <input
          id="carOwnerAdd"
          type="text"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.carOwnerAdd}
        />

        {formik.touched.carOwnerAdd && formik.errors.carOwnerAdd ? (
          <div className="fw-bold text-danger mb-1">
            {formik.errors.carOwnerAdd}
          </div>
        ) : null}

        <label htmlFor="carAddressAdd">Address:</label>
        <input
          id="carAddressAdd"
          type="text"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.carAddressAdd}
        />

        {formik.touched.carAddressAdd && formik.errors.carAddressAdd ? (
          <div className="fw-bold text-danger mb-1">
            {formik.errors.carAddressAdd}
          </div>
        ) : null}

        <button onClick={handleAddCar} className="btn btn-success">
          Add Car
        </button>

        <button onClick={handleClearAddCar} className="btn btn-primary">
          Clear
        </button>
      </form>
    </>
  );
};

// Make sure all the correct functions are supplied to this component
CarAdd.propTypes = {
  handleAddCar: PropTypes.func.isRequired,
  handleClearAddCar: PropTypes.func.isRequired,
};

export default CarAdd;
