import { useState } from "react";

import {
  Link,
  NavLink,
} from "react-router-dom";

import {
  FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";

import {
  faBars,
  faCartShopping,
  faChevronDown,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);

  const [
    adminOpen,
    setAdminOpen,
  ] = useState(false);

  const closeMenus = () => {
    setMenuOpen(false);
    setAdminOpen(false);
  };

  const navClass = ({
    isActive,
  }) =>
    isActive
      ? "nav-link active"
      : "nav-link";

  return (
    <header className="site-header">
      <nav
        className="navbar"
        aria-label="Navegación principal"
      >
        <Link
          to="/"
          className="nav-logo"
          onClick={closeMenus}
        >
          <img
            src="/images/Logo-TrueBeauty.png"
            alt="Logo True Beauty"
          />

          <span>
            True Beauty
          </span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Abrir o cerrar menú"
          aria-expanded={menuOpen}
          onClick={() =>
            setMenuOpen(
              (value) => !value
            )
          }
        >
          <FontAwesomeIcon
            icon={
              menuOpen
                ? faXmark
                : faBars
            }
          />
        </button>

        <div
          className={
            `nav-collapse ${
              menuOpen
                ? "open"
                : ""
            }`
          }
        >
          <ul className="nav-links">
            <li>
              <NavLink
                to="/"
                end
                className={navClass}
                onClick={closeMenus}
              >
                Principal
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/products"
                className={navClass}
                onClick={closeMenus}
              >
                Productos
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/register"
                className={navClass}
                onClick={closeMenus}
              >
                Registro
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contact"
                className={navClass}
                onClick={closeMenus}
              >
                Contacto
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/about"
                className={navClass}
                onClick={closeMenus}
              >
                Acerca de
              </NavLink>
            </li>

            <li className="admin-menu">
              <button
                type="button"
                className="admin-menu-button"
                onClick={() =>
                  setAdminOpen(
                    (value) =>
                      !value
                  )
                }
                aria-expanded={
                  adminOpen
                }
              >
                Admin

                <FontAwesomeIcon
                  icon={
                    faChevronDown
                  }
                />
              </button>

              {adminOpen && (
                <div className="admin-dropdown">
                  <NavLink
                    to="/admin-products"
                    onClick={
                      closeMenus
                    }
                  >
                    Productos
                  </NavLink>

                  <NavLink
                    to="/admin-users"
                    onClick={
                      closeMenus
                    }
                  >
                    Usuarios
                  </NavLink>
                </div>
              )}
            </li>
          </ul>

          <div className="nav-actions">
            <span
              title="Usuario"
              aria-label="Usuario"
            >
              <FontAwesomeIcon
                icon={faUser}
              />
            </span>

            <span
              title="Carrito"
              aria-label="Carrito"
            >
              <FontAwesomeIcon
                icon={
                  faCartShopping
                }
              />
            </span>

            <Link
              to="/login"
              className="btn-login"
              onClick={closeMenus}
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;