import React from "react";
import close from "../images/close.svg";

function PopupWithForm(props) {
  const cls = props.isOpen ? "popup_is-opened" : "";

  return (
    <div className={`popup ${props.name} ${cls}`}>
      <div className="popup__content">
        <img
          src={close}
          alt=""
          className="popup__close"
          onClick={props.onClose}
        />
        <h3 className="popup__title">{props.title}</h3>
        <form className="popup__form" name={props.name}>
          {props.children}
          <button
            type="submit"
            disabled
            className="button popup__button popup__button_add"
          >
            {props.button}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
