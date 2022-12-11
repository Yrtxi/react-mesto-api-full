function PopupWithApprove({ name, title, children }) {
  return (
    <div className={`popup popup_type_${name}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        {children}
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close-button popup__close-button_type_del"
        ></button>
      </div>
    </div>
  );
}

export default PopupWithApprove;
