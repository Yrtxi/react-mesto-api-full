import PopupWithForm from "./PopupWIthForm";
import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "../hooks/useForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  // Подписываемся на контекст с данными пользователя
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({
    name: currentUser.name,
    job: currentUser.about,
  });

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setValues({
      name: currentUser.name,
      job: currentUser.about,
    });
  }, [currentUser, isOpen, setValues]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: values.name,
      about: values.job,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          value={values.name || ""}
          onChange={handleChange}
          id="name-input"
          name="name"
          required
          placeholder="Имя"
          className="popup__input popup__input_data_name"
          type="text"
          maxLength="40"
          minLength="2"
        />
        <span className="name-input-error popup__error"></span>
      </label>
      <label className="popup__form-field">
        <input
          value={values.job || ""}
          onChange={handleChange}
          id="job-input"
          name="job"
          required
          placeholder="О себе"
          className="popup__input popup__input_data_job"
          type="text"
          maxLength="200"
          minLength="2"
        />
        <span className="job-input-error popup__error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
