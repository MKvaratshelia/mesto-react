import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "../components/PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const currentUser = useContext(CurrentUserContext);
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(event) {
    event.target.value.length === 0 ? setNameError(true) : setNameError(false);
    setName(event.target.value);
  }

  function handleChangeDescription(event) {
    event.target.value.length === 0
      ? setDescriptionError(true)
      : setDescriptionError(false);
    setDescription(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(name, description);
  }

  return (
    <PopupWithForm
      name={"popup__user-info"}
      title={"Редактировать профиль"}
      button={"Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      loading={props.loading}
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
      {nameError ? (
        <p className="popup__name-error">Поле не может быть пустым</p>
      ) : null}

      <input
        value={description}
        type="text"
        name="userJob"
        className="popup__input popup__input_type_user-job"
        placeholder="О себе"
        required
        onChange={handleChangeDescription}
      />
      {descriptionError ? (
        <p className="popup__job-error">Поле не может быть пустым</p>
      ) : null}
    </PopupWithForm>
  );
}

export default EditProfilePopup;
