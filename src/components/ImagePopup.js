import React from "react";
import close from "../images/close.svg";

const ImagePopup = ({ card, isOpen, onClose }) => {
  const cls = isOpen ? "popup_is-opened" : "";

  return (
    <div className={`popup popup_image ${cls}`}>
      <div className="popup__image-container">
        <img src={card.link} alt="" className="popup__src-image" />
        <img
          src={close}
          alt=""
          className="popup__close popup__image-close"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default ImagePopup;
