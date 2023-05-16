const mainHeader = document.querySelector('.main-header');
const mainNav= document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav__toogle');

mainHeader.classList.remove('main-header--nojs');

navToggle.addEventListener('click', function () {
  if (mainNav.classList.contains('main-nav--closed')) {
    mainNav.classList.remove('main-nav--closed');
    mainNav.classList.add('main-nav--opened');
  } else {
    mainNav.classList.add('main-nav--closed');
    mainNav.classList.remove('main-nav--opened');
  }
});
