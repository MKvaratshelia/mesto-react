import { optionsApi } from "./utils";

export default class Api {
  constructor(options) {
    this.options = options;
  }
  getUserInfo() {
    return (
      fetch(this.options.baseUrl + "/users/me", {
        headers: this.options.headers,
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }

          return Promise.reject(`Ошибка: ${res.status}`);
        })
        // .then((data) => {})
        .catch((err) => {
          console.log(err);
        })
    );
  }
  getInitialCards() {
    return fetch(this.options.baseUrl + "/cards", {
      headers: this.options.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  editProfile(newName, newJob) {
    return fetch(this.options.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify({
        name: newName,
        about: newJob,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
    // .finally(() => buttonLoad(false, popupButtonSave, "Сохранить"));
  }
  addNewCard(place, url) {
    return fetch(this.options.baseUrl + "/cards", {
      method: "POST",
      headers: this.options.headers,
      body: JSON.stringify({
        name: place,
        link: url,
      }),
    })
      .then((result) => {
        if (result.ok) {
          return result.json();
        }
        return Promise.reject(`Ошибка: ${result.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
    // .finally(() => buttonLoad(false, popupButtonAdd, "+"));
  }
  addLike(id) {
    return fetch(this.options.baseUrl + `/cards/like/${id}`, {
      method: "PUT",
      headers: this.options.headers,
      body: JSON.stringify({
        owner: {
          _id: "033a1b11aedbbdef4a2f8447",
        },
      }),
    })
      .then((result) => {
        if (result.ok) {
          return result.json();
        }
        return Promise.reject(`Ошибка: ${result.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => console.log(err));
  }
  deleteLike(id) {
    return fetch(this.options.baseUrl + `/cards/like/${id}`, {
      method: "DELETE",
      headers: this.options.headers,
      body: JSON.stringify({
        owner: {
          _id: "033a1b11aedbbdef4a2f8447",
        },
      }),
    })
      .then((result) => {
        if (result.ok) {
          return result.json();
        }
        return Promise.reject(`Ошибка: ${result.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => console.log(err));
  }
  deleteCardFromServer(id) {
    return fetch(this.options.baseUrl + `/cards/${id}`, {
      method: "DELETE",
      headers: this.options.headers,
      body: JSON.stringify({
        owner: {
          _id: "033a1b11aedbbdef4a2f8447",
        },
      }),
    })
      .then((result) => {
        if (result.ok) {
          return result.json();
        }
        return Promise.reject(`Ошибка: ${result.status}`);
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  newAvatar(avatarUrl) {
    return (
      fetch(this.options.baseUrl + "/users/me/avatar", {
        method: "PATCH",
        headers: this.options.headers,
        body: JSON.stringify({
          avatar: avatarUrl,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        // .then((res) => {
        //   userAvatar.style.backgroundImage = `url(${res.avatar})`;
        // })
        .catch((err) => console.log(err))
    );
    // .finally(() => buttonLoad(false, avatarButton, "Сохранить"));
  }
}

export const api = new Api(optionsApi);
