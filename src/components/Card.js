import React from "react";

function Card({ data, onCardClick }) {
  return (
    <div className="place-card" onClick={onCardClick.bind(null, data)}>
      <div
        className="place-card__image"
        style={{ backgroundImage: `url(${data.link})` }}
      >
        <button className="place-card__delete-icon"></button>
      </div>
      <div className="place-card__description">
        <h3 className="place-card__name">{data.name}</h3>
        <div className="place-card__container">
          <button className="place-card__like-icon"></button>
          <span className="place-card__like-count">{data.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
