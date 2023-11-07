import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";

const CarUpdateAll = ({ handleUpdateAllOwner }) => {
  // Use Formik and Yup to tell user off for not filling in fields
  const validationSchema = Yup.object({
    carModelUpdateAll: Yup.number()
      .moreThan(1900)
      .required("Model/Year is required"),
    carMakeUpdateAll: Yup.string().required("Make is required"),
    carRegistrationUpdateAll: Yup.string().required("Registration is required"),
    carOwnerUpdateAll: Yup.string().required("Owner is required"),
    carAddressUpdateAll: Yup.string().required("Address is required"),
  });

  const formik = useFormik({
    initialValues: {
      carModelUpdateAll: 2000,
      carMakeUpdateAll: "",
      carRegistrationUpdateAll: "",
      carOwnerUpdateAll: "",
      carAddressUpdateAll: "",
    },
    validationSchema,
  });

  return (
    <>
      <h4>Mass Update on Owner</h4>
      <p>
        If you have multiple cars with the same owner this lets you update them
        all with identical details - not advised since car registrations should
        in the real world be unique but proves that the MongoDB function,
        &quot;updateMany&quot; works.
      </p>
      <form className="form-group col-sm-12 col-md-6">
        <label htmlFor="carModelUpdateAll">Model Year (older than 1900):</label>
        <input
          id="carModelUpdateAll"
          type="number"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.carModelUpdateAll}
        />
        {formik.touched.carModelUpdateAll && formik.errors.carModelUpdateAll ? (
          <div className="fw-bold text-danger mb-1">
            {formik.errors.carModelUpdateAll}
          </div>
        ) : null}

        <label htmlFor="carMakeUpdateAll">Make:</label>
        <input
          id="carMakeUpdateAll"
          type="text"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.carMakeUpdateAll}
        />
        {formik.touched.carMakeUpdateAll && formik.errors.carMakeUpdateAll ? (
          <div className="fw-bold text-danger mb-1">
            {formik.errors.carMakeUpdateAll}
          </div>
        ) : null}

        <label htmlFor="carRegistrationUpdateAll">Registration:</label>
        <input
          id="carRegistrationUpdateAll"
          type="text"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.carRegistrationUpdateAll}
        />
        {formik.touched.carRegistrationUpdateAll &&
        formik.errors.carRegistrationUpdateAll ? (
          <div className="fw-bold text-danger mb-1">
            {formik.errors.carRegistrationUpdateAll}
          </div>
        ) : null}

        <label htmlFor="carOwnerUpdateAll">Owner:</label>
        <input
          id="carOwnerUpdateAll"
          type="text"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.carOwnerUpdateAll}
        />
        {formik.touched.carOwnerUpdateAll && formik.errors.carOwnerUpdateAll ? (
          <div className="fw-bold text-danger mb-1">
            {formik.errors.carOwnerUpdateAll}
          </div>
        ) : null}

        <label htmlFor="carAddressUpdateAll">Address:</label>
        <input
          id="carAddressUpdateAll"
          type="text"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.carAddressUpdateAll}
        />
        {formik.touched.carAddressUpdateAll &&
        formik.errors.carAddressUpdateAll ? (
          <div className="fw-bold text-danger mb-1">
            {formik.errors.carAddressUpdateAll}
          </div>
        ) : null}

        <button onClick={handleUpdateAllOwner} className="btn btn-warning">
          Update All by Owner
        </button>
      </form>
    </>
  );
};

CarUpdateAll.propTypes = {
  handleUpdateAllOwner: PropTypes.func.isRequired,
};

export default CarUpdateAll;
