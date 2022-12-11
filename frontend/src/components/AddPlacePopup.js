import PopupWithForm from "./PopupWIthForm";
import { useForm } from "../hooks/useForm";
import { useEffect } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { values, handleChange, setValues } = useForm({
    place: "",
    link: "",
  });

  //очищаем инпуты при открытии
  useEffect(() => {
    setValues({
      place: "",
      link: "",
    });
  }, [isOpen, setValues]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name: values.place,
      link: values.link,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          onChange={handleChange}
          value={values.place}
          id="place-input"
          name="place"
          required
          placeholder="Название"
          className="popup__input popup__input_data_place"
          maxLength="30"
          minLength="2"
          type="text"
        />
        <span className="place-input-error popup__error"></span>
      </label>
      <label className="popup__form-field">
        <input
          onChange={handleChange}
          value={values.link}
          id="link-input"
          name="link"
          required
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_data_link"
          type="url"
        />
        <span className="link-input-error popup__error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
