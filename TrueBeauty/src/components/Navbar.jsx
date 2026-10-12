import { useState } from "react";

import { Link, NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCartShopping,
  faChevronDown,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [adminOpen, setAdminOpen] = useState(false);

  const navClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  const closeAdmin = () => {
    setAdminOpen(false);
  };

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Navegación principal">
        <Link to="/" className="nav-logo" onClick={closeAdmin}>
          <img src="/images/Logo-TrueBeauty.png" alt="Logo True Beauty" />

          <span>True Beauty</span>
        </Link>

        <div className="nav-collapse">
          <ul className="nav-links">
            <li>
              <NavLink to="/" end className={navClass} onClick={closeAdmin}>
                Principal
              </NavLink>
            </li>

            <li>
              <NavLink to="/products" className={navClass} onClick={closeAdmin}>
                Productos
              </NavLink>
            </li>

            <li>
              <NavLink to="/register" className={navClass} onClick={closeAdmin}>
                Registro
              </NavLink>
            </li>

            <li>
              <NavLink to="/contact" className={navClass} onClick={closeAdmin}>
                Contacto
              </NavLink>
            </li>

            <li>
              <NavLink to="/about" className={navClass} onClick={closeAdmin}>
                Acerca de
              </NavLink>
            </li>

            <li className="admin-menu">
              <button
                type="button"
                className="admin-menu-button"
                onClick={() => setAdminOpen((value) => !value)}
              >
                Admin
                <FontAwesomeIcon icon={faChevronDown} />
              </button>

              {adminOpen && (
                <div className="admin-dropdown">
                  <NavLink to="/admin-products" onClick={closeAdmin}>
                    Productos
                  </NavLink>

                  <NavLink to="/admin-users" onClick={closeAdmin}>
                    Usuarios
                  </NavLink>
                </div>
              )}
            </li>
          </ul>

          <div className="nav-actions">
            <span title="Usuario" aria-label="Usuario">
              <FontAwesomeIcon icon={faUser} />
            </span>

            <span title="Carrito" aria-label="Carrito">
              <FontAwesomeIcon icon={faCartShopping} />
            </span>

            <Link to="/login" className="btn-login" onClick={closeAdmin}>
              Login
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
