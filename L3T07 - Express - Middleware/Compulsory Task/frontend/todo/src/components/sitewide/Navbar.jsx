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
                Home <i className="fa-solid fa-house"></i>
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
