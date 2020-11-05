import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(inputRef.current.value);
  }
  return (
    <PopupWithForm
      name={"popup__avatar"}
      title={"Обновить аватар"}
      button={"Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      loading={props.loading}
    >
      <input
        ref={inputRef}
        type="url"
        name="userAvatar"
        className="popup__input popup__input_type_avatar"
        placeholder="Ссылка на аватар"
        required
      />
      <p className="popup__name-error"></p>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
