function InfoTooltip({ title, img, isOpen, onClose }) {
  return (
    <div className={`infoTooltip  ${isOpen ? "infoTooltip_opened" : ""}`}>
      <div className="infoTooltip__container">
        <img src={img} alt="Значок" className="infoTooltip__image" />
        <h2 className="infoTooltip__title">{title}</h2>
        <button
          onClick={onClose}
          type="button"
          aria-label="Закрыть"
          className="infoTooltip__close-button"
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
