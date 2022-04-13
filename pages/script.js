const popup = document.querySelector(".popup");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = popup.querySelector(".popup__close-button");

function popupOpen() {
  popup.classList.toggle("popup_opened");
}

editButton.addEventListener("click", popupOpen);
closeButton.addEventListener("click", popupOpen);

let formElement = document.querySelector(".form");
let nameInput = document.querySelector(".form__input-name");
let jobInput = document.querySelector(".form__input-job");
let formButton = document.querySelector(".form__button");

function formSubmitHandler (evt) {
  evt.preventDefault();

    let profileTitle = document.querySelector(".profile__title");
    let profileSubtitle = document.querySelector(".profile__subtitle");
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;

}

formElement.addEventListener('submit', formSubmitHandler);
formButton.addEventListener("click", popupOpen);
