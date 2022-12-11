//Импорт
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({
  onCardClick,
  onEditAvatar,
  onEditProfile,
  onEditPlace,
  cards,
  onCardLike,
  onCardDelete,
}) {
  //Подписываемся на контекст с данными пользователя
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <section className="profile">
        <button onClick={onEditAvatar} className="profile__change-button">
          <div className="profile__overlay"></div>
          <img
            src={currentUser.avatar}
            alt="Аватар"
            className="profile__avatar"
          />
        </button>
        <div className="profile__info">
          <div className="profile__content">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={onEditProfile}
              type="button"
              aria-label="Редактировать"
              className="profile__edit-button"
            ></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          onClick={onEditPlace}
          type="button"
          aria-label="Добавить"
          className="profile__add-button"
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </>
  );
}

export default Main;
