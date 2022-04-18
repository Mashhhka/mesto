const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = popup.querySelector(".popup__close-button");
let formElement = document.querySelector(".form");
let nameInput = document.querySelector(".form__input_type_user-name");
let jobInput = document.querySelector(".form__input_type_user-job");
let formButton = document.querySelector(".form__button");
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");

function popupOpen() {
  popup.classList.add("popup_opened");
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function popupClose() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popupClose()
}
editButton.addEventListener("click", popupOpen);
closeButton.addEventListener("click", popupClose);
formElement.addEventListener("submit", formSubmitHandler);
