const popup = document.querySelector(".popup");
const popupAddCard = document.querySelector(".popup_add-card");
const popupPreview = document.querySelector(".popup_preview");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButton = document.querySelectorAll(".popup__close-button");
const formElement = document.querySelector(".form");
const formCreateCard = document.querySelector(".form_create-card");
const nameInput = document.querySelector(".form__input_type_user-name");
const jobInput = document.querySelector(".form__input_type_user-job");
const linkCardInput = document.querySelector(".form__input_type_link-card");
const titleCardInput = document.querySelector(".form__input_type_title-card");
const formButton = document.querySelector(".form__button");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const CardList = document.querySelector('.card-list');
const CardTemplate = document.querySelector('.elements-template');
const PopupImage = document.querySelector('.popup__image');
const PopupImageTitle = document.querySelector('.popup__image-title');



let initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


// Шаблоны

const cardTemplate = document
  .querySelector(".elements-template")
  .content.querySelector(".element");

// Обработчики событий

const handleDeleteCard = (event) => {
  event.target.closest('.element').remove();
};

const handleDeleteTodoCard = (event) => {
  event.target.closest('.element').remove();
};
// Генерация карточки

const generateCard = (data) => {
  const newCard = cardTemplate.cloneNode(true);
  const linkCard = newCard.querySelector('.element__item');

  const titleCard = newCard.querySelector('.element__title');
  const deleteButton = newCard.querySelector('.element__trash');
  const likeButton = newCard.querySelector(".element__like");

  titleCard.textContent = data.name;
  linkCard.src = data.link;

  likeButton.addEventListener("click", aktivLike);
  deleteButton.addEventListener('click', handleDeleteTodoCard);
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

function popupOpen(popup) {
  popup.classList.add("popup_opened");
}

function popupClose(event) {
  event.target.closest(".popup_opened").classList.remove("popup_opened");
}

function formSubmitHandler (event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popupClose(event);
}

const handleSubmitAddCardForm = (event) => {
  event.preventDefault();

  renderCard({ name: titleCardInput.value, link: linkCardInput.value });

  titleCardInput.value = "";
  linkCardInput.value = "";
  popupClose(event);
};

function imagePopUpPreview(data) {
  PopupImage.src = data.link;
  PopupImageTitle.textContent = data.name;
  popupOpen(popupPreview);
}

closeButton.forEach((button) => {
  button.addEventListener('click', popupClose);
});

editButton.addEventListener("click", () => popupOpen(popup));
addButton.addEventListener("click", () => popupOpen(popupAddCard));
formElement.addEventListener("submit", formSubmitHandler);
formCreateCard.addEventListener("submit", handleSubmitAddCardForm);



