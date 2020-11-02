import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "../components/PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name={"popup__user-info"}
      title={"Редактировать профиль"}
      button={"Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <input
        value={name}
        type="text"
        name="userName"
        className="popup__input popup__input_type_user-name"
        placeholder="Имя"
        required
        onChange={handleChangeName}
      />
      <p className="popup__name-error"></p>
      <input
        value={description}
        type="text"
        name="userJob"
        className="popup__input popup__input_type_user-job"
        placeholder="О себе"
        required
        onChange={handleChangeDescription}
      />
      <p className="popup__job-error"></p>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
