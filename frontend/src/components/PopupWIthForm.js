function PopupWithForm({
  name,
  title,
  isOpen,
  buttonText,
  children,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          onSubmit={onSubmit}
          name={`form_type_${name}`}
          className="popup__form popup__form_type_edit"
          noValidate
        >
          {children}
          <button type="submit" className="popup__button">
            {buttonText}
          </button>
        </form>
        <button
          onClick={onClose}
          type="button"
          aria-label="Закрыть"
          className="popup__close-button"
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
