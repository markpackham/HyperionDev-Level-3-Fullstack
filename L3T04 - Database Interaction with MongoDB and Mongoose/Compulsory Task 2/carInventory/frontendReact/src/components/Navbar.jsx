import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <h1>Car Inventory</h1>
      <nav className="navbar navbar-expand-lg mb-3 rounded">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/olderThan5">
                Cars Older Than 5 Years
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
