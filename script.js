'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnSrollTo = document.querySelector('.btn--scroll-to');
const section01 = document.querySelector('#section--1');

const tabsButtons = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');
const resumeBtn = document.querySelector('.btn__resume');

resumeBtn.addEventListener('click', function () {
  console.log('Downloading...');
  window
    .open(
      'https://github.com/heriaond/devPortfolio/blob/main/img/card-lazy.jpg',
      '_blank'
    )
    .focus();
});

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

// Menu changing opacity effect
const opacityChange = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const links = document.querySelectorAll('.nav__link');
    links.forEach(el => {
      if (el !== e.target) {
        el.style.opacity = this.a;
      }
    });
    document.querySelector('.text__menu').style.opacity = this.a;
    e.target.style.transform = `scale(${1 + this.b})`;
  }
};

nav.addEventListener('mouseover', opacityChange.bind({ a: 0.5, b: 0.1 }));
nav.addEventListener('mouseout', opacityChange.bind({ a: 1, b: 0 }));

// sticky scrolling navigation (not efficient) -- older device like mobile phone could get slower, becouse scroll event is fired up every time we scroll.

// const windowCoords = section01.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   if (windowCoords.top < window.scrollY) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// intersection Observer
const header = document.querySelector('.header');

const headerObserverCallBack = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      nav.classList.add('sticky');
    } else {
      nav.classList.remove('sticky');
    }
  });
};

const headerObserver = new IntersectionObserver(headerObserverCallBack, {
  root: null,
  /* the element which trigger callBack after intersect with 01element, null means browserViewport*/
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
});

headerObserver.observe(header); // header is 01element which interact with options.root

// Reveal elements on Scroll

const sections = document.querySelectorAll('.section');

const callBackSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(callBackSection, {
  root: null,
  threshold: 0.15,
});

sections.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden'); --------------------- HIDEN
});

// Switch low quality img to high quality and remove blurry class --- lazy image techniqe
const callBackImg = function (entries, observer) {
  const [entry] = entries; // there is just one threshodl. entries is array of thresholds.

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(callBackImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

const blurryImgs = document.querySelectorAll('img[data-src]'); // selecting all img that contains atribute 'data-src'

blurryImgs.forEach(img => {
  imgObserver.observe(img);
});

// slider

const sliders = document.querySelectorAll('.slide');
const leftSliderButton = document.querySelector('.slider__btn--left');
const rightSliderButton = document.querySelector('.slider__btn--right');
const dots = document.querySelector('.dots');

let currentSlider = 0;
const slidersCount = sliders.length;

const createDots = function () {
  sliders.forEach((slide, i) => {
    dots.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide=${i}></button>`
    );
    document
      .querySelector(`.dots__dot[data-slide="${currentSlider}"`)
      .classList.add('dots__dot--active');
  });
};

sliders.forEach((slider, i) => {
  slider.style.transform = `translateX(${100 * i}%)`;
});

createDots();
const dotsDot = document.querySelectorAll('.dots__dot'); //Be carteful with order of commands.

const nextSlide = function () {
  sliders.forEach((slider, i) => {
    slider.style.transform = `translateX(${100 * (i - currentSlider)}%)`;
  });
  dotsDot.forEach(dot => {
    dot.classList.remove('dots__dot--active');
  });
  document
    .querySelector(`.dots__dot[data-slide="${currentSlider}"`)
    .classList.add('dots__dot--active');
};

const setActiveDot = function (e) {
  if (e.target.classList.contains('dots__dot')) {
    dotsDot.forEach(dot => {
      dot.classList.remove('dots__dot--active');
    });
    e.target.classList.add('dots__dot--active');
  }
  sliders.forEach((slider, i) => {
    slider.style.transform = `translateX(${
      100 * (i - e.target.dataset.slide)
    }%)`;
  });
};
const rightSlide = function () {
  if (currentSlider === slidersCount - 1) {
    currentSlider = 0;
  } else {
    currentSlider++;
  }

  nextSlide();
};

const leftSlide = function () {
  if (currentSlider === 0) {
    currentSlider = slidersCount - 1;
  } else {
    currentSlider--;
  }

  nextSlide();
};
rightSliderButton.addEventListener('click', rightSlide);

leftSliderButton.addEventListener('click', leftSlide);

dots.addEventListener('click', setActiveDot);
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') leftSlide();
  e.key === 'ArrowRight' && rightSlide();
});
