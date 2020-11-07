import React, { useContext } from "react";

import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export const Main = (props) => {
  // данные пользователя из контекста
  const { name, about, avatar, _id } = useContext(CurrentUserContext);

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
        {props.cards.slice(0, 10).map((card, index) => {
          return (
            <Card
              card={card}
              key={index}
              onCardClick={props.onCardClick}
              id={_id}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          );
        })}
        {props.children}
      </div>
    </>
  );
};
