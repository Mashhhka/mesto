import { Card } from "./Card.js";
import { initialCards } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { selectors } from "./FormValidator.js";



const popupProfile = document.querySelector(".popup_profile");
const popupAddCard = document.querySelector(".popup_add-card");
const popupPreview = document.querySelector(".popup_preview");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupCloseButtonProfile = document.querySelector(".popup__close-button_profile");
const popupCloseButtonCard = document.querySelector(".popup__close-button_card");
const popupCloseButtonPreview = document.querySelector(".popup__close-button_preview");
const formProfile = document.querySelector(".form");
const formCreateCard = document.querySelector(".form_create-card");
const nameInput = document.querySelector(".form__input_type_user-name");
const jobInput = document.querySelector(".form__input_type_user-job");
const linkCardInput = document.querySelector(".form__input_type_link-card");
const titleCardInput = document.querySelector(".form__input_type_title-card");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const cardList = document.querySelector('.card-list');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');




const renderCard = (item) => {
  const card = new Card(item,"#card");
  const cardElement = card.generateCard();
  cardList.prepend(cardElement);
};

initialCards.forEach((data) => {
  renderCard(data);
});


function openPopUp(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closeEsc);
}

function closePopUp(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeEsc);
}

function closeEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened');
    closePopUp(popupOpened);
  };
}

function submitHandlerProfileForm (event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopUp(popupProfile);
}

//Закрытия popup при клике по overlay
const popups = Array.from(document.querySelectorAll('.popup'));
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopUp(popup);
  }});
});


const handleSubmitAddCardForm = (event) => {
  event.preventDefault();

  renderCard({ name: titleCardInput.value, link: linkCardInput.value });
  titleCardInput.value = "";
  linkCardInput.value = "";
  const buttonSubmitCard = formCreateCard.querySelector(".form__button");
  buttonSubmitCard.classList.add('button_inactive');
  buttonSubmitCard.setAttribute('disabled', true);
  closePopUp(popupAddCard);


};


function openImagePopUpPreview(name, link) {
  popupImage.src = link;
  popupImageTitle.textContent = name;
  popupImage.alt = name;
  openPopUp(popupPreview);
}


const openEditProfile = function () {
  openPopUp(popupProfile);
	nameInput.value = profileTitle.textContent;
	jobInput.value = profileSubtitle.textContent;
}

const formProfileValidate = new FormValidator(selectors, popupProfile);
formProfileValidate.enableValidation();

const formAddCardValidate = new FormValidator(selectors, popupAddCard);
formAddCardValidate.enableValidation();

popupCloseButtonProfile.addEventListener("click", () => closePopUp(popupProfile));
popupCloseButtonCard.addEventListener("click", () => closePopUp(popupAddCard));
popupCloseButtonPreview.addEventListener("click", () => closePopUp(popupPreview));

profileEditButton.addEventListener("click", () => openEditProfile(popupProfile));
profileAddButton.addEventListener("click", () => openPopUp(popupAddCard));
formProfile.addEventListener("submit", submitHandlerProfileForm);
formCreateCard.addEventListener("submit", handleSubmitAddCardForm);

export { openImagePopUpPreview };


