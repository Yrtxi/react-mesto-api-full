export const BASE_URL = "https://api.mestoyrtx.students.nomoredomains.club";

const request = ({ url, method = "POST", data, token }) => {
  return fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(!!token && { Authorization: `Bearer ${token}` }),
    },
    ...(!!data && { body: JSON.stringify(data) }),
  }).then((res) => {
    if (!res.ok) return Promise.reject(res.status);
    return res.json();
  });
};

//Запрос для регистрации
export const register = (password, email) => {
  return request({ url: "/signup", data: { password, email } });
};

//Запрос для авторизации
export const authorize = (password, email) => {
  return request({ url: "/signin", data: { password, email } });
};

//Запрос для проверки валидности токена и получения emaila для вставки в шапку сайта
export const getContent = (token) => {
  return request({ url: "/users/me", method: "GET", token });
};

