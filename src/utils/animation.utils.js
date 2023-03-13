export const animationAfterAnother = (
  element,
  animation1,
  animation2,
  threshold
) => {
  element.classList.add(animation1);

  setTimeout(() => {
    element.classList.add(animation2);
  }, threshold);

  setTimeout(() => {
    element.classList.remove(animation2);
    element.classList.remove(animation1);
  }, threshold + 200);
};
