import { isEscEvent } from './util.min.js';

const pageModal = document.querySelector('.page-modal');

const closeModal = () => {
  pageModal.classList.add('modal--close');
  const modal = pageModal.querySelector('.modal__container--active');
  modal.classList.remove('modal__container--active');

  pageModal.querySelectorAll('.modal__button').forEach((modalWindow) => {
    // eslint-disable-next-line no-use-before-define
    modalWindow.removeEventListener('click', onBtnCloseClick);
  });
};

const onBtnCloseClick = () => {
  closeModal();
};

const onModalClick = (evt) => {
  if (evt.target === pageModal && !pageModal.classList.contains('modal--close')) {
    closeModal();
  }
};

const onModalEscKeydown = function (evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    onBtnCloseClick();
  }
};

const modalOpen = (modalWindow) => {
  pageModal.classList.remove('modal--close');

  const modalButton = modalWindow.querySelector('.modal__button');
  modalWindow.classList.add('modal__container--active');

  pageModal.addEventListener('click', onModalClick, { once: true });
  modalButton.addEventListener('click', onBtnCloseClick);
  document.addEventListener('keydown', onModalEscKeydown);
};

export const modalSuccessOpen = () => {
  const modalSuccess = pageModal.querySelector('.modal__container--success');
  modalOpen(modalSuccess);
};

export const modalErrorOpen = () => {
  const modalError = pageModal.querySelector('.modal__container--error');
  modalOpen(modalError);
};
