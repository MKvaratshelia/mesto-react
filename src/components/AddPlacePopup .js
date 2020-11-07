import React, { useState } from "react";

import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [place, setPlace] = useState("");
  const [url, setUrl] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdatePlace(place, url);
  }

  function handleChangePlace(e) {
    setPlace(e.target.value);
  }
  function handleChangeUrl(e) {
    setUrl(e.target.value);
  }

  return (
    <PopupWithForm
      name={"popup-place"}
      title={"Новое место"}
      button={"+"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      loading={props.loading}
    >
      <input
        value={place}
        type="text"
        name="name"
        className="popup__input popup__input_type_name"
        placeholder="Название"
        required
        onChange={handleChangePlace}
      />
      <input
        value={url}
        type="url"
        name="link"
        className="popup__input popup__input_type_link-url"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChangeUrl}
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
