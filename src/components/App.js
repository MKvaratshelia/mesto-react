import React, { useState, useEffect } from "react";
import { api } from "../utils/api";
import { Header } from "./Header";
import { Main } from "./Main";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup ";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  // данные пользователя с свервера
  useEffect(() => {
    api.getUserInfo().then((data) => {
      setCurrentUser(data);
    });
  }, []);

  // карточки с сервера
  useEffect(() => {
    api.getInitialCards().then((data) => {
      setCards(data.reverse());
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

  function handleUpdateUser(newName, newDescription) {
    setLoading(true);
    setTimeout(() => {
      api.editProfile(newName, newDescription).then((res) => {
        setCurrentUser(res);
        setLoading(false);
      });
    }, 1000);
  }

  function handleUpdateAvatar(url) {
    setLoading(true);
    setTimeout(() => {
      api.newAvatar(url).then((res) => {
        setCurrentUser(res);
        setLoading(false);
      });
    }, 1000);
  }

  function handleUpdatePlace(place, url) {
    setLoading(true);
    setTimeout(() => {
      api.addNewCard(place, url).then((newCard) => {
        setCards([newCard, ...cards]);
        setLoading(false);
      });
    }, 1000);
  }

  // установка и снятие лайка с карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api.addLike(card._id).then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        // Обновляем стейт
        setCards(newCards);
      });
    } else {
      api.deleteLike(card._id).then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        // Обновляем стейт
        setCards(newCards);
      });
    }
  }

  function handleCardDelete(card) {
    api.deleteCardFromServer(card._id);
    setCards(cards.filter((el) => el !== card));
  }

  return (
    <>
      <Header />
      <CurrentUserContext.Provider value={currentUser}>
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        >
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={() => closeAllPopups(setIsAddPlacePopupOpen)}
            onUpdatePlace={handleUpdatePlace}
            loading={loading}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={() => closeAllPopups(setIsEditProfilePopupOpen)}
            onUpdateUser={handleUpdateUser}
            loading={loading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={() => closeAllPopups(setIsEditAvatarPopupOpen)}
            onUpdateAvatar={handleUpdateAvatar}
            loading={loading}
          />
          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={() => closeAllPopups(setImagePopupOpen)}
          />
        </Main>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
