// import { useState } from "react";
import { useForm } from "../hooks/useForm";

function Login({ onLogin, openError }) {
  const { values, handleChange } = useForm({
    password: "",
    email: "",
  });

  //Обработчик отправки формы авторитизации
  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin(values.password, values.email).catch((err) => {
      openError();
    });
  };

  return (
    <section className="login">
      <div className="login__container">
        <p className="login__welcome">Вход</p>
        <form onSubmit={handleSubmit} className="login__form">
          <label className="login__form-field">
            <input
              onChange={handleChange}
              value={values.email}
              id="email-input"
              name="email"
              required
              placeholder="Email"
              className="login__input"
              type="text"
            />
          </label>
          <label className="login__form-field">
            <input
              onChange={handleChange}
              value={values.password}
              id="password-input"
              name="password"
              autoComplete="on"
              required
              placeholder="Пароль"
              className="login__input"
              type="password"
            />
          </label>
          <button type="submit" className="login__button">
            Войти
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
