import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import { Header } from "./Header";
import { Main } from "./Main";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardContext } from "../contexts/CardContext";
import EditProfilePopup from "./EditProfilePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  // данные пользователя с свервера
  useEffect(() => {
    api.getUserInfo().then((data) => {
      setCurrentUser(data);
    });
  }, []);

  // карточки с сервера
  useEffect(() => {
    api.getInitialCards().then((data) => {
      // const dataReverse = data.reverse().slice(0, 10);
      const dataReverse = [...data.reverse().slice(0, 10)];
      setCards(dataReverse);
    });
  }, []);

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
      <CurrentUserContext.Provider value={currentUser}>
        <CardContext.Provider value={cards}>
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
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={() => closeAllPopups(setIsEditProfilePopupOpen)}
            />
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
        </CardContext.Provider>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
