import logo from "../images/header-logo.svg";
import { Routes, Route, Link } from "react-router-dom";

function Header({ email, signOut, openMenu, isActive }) {
  return (
    <header className="header">
      <img src={logo} alt="Лого" className="header__logo" />
      <ul className="header__menu">
        <Routes>
          <Route
            path="/sign-up"
            element={
              <li>
                <Link to="/sign-in" className="header__item">
                  Войти
                </Link>
              </li>
            }
          ></Route>
          <Route
            path="/sign-in"
            element={
              <li>
                <Link to="/sign-up" className="header__item">
                  Регистрация
                </Link>
              </li>
            }
          ></Route>
          <Route
            path="/"
            element={
              <>
                <div className="header__menu-container">
                  <li>
                    <p className="header__item">{email}</p>
                  </li>
                  <li>
                    <button
                      onClick={signOut}
                      className="header__item header__button"
                    >
                      Выйти
                    </button>
                  </li>
                </div>
                <button
                  onClick={openMenu}
                  className={`header__burger  ${
                    isActive ? "header__burger_active" : ""
                  }`}
                ></button>
              </>
            }
          ></Route>
        </Routes>
      </ul>
    </header>
  );
}

export default Header;
