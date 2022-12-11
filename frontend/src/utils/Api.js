export const headers = {
  "Content-Type": "application/json",
};

export class Api {
  constructor(headers, token) {
    this._url = "https://api.mestoyrtx.students.nomoredomains.club";
    this._headers = headers;
    this._token = token;
  }

  //Устанавливаем токен в заголовки запроса
  _setToken(token) {
    this._headers.Authorization = `Bearer ${token}`;
  }

  //Обрабатываем ответ сервера
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Метод для получения инфомации о пользователе
  getInfoUser(token) {
    this._setToken(token);
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  //Метод редактирования профиля
  setUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then(this._handleResponse);
  }

  //Метод для получения массива первоночальных карточек
  getInitialCards(token) {
    this._setToken(token);
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  //Метод добавления новой карточки
  addNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then(this._handleResponse);
  }

  //Метод удаления карточки
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  //Метод установки лайка
  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  //Метод на смену аватара
  changeAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    }).then(this._handleResponse);
  }
}

//Создаем экземпляр класса Api
const api = new Api(headers);

export default api;
