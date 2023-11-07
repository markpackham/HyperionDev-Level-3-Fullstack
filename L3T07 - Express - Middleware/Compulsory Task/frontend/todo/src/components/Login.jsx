import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const Login = ({ ulrPath }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${ulrPath}login`, {
      username,
      password,
    });

    if (res.status === 403) {
      alert(res.data.message);
    }

    if (res.status === 200 && res.data != "Incorrect user credentials") {
      alert(res.data.message);
      setToken[res.data.token];
      sessionStorage.setItem("jwt_token", res.data.token);
    }
  };

  return (
    <>
      <h4>Login</h4>
      <form onSubmit={handleLogin}>
        <label>
          Username (user@gmail.com):
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password (password1):
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" className="btn btn-success">
          Login
        </button>
      </form>
    </>
  );
};

Login.propTypes = {
  ulrPath: PropTypes.string,
};

export default Login;
