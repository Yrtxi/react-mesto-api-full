import { Link } from "react-router-dom";
import { useForm } from "../hooks/useForm";

function Register({ onRegister, openError }) {
  const { values, handleChange } = useForm({
    password: "",
    email: "",
  });

  //Обработчик отправки формы регистрации
  const handleSubmit = (e) => {
    e.preventDefault();

    onRegister(values.password, values.email).catch((err) => {
      openError();
    });
  };

  return (
    <section className="register">
      <div className="register__container">
        <p className="register__welcome">Регистрация</p>
        <form onSubmit={handleSubmit} className="register__form">
          <label className="register__form-field">
            <input
              onChange={handleChange}
              value={values.email}
              id="email-input"
              name="email"
              required
              placeholder="Email"
              className="register__input"
              type="text"
            />
          </label>
          <label className="register__form-field">
            <input
              onChange={handleChange}
              value={values.password}
              id="password-input"
              name="password"
              autoComplete="on"
              required
              placeholder="Пароль"
              className="register__input"
              type="password"
            />
          </label>
          <button type="submit" className="register__button">
            Зарегистрироваться
          </button>
        </form>
        <p className="register__signin-title">
          Уже зарегистрированы?
          <Link to="/sign-in" className="register__signin-link">
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
