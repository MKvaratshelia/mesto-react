import React, { useState } from "react";
import { Header } from "./Header";
import { Main } from "./Main";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups(props) {
    props(false);
  }

  function handleCardClick(card) {
    setImagePopupOpen(true);
    setSelectedCard(card);
  }

  return (
    <>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        card={handleCardClick}
      >
        <PopupWithForm
          name={"popup-place"}
          title={"Новое место"}
          button={"+"}
          isOpen={isAddPlacePopupOpen}
          onClose={() => closeAllPopups(setIsAddPlacePopupOpen)}
        >
          <input
            type="text"
            name="name"
            className="popup__input popup__input_type_name"
            placeholder="Название"
            required
          />
          <input
            type="url"
            name="link"
            className="popup__input popup__input_type_link-url"
            placeholder="Ссылка на картинку"
            required
          />
        </PopupWithForm>
        <PopupWithForm
          name={"popup__user-info"}
          title={"Редактировать профиль"}
          button={"Сохранить"}
          isOpen={isEditProfilePopupOpen}
          onClose={() => closeAllPopups(setIsEditProfilePopupOpen)}
        >
          <input
            type="text"
            name="userName"
            className="popup__input popup__input_type_user-name"
            placeholder="Имя"
            required
          />
          <p className="popup__name-error"></p>
          <input
            type="text"
            name="userJob"
            className="popup__input popup__input_type_user-job"
            placeholder="О себе"
            required
          />
          <p className="popup__job-error"></p>
        </PopupWithForm>
        <PopupWithForm
          name={"popup__avatar"}
          title={"Обновить аватар"}
          button={"Сохранить"}
          isOpen={isEditAvatarPopupOpen}
          onClose={() => closeAllPopups(setIsEditAvatarPopupOpen)}
        >
          <input
            type="url"
            name="userAvatar"
            className="popup__input popup__input_type_avatar"
            placeholder="Ссылка на аватар"
            required
          />
          <p className="popup__name-error"></p>
        </PopupWithForm>
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={() => closeAllPopups(setImagePopupOpen)}
        />
      </Main>
    </>
  );
}

export default App;
