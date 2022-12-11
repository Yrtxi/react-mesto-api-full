function MobileMenu({ email, signOut, isOpen }) {
  return (
    <ul
      className={`header__menu-mobile  ${
        isOpen ? "header__menu-mobile_opened" : ""
      }`}
    >
      <li>
        <p className="header__item">{email}</p>
      </li>
      <li>
        <button onClick={signOut} className="header__item header__button">
          Выйти
        </button>
      </li>
    </ul>
  );
}

export default MobileMenu;
