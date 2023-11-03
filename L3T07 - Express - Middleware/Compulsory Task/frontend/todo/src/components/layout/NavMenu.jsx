import { Link } from "react-router-dom";

const NavMenu = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg mb-3 rounded">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <hr />
    </>
  );
};

export default NavMenu;
