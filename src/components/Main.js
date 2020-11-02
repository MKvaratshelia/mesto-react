import React, { useState, useContext, useEffect } from "react";
import { api } from "../utils/api";

import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardContext } from "../contexts/CardContext";

export const Main = (props) => {
  const [cards, setCards] = useState([]);
  // данные пользователя из контекста
  const { name, about, avatar, _id } = useContext(CurrentUserContext);
  const cardsContext = useContext(CardContext);

  useEffect(() => {
    setCards(cardsContext);
  }, [cardsContext]);

  // установка и снятие лайка с карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === _id);
    if (!isLiked) {
      api.addLike(card._id).then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        // Обновляем стейт
        setCards(newCards);
      });
    } else {
      api.deleteLike(card._id).then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        // Обновляем стейт
        setCards(newCards);
      });
    }
  }

  function handleCardDelete(card) {
    api.deleteCardFromServer(card._id);
    setCards(cards.filter((el) => el !== card));
  }

  return (
    <>
      <div className="profile root__section">
        <div className="user-info">
          <div
            className="user-info__photo"
            style={{ backgroundImage: `url(${avatar})` }}
            onClick={props.onEditAvatar}
          ></div>
          <div className="user-info__data">
            <h1 className="user-info__name">{name}</h1>
            <p className="user-info__job">{about}</p>
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
          return (
            <Card
              card={card}
              key={index}
              onCardClick={props.card}
              id={_id}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          );
        })}
        {props.children}
      </div>
    </>
  );
};
