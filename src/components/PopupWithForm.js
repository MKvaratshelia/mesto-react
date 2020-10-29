import React from "react";
import close from "../images/close.svg";

function PopupWithForm({ isOpen, title, name, children, button, onClose }) {
  const cls = isOpen ? "popup_is-opened" : "";

  return (
    <div className={`popup ${name} ${cls}`}>
      <div className="popup__content">
        <img src={close} alt="" className="popup__close" onClick={onClose} />
        <h3 className="popup__title">{title}</h3>
        <form className="popup__form" name={name}>
          {children}
          <button
            type="submit"
            disabled
            className="button popup__button popup__button_add"
          >
            {button}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
