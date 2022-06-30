import { openPicture } from "./index.js";

export class Card {
  constructor(title, link, templateSelector) {
    this._title = title;
    this._link = link;
    this._templateSelector = templateSelector;
  };

  _getTemplate() {
    const elementTemplate = document.querySelector(this._templateSelector);
    const cardElement = elementTemplate.content.firstElementChild.cloneNode(true);
    return cardElement;
  };

  //удаление карточки
  _deleteCard = () => {
    this._element.remove();
    this._element = null;
  };

  //лайк
  _likeActive(event) {
    event.target.classList.toggle("element__heart_active");
  };

  _setEventListners() {
    this._element.querySelector(".element__delete-icon").addEventListener("click", this._deleteCard);
    this._element.querySelector(".element__heart").addEventListener("click", this._likeActive);
    this._element.querySelector(".element__image").addEventListener("click", () => { openPicture(this._title, this._link) });
  };

  generateCard() {
    this._element = this._getTemplate();

    const cardElementImage = this._element.querySelector(".element__image");
    const cardElementTitle = this._element.querySelector(".element__text");
    cardElementImage.setAttribute("src", this._link);
    cardElementImage.setAttribute("alt", this._title);
    cardElementTitle.textContent = this._title;

    this._setEventListners();

    return this._element;
  };

}





export class FormValidator {
  constructor(selectors, formElement) {
    this._selectors = selectors;
    this._submitButton = formElement.querySelector(selectors.submitButtonSelector);
    this._formElement = formElement;
  };
  // Функция, которая добавляет класс с ошибкой
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(this._selectors.inputErrorClass);
    errorElement.classList.add(this._selectors.errorClass);
    errorElement.textContent = errorMessage;
  };

  // Функция, которая удаляет класс с ошибкой
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(this._selectors.inputErrorClass);
    errorElement.classList.remove(this._selectors.errorClass);
    errorElement.textContent = " ";
  };

  // Функция, которая проверяет валидность поля
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      // Если проходит, скроем
      this._hideInputError(inputElement);
    }
  };

  //проверяем поля ввода на корректность
  _hasInvalidInput(inputList) {
    return inputList.some(input => !input.validity.valid)
  };

  //функция изменения состояния кнопки
  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._submitButton.classList.add(this._selectors.inactiveButtonClass);
      this._submitButton.setAttribute("disabled", true);
    } else {
      this._submitButton.classList.remove(this._selectors.inactiveButtonClass);
      this._submitButton.removeAttribute("disabled");
    }
  };

  //функция добавляет обработчики сразу всем полям формы
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
    this._toggleButtonState(inputList);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList);
      });
    });
  };

  //находим и перебираем все формы на странице
  enableValidation() {
    this._setEventListeners();
  }

  //Функция сброса ошибок
  restartFormValidation() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
    this._toggleButtonState(inputList);

    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}




import { Card } from "./Card.js";
import { initialCards } from "./initial-cards.js";
import { FormValidator } from "./FormValidator.js";

const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup-edit");
const popupAdd = document.querySelector(".popup-add");
const popupImg = document.querySelector(".popup-img");
const closeButtonEdit = document.querySelector(".popup__close-button_edit");
const closeButtonAdd = document.querySelector(".popup__close-button_add");
const closeButtonImg = document.querySelector(".popup__close-button_img");
const formElementEdit = document.querySelector(".popup__form_profile");
const formElementAdd = document.querySelector(".popup__form_add");
const nameInput = document.getElementById("popup-text-check-name");
const jobInput = document.getElementById("popup-text-check-job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const addButton = document.querySelector(".profile__add-button");
const elements = document.querySelector(".elements");
const popupName = document.getElementById("popup-text-place-name");
const popupLink = document.getElementById("popup-text-place-source");
const cardName = popupImg.querySelector(".popup__element-text");
const cardImage = popupImg.querySelector(".popup__element-image");
const saveButtonPopupAdd = document.querySelector(".popup__save-button");

//вызов валидации
const selectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active"
}

//открытие попапа
function openPopup(popup) {
  formElementAdd.reset();
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupClickEsc);
  popup.addEventListener("mousedown", closePopupClickOverlay);
  formEditProfileValidator.restartFormValidation();
  formAddCardValidator.restartFormValidation();
}

//закрытие попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupClickEsc);
  popup.removeEventListener("mousedown", closePopupClickOverlay);
}

//закрытие попапа кликом на оверлей
function closePopupClickOverlay(e) {
  if (e.target === e.currentTarget) {
    closePopup(e.currentTarget)
  }
}

//закрытие попапа кликом на ESC
function closePopupClickEsc(e) {
  if (e.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened")
    closePopup(popupOpened)
  }
}

//обработчик отправки формы для редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}
formElementEdit.addEventListener("submit", handleProfileFormSubmit);

//открытие 3 попапа
function openPicture(title, link) {
  cardName.textContent = title;
  cardImage.alt = title;
  cardImage.src = link;
  openPopup(popupImg);
}


//обработчик отправки формы для добавления карточек
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const myNewCard = { title: popupName.value, link: popupLink.value };
  addNewCard(myNewCard);
  // Очищаем поля формы
  closePopup(popupAdd);
  formElementAdd.reset();
}

formElementAdd.addEventListener("submit", handleCardFormSubmit);

//функция создания новых карточек
function createCard(title, link) {

  return (new Card(title, link, "#card")).generateCard();
}

//функция добавления карточки в контейнер
function addNewCard(card) {
  elements.prepend(createCard(card.title, card.link));
}
initialCards.forEach(card => { addNewCard(card) });


//обработчики событий
editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEdit);
}
);
closeButtonEdit.addEventListener("click", () => closePopup(popupEdit));
addButton.addEventListener("click", () => { openPopup(popupAdd), formElementAdd.reset() });
closeButtonAdd.addEventListener("click", () => closePopup(popupAdd));
closeButtonImg.addEventListener("click", () => closePopup(popupImg));

//для каждой формы включаю экземпляр валидатора и включаю валидацию.
const formEditProfile = document.querySelector(".popup-edit");
const formEditProfileValidator = new FormValidator(selectors, formEditProfile);
formEditProfileValidator.enableValidation();

const formAddCard = document.querySelector(".popup-add");
const formAddCardValidator = new FormValidator(selectors, formAddCard);
formAddCardValidator.enableValidation();


export { openPicture };
