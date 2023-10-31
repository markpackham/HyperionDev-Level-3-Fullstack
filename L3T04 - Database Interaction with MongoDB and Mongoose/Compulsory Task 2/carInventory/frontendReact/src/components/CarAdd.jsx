import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";

const CarAdd = ({ handleAddCar }) => {
  const validationSchema = Yup.object({
    carModelAdd: Yup.number().required("Model/Year is required"),
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
        <label htmlFor="carModelAdd">Model/Year:</label>
        <input
          required
          id="carModelAdd"
          type="number"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.carModelAdd}
        />

        {formik.touched.carModelAdd && formik.errors.carModelAdd ? (
          <div>{formik.errors.carModelAdd}</div>
        ) : null}

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