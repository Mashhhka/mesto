
const initialCards = [
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

class Card {
  constructor(obj, templateSelector) {
    this._name = obj.name;
    this._link = obj.link;
    this._templateSelector = templateSelector;

  }


  _getTemplate() {
    const elementTemplate = document.querySelector(this._templateSelector);
    const cardElement = elementTemplate.content.firstElementChild.cloneNode(true);
    return cardElement;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._setEventListeners();

    // Добавим данные
    this._element.querySelector('.element__item').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;

    // Вернём элемент наружу
    return this._element;
  }


  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleToggleLike();
    });
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleDeleteCard();
    });
    this._element.querySelector(".element__item").addEventListener("click", () => {
      openImagePopUpPreview(this._name, this._link);
    });
  }
  _handleToggleLike() {
    this._element.querySelector(".element__like").classList.toggle("element_like-active");
  }

  _handleDeleteCard() {
    this._element.remove();
  }

}











