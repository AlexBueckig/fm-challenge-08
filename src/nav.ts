const navButton = document.querySelector<HTMLButtonElement>('.nav__button');
const nav = document.querySelector<HTMLElement>('.nav');

navButton.addEventListener('click', () => {
  nav.classList.toggle('nav--open');
});
