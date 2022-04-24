//---
// BURGER-MENU realization
//---

const body = document.querySelector('.body');
const nav = document.querySelector('.nav');
const burgerMenu = document.querySelector('.burger-menu');
const mainWords = document.querySelector('.main-words');
const modalWindowNav = document.querySelector('.modal-window-nav');
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav-link');

function toggleMenu() {
    burgerMenu.classList.toggle('is-active');
    nav.classList.toggle('is-active');
    body.classList.toggle('is-active');
    mainWords.classList.toggle('hidden');
    modalWindowNav.classList.toggle('is-active');
    header.classList.toggle('is-active');
}

burgerMenu.addEventListener('click', toggleMenu);

// close menu func
navLinks.forEach((el) => el.addEventListener('click', closeMenu));
modalWindowNav.addEventListener('click', closeMenu);

function closeMenu(event) {
    if (event.target.classList.contains('nav-link') || 
    event.target.classList.contains('modal-window-nav')) {
        burgerMenu.classList.remove('is-active');
        nav.classList.remove('is-active');
        body.classList.remove('is-active');
        mainWords.classList.remove('hidden');
        modalWindowNav.classList.remove('is-active');
        header.classList.remove('is-active');
    }
};