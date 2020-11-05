import React from "react";
import close from "../images/close.svg";

function PopupWithForm({
  isOpen,
  title,
  name,
  children,
  button,
  onClose,
  onSubmit,
  loading,
}) {
  const cls = isOpen ? "popup_is-opened" : "";
  const buttonDescription = loading ? "Загрузка..." : button;

  return (
    <div className={`popup ${name} ${cls}`}>
      <div className="popup__content">
        <img src={close} alt="" className="popup__close" onClick={onClose} />
        <h3 className="popup__title">{title}</h3>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          {children}
          <button
            disabled={loading ? true : false}
            type="submit"
            className="button popup__button popup__button_add"
          >
            {buttonDescription}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
