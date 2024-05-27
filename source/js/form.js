import './menu.min.js';
import { modalSuccessOpen, modalErrorOpen } from './modal.min.js';

const formContainer = document.querySelector('.form__container');

const phoneInput = formContainer.querySelector('#phone');
const formButton = formContainer.querySelector('.form__button');

const validationСheck = (field) => {
  if (field.validity.typeMismatch || (field.validity.patternMismatch) || !(field.value)) {
    field.classList.add('field__input--invalid');
  } else {
    field.classList.remove('field__input--invalid');
  }
};

const checkingFields = () => {
  const requiredFields = formContainer.querySelectorAll('[required]');
  requiredFields.forEach((field) => {
    validationСheck(field);
  });
};

const validateForm = (evt) => {
  evt.preventDefault();
  if (formContainer.checkValidity()) {
    modalSuccessOpen();
  } else {
    modalErrorOpen();
  }
  checkingFields();

};

const maskPhone = (evt) => {
  const x = evt.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
  evt.target.value = !x[3] ? `+7${x[2]}` : `+7(${ x[2] }) ${ x[3] }${x[4] ? `-${ x[4]}` : '' }${x[5] ? `-${ x[5]}` : ''}`;
};


phoneInput.addEventListener('input', maskPhone);
formButton.addEventListener('click', validateForm);
