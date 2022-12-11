//Импорт
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  //Подписываемся на контекст с данными пользователя
  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `element__delete-button ${
    isOwn ? "element__delete-button_visible" : "element__delete-button_hidden"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? "element__like-button_active" : " "
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="element">
      <div className="element__background"></div>
      <img
        onClick={handleClick}
        src={card.link}
        className="element__image"
        alt={card.name}
      />
      <button
        onClick={handleDeleteClick}
        type="button"
        aria-label="Закрыть"
        className={cardDeleteButtonClassName}
      ></button>
      <div className="element__content">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__container-like">
          <button
            onClick={handleLikeClick}
            type="button"
            aria-label="Нравится"
            className={cardLikeButtonClassName}
          ></button>
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
