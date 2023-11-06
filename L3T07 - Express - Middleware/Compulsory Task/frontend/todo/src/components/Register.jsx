// Learn Register form from
//React JS form validation: Axios User Registration Form SUBMIT: Beginners to intermediate (2021) YouTube.
//Available at: https://youtu.be/brcHK3P6ChQ?feature=shared&amp;t=120 (Accessed: 06 November 2023).

import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const Register = ({ ulrPath }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/register", {
      username,
      password,
    });
    console.log(response.data);
  };

  return (
    <>
      <h4>Register</h4>
      <form onSubmit={handleSubmit}>
        <label>
          Username Email:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </>
  );
};

Register.propTypes = {
  ulrPath: PropTypes.string,
};

export default Register;
