const popupProfile = document.querySelector(".popup");
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
const buttonElement = document.querySelector(".form__button");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const CardList = document.querySelector('.card-list');
const CardTemplate = document.querySelector('.elements-template');
const PopupImage = document.querySelector('.popup__image');
const PopupImageTitle = document.querySelector('.popup__image-title');
const formInput = document.querySelector('.form__input');




// Шаблоны

const cardTemplate = document
  .querySelector(".elements-template")
  .content.querySelector(".element");

// Обработчики событий

const handleDeleteCard = (event) => {
  event.target.closest('.element').remove();
};

// Генерация карточки

const generateCard = (data) => {
  const newCard = cardTemplate.cloneNode(true);
  const linkCard = newCard.querySelector('.element__item');

  const titleCard = newCard.querySelector('.element__title');
  const cardDeleteButton = newCard.querySelector('.element__trash');
  const cardLikeButton = newCard.querySelector(".element__like");

  titleCard.textContent = data.name;
  linkCard.src = data.link;
  linkCard.alt = data.name;

  cardLikeButton.addEventListener("click", aktivLike);
  cardDeleteButton.addEventListener('click', handleDeleteCard);
  linkCard.addEventListener("click", () => imagePopUpPreview(data));

  return newCard;
}

// Рендер карточки

const renderCard = (data) => {
  CardList.prepend(generateCard(data));
};

initialCards.forEach((data) => {
  renderCard(data);
});

function aktivLike(event) {
  event.target.closest(".element__like").classList.toggle("element_like-active");
}

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

function SubmitHandlerProfileForm (event) {
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
  closePopUp(popupAddCard);
};

function imagePopUpPreview(data) {
  PopupImage.src = data.link;
  PopupImageTitle.textContent = data.name;
  PopupImage.alt = data.name;
  openPopUp(popupPreview);
}

popupCloseButtonProfile.addEventListener("click", () => closePopUp(popupProfile));
popupCloseButtonCard.addEventListener("click", () => closePopUp(popupAddCard));
popupCloseButtonPreview.addEventListener("click", () => closePopUp(popupPreview));

profileEditButton.addEventListener("click", () => openPopUp(popupProfile));
profileAddButton.addEventListener("click", () => openPopUp(popupAddCard));
formProfile.addEventListener("submit", SubmitHandlerProfileForm);
formCreateCard.addEventListener("submit", handleSubmitAddCardForm);






