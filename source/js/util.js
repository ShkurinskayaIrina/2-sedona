export const isEscEvent = function (evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc'){
    return evt.key;
  }
};
