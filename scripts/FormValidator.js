

export class FormValidator {
  constructor(selectors, formElement) {
    this._selectors = selectors;
    this._submitButton = formElement.querySelector(selectors.submitButtonSelector);
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
  };

_showInputError = (inputElement, errorMessage) => {
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(this._selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._selectors.errorClass);
};


_hideInputError = (inputElement) => {
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(this._selectors.inputErrorClass);
  errorElement.classList.remove(this._selectors.errorClass);
  errorElement.textContent = '';
};

_checkInputValidity = (inputElement) => {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement, inputElement.validationMessage);
  } else {
    this._hideInputError(inputElement);
  }
};

_setEventListeners() {

  this.toggleButtonState();
  this._inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      this._checkInputValidity(inputElement);
      this.toggleButtonState();
    });
  });
};


  _hasInvalidInput() {
    return this._inputList.some(input => !input.validity.valid)
  };


  toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._selectors.inactiveButtonClass);
      this._submitButton.setAttribute("disabled", true);
    } else {
      this._submitButton.classList.remove(this._selectors.inactiveButtonClass);
      this._submitButton.removeAttribute("disabled");
    }
  };



  enableValidation() {
    this._setEventListeners();
  }

  //Функция сброса ошибок
  restartFormValidation() {
    this.toggleButtonState(this._inputList);

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
