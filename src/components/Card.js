import React from "react";

function Card({ card, onCardClick, id, onCardLike, onCardDelete }) {
  const isOwn = card.owner._id === id;
  const isLiked = card.likes.some((i) => i._id === id);

  const LikeButtonClassName = `${
    isLiked
      ? "place-card__like-icon place-card__like-icon_liked"
      : "place-card__like-icon"
  }`;

  function handleLikeClick() {
    return onCardLike(card);
  }

  function handleDeleteClick(e) {
    e.stopPropagation();
    if (window.confirm("Вы действительно хотите удалить карточку?")) {
      return onCardDelete(card);
    }
  }

  function handleCardClick() {
    return onCardClick(card);
  }

  return (
    <div className="place-card">
      <div
        className="place-card__image"
        style={{ backgroundImage: `url(${card.link})` }}
        onClick={handleCardClick}
      >
        {isOwn ? (
          <button
            className={"place-card__delete-icon"}
            onClick={(e) => handleDeleteClick(e)}
          ></button>
        ) : null}
      </div>
      <div className="place-card__description">
        <h3 className="place-card__name">{card.name}</h3>
        <div className="place-card__container">
          <button
            className={LikeButtonClassName}
            // onClick={onCardLike.bind(null, card)}
            onClick={handleLikeClick}
          ></button>
          <span className="place-card__like-count">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
