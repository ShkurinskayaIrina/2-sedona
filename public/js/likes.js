import './menu.min.js';
const likeButtons = document.querySelectorAll('.card__like');

const onLikeButtonClick = (evt) => {
  const likeButton = evt.currentTarget;

  const likesCounter = likeButton.querySelector('.card__like-counter');
  let counter = likesCounter.textContent;
  if (likeButton.classList.contains('card__like--add')) {
    counter--;
  } else {
    counter++;
  }
  likesCounter.textContent = counter;
  likeButton.classList.toggle('card__like--add');
};

likeButtons.forEach((button) => {
  button.addEventListener('click', onLikeButtonClick);
});
