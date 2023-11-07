import { Formik, Form, Field } from "formik";
import axios from "axios";
import DOMPurify from "dompurify";

const Register = () => {
  const handleSubmit = (values) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: DOMPurify.sanitize(values.username),
        password: DOMPurify.sanitize(values.password),
      }),
    };
    axios
      .post("/todos/register", requestOptions)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={handleSubmit}
    >
      <Form>
        <label>
          Username:
          <Field type="text" name="username" />
        </label>
        <label>
          Password:
          <Field type="password" name="password" />
        </label>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default Register;
