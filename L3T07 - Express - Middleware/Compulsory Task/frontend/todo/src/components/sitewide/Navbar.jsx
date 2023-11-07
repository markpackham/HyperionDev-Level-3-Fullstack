import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <h1>Todos</h1>
      <nav className="navbar navbar-expand-lg mb-3 rounded">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home <i className="fa-solid fa-house" />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login <i className="fa-solid fa-right-to-bracket" />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register <i className="fa-solid fa-registered" />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <hr />
    </>
  );
};

export default Navbar;
