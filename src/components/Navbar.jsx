import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const isAdmin =
    localStorage.getItem("isAdmin");

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        <Link
          className="navbar-brand"
          to="/"
        >
          Karim
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="menu"
        >
          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
              >
                Inicio
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/productos"
              >
                Productos
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link position-relative mx-2"
                to="/carrito"
              >
                <i className="bi bi-cart3 fs-5"></i>

                {totalItems > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  >
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>

            {isAdmin === "true" ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/admin"
                  >
                    <i className="bi bi-person-gear fs-5"></i>
                  </Link>
                </li>

                <li className="nav-item ms-2">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={handleLogout}
                  >
                    Salir
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/login"
                >
                  <i className="bi bi-person-circle fs-5"></i>
                </Link>
              </li>
            )}

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;