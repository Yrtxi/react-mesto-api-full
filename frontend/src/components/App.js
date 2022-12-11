//Импорт
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import EditProfilePopup from "../components/EditProfilePopup";
import EditAvatarPopup from "../components/EditAvatarPopup";
import AddPlacePopup from "../components/AddPlacePopup";
import PopupWithApprove from "../components/PopupWithApprove";
import ImagePopup from "../components/ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import TooltipConfirm from "../components/TooltipConfirm";
import TooltipRefusal from "../components/TooltipRefusal";
import * as Auth from "../utils/Auth";
import MobileMenu from "./MobileMenu";

function App() {
  //Переменные cостояния открытия попапов
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);

  //Переменные состояния открытия тултипов
  const [isConfirmTooltipOpen, setIsConfirmTooltipOpen] = useState(false);
  const [isRefusalTooltipOpen, setIsRefusalTooltipOpen] = useState(false);

  //Переменная состояния выбранной карточки
  const [selectedCard, setSelectedCard] = useState({});

  //Переменная состояния текущего пользователя
  const [currentUser, setCurrentUser] = useState({});

  //Переменная состояния карточек
  const [cards, setCards] = useState([]);

  //Переменная состояния навигации(история)
  const navigate = useNavigate();

  //Переменная состояния данных пользователя (email)
  const [userEmail, setUserEmail] = useState("");

  //Переменная состояния статуса пользователя (залогинился или нет)
  const [loggedIn, setLoggedIn] = useState(false);

  //Переменная состояния открытия мобильного меню
  const [menuOpen, setMenuOpen] = useState(false);

  //Функция открытия мобильного меню
  const handleOpenMobileMenu = () => {
    setMenuOpen(!menuOpen);
  };

  //Логика авторитизации пользователя
  const handleLogin = (password, email) => {
    return Auth.authorize(password, email).then((data) => {
      if (!data.token) throw new Error("Не найден jwt");
      localStorage.setItem("jwt", data.token);
      setLoggedIn(true);
      navigate("/");
    });
  };

  //Логика регистрации пользователя
  const handleRegister = (password, email) => {
    return Auth.register(password, email).then((data) => {
      openConfirmTooltip();
      navigate("/sign-in");
    });
  };

  //Проверяем токен и при его наличии отрисовываем страницу
  useEffect(() => {
    const tokenCheck = () => {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) return;
      Auth.getContent(jwt).then((res) => {
        setUserEmail(res.email);
        setLoggedIn(true);
        navigate("/");
      });
    };
    tokenCheck();
  }, [navigate]);

  //Функция выхода из профиля
  function handleSignOut() {
    setUserEmail("");
    setMenuOpen(false);
    localStorage.removeItem("jwt");
    navigate("/sign-in");
  }

  //Получаем массив карточек
  useEffect(() => {
    const tokenCheck = () => {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) return;
      api
        .getInitialCards(jwt)
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
    };
    tokenCheck();
  }, [navigate]);

  //Получаем данные пользователя
  useEffect(() => {
    const tokenCheck = () => {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) return;
      api
        .getInfoUser(jwt)
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
    };
    tokenCheck();
  }, [navigate]);

  //Обработчик кнопки лайка
  function handleCardLike(card) {
    //Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    //Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
  }

  //Обработчик кнопки удаления
  function handleCardDelete(card) {
    //Отправляем запрос в API и удаляем карточку
    api
      .deleteCard(card._id)
      .then((res) => {
        //Передаем в setCards копию массива без удаленной карточки
        setCards(cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
  }

  //Обработчик добавления новой карточки
  function handleAddPlace({ name, link }) {
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopus();
      })
      .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
  }

  //Обработчик обновления данных пользователя
  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo({ name: name, about: about })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopus();
      })
      .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
  }

  //Обработчик обновления аватара
  function handleUpdateAvatar(avatar) {
    api
      .changeAvatar(avatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopus();
      })
      .catch((err) => console.log(`Ошибка загрузки данных: ${err}`));
  }

  //Функция закрытия всех попапов
  function closeAllPopus() {
    setisEditAvatarPopupOpen(false);
    setisEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setIsConfirmTooltipOpen(false);
    setIsRefusalTooltipOpen(false);
    setSelectedCard({});
  }

  //Функция открытия потверждающего тултипа
  function openConfirmTooltip() {
    setIsConfirmTooltipOpen(true);
  }

  //Функция открытия тултипа-ошибки
  function openRefusalTooltip() {
    setIsRefusalTooltipOpen(true);
  }

  //Обработчик клика по карточке
  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  //Обработчик клика по кнопке смены аватара
  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true);
  }

  //Обработчик клика по кнопке редактирования профайла
  function handleEditProfileClick() {
    setisEditProfilePopupOpen(true);
  }

  //Обработчик клика по кнопке добавления карточки
  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <MobileMenu
          isOpen={menuOpen}
          email={userEmail}
          signOut={handleSignOut}
        />

        <Header
          email={userEmail}
          signOut={handleSignOut}
          openMenu={handleOpenMobileMenu}
          isActive={menuOpen}
        />

        <main className="content">
          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onEditPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                ) : (
                  <Navigate to="/sign-up" />
                )
              }
            ></Route>

            <Route
              path="/sign-up"
              element={
                <Register
                  onRegister={handleRegister}
                  openError={openRefusalTooltip}
                />
              }
            ></Route>

            <Route
              path="/sign-in"
              element={
                <Login onLogin={handleLogin} openError={openRefusalTooltip} />
              }
            ></Route>
          </Routes>
        </main>

        <Footer />

        <TooltipConfirm isOpen={isConfirmTooltipOpen} onClose={closeAllPopus} />

        <TooltipRefusal isOpen={isRefusalTooltipOpen} onClose={closeAllPopus} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopus}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopus}
          onAddPlace={handleAddPlace}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopus}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithApprove name="approve" title="Вы уверены?">
          <div className="popup__wrapper">
            <button type="submit" className="popup__button">
              Да
            </button>
          </div>
        </PopupWithApprove>

        <ImagePopup card={selectedCard} onClose={closeAllPopus} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
