import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import Card from "./Card";

export const Main = (props) => {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  // Получаем данные пользователя с сервера
  useEffect(() => {
    api.getUserInfo().then(({ avatar, about, name }) => {
      setUserName(name);
      setUserDescription(about);
      setUserAvatar(avatar);
    });
  }, [userName, userDescription, userAvatar]);

  // карточки с сервера
  useEffect(() => {
    api.getInitialCards().then((data) => {
      setCards(data);
    });
  }, [cards]);
  return (
    <>
      <div className="profile root__section">
        <div className="user-info">
          <div
            className="user-info__photo"
            style={{ backgroundImage: `url(${userAvatar})` }}
            onClick={props.onEditAvatar}
          ></div>
          <div className="user-info__data">
            <h1 className="user-info__name">{userName}</h1>
            <p className="user-info__job">{userDescription}</p>
            <button
              onClick={props.onEditProfile}
              className="button user-info__edit-button"
            >
              Edit
            </button>
          </div>
          <button
            onClick={props.onAddPlace}
            className="button user-info__button"
          >
            +
          </button>
        </div>
      </div>
      <div className="places-list root__section">
        {cards.map((card, index) => {
          return <Card data={card} key={index} onCardClick={props.card} />;
        })}
        {props.children}
      </div>
    </>
  );
};
