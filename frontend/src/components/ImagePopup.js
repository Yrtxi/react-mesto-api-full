function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_type_image ${card.link ? "popup_opened" : ""}`}
    >
      <div className="popup__background">
        <button
          onClick={onClose}
          type="button"
          aria-label="Закрыть"
          className="popup__close-button"
        ></button>
        <img src={card.link} alt={card.name} className="popup__image" />
        <p className="popup__subtitle">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
