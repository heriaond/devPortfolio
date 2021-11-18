'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnSrollTo = document.querySelector('.btn--scroll-to');
const section01 = document.querySelector('#section--1');

const openModal = function (e) {
  e.preventDefault(); // if this would not be there, then href='#' on btn--show-modal would move whole page up to top.
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(el => el.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnSrollTo.addEventListener('click', e => {
  section01.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (
    e.target.classList.contains('nav__link') &&
    !e.target.classList.contains('btn--show-modal')
  ) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
// console.log(document.querySelector('.nav__link').getAttribute('href')); ---- relative path
// console.log(document.querySelector('.nav__link').href); -------------------- absolute path

document.querySelector('.header__img').style.transform = 'scale(1.2)';

// Functionality for Tabbed component
const tabsButtons = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
document
  .querySelector('.operations__tab-container')
  .addEventListener('click', function (e) {
    const el = e.target.closest('.btn');
    if (!el) {
      return;
    }
    // Remove all active classes
    tabsButtons.forEach(c => c.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));

    // Add active classes to selected Element
    el.classList.add('operations__tab--active');
    document
      .querySelector(`.operations__content--${el.getAttribute('data-tab')}`)
      .classList.add('operations__content--active');
  });
