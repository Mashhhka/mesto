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
}

function closePopUp(popup) {
  popup.classList.remove("popup_opened");
}

function SubmitHandlerProfileForm (event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopUp(popupProfile);
}

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





const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
});
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("button_inactive");
  } else {
    buttonElement.classList.remove('button_inactive');
  }
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });
    setEventListeners(formElement)
    });
  };
  enableValidation();
