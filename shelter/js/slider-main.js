//---
// SLIDER realization
//---
// for main-page
import PETS_LIST from './pets-list.js';
const PETS_PHOTOS_SLIDER = document.querySelector('.pets-photos-slider');
const BTN_LEFT = document.querySelector('.left-butt-slider');
const BTN_RIGHT = document.querySelector('.right-butt-slider');

BTN_LEFT.addEventListener('click', moveLeft);
BTN_RIGHT.addEventListener('click', moveRight);

function moveLeft() {
    PETS_PHOTOS_SLIDER.classList.add('transition-left');
    BTN_LEFT.removeEventListener('click', moveLeft);
    BTN_RIGHT.removeEventListener('click', moveRight);
}

function moveRight() {
    PETS_PHOTOS_SLIDER.classList.add('transition-right');
    BTN_LEFT.removeEventListener('click', moveLeft);
    BTN_RIGHT.removeEventListener('click', moveRight)
}


const itemSlider = document.getElementById('pets-photos-slider');
const listChildren = itemSlider.children;

const LEFT_SLIDE_1 = listChildren[0];
const LEFT_SLIDE_2 = listChildren[1];
const LEFT_SLIDE_3 = listChildren[2];

const CENT_SLIDE_1 = listChildren[3];
const CENT_SLIDE_2 = listChildren[4];
const CENT_SLIDE_3 = listChildren[5];

const RIGHT_SLIDE_1 = listChildren[6];
const RIGHT_SLIDE_2 = listChildren[7];
const RIGHT_SLIDE_3 = listChildren[8];


const createCards = () => {
    let dataId = document.querySelectorAll('[data-id]');
    let centrIdValues = [dataId[3].dataset.id, dataId[4].dataset.id, dataId[5].dataset.id];
    let leftRightIdValues = [];
    
    // compare ID pets
    while (leftRightIdValues.length < 3) {
        let randomNum = (Math.floor(Math.random() * PETS_LIST.length)).toString();
        if (!centrIdValues.includes(randomNum) && !leftRightIdValues.includes(randomNum)) {
            leftRightIdValues.push(randomNum);
        }
    };

    // left cards
    for(let i = 0; i < 3; i++) {
        listChildren[i].innerHTML = '';
        listChildren[i].innerHTML += 
        `
            <figure class="data-id" data-id = ${PETS_LIST[leftRightIdValues[i]]['id']}>
                <img src="${PETS_LIST[leftRightIdValues[i]]['img']}" alt="${PETS_LIST[leftRightIdValues[i]]['name']}">
                <figcaption>${PETS_LIST[leftRightIdValues[i]]['name']}</figcaption>
            </figure>
            <button>Learn more</button>
        `;
    }

    // right cards
    for(let i = 0, j = 6; i < 3; i++, j++) {
        listChildren[j].innerHTML = '';
        listChildren[j].innerHTML += 
        `
            <figure class="data-id" data-id = ${PETS_LIST[leftRightIdValues[i]]['id']}>
                <img src="${PETS_LIST[leftRightIdValues[i]]['img']}" alt="${PETS_LIST[leftRightIdValues[i]]['name']}">
                <figcaption>${PETS_LIST[leftRightIdValues[i]]['name']}</figcaption>
            </figure>
            <button>Learn more</button>
        `;
    }
}


PETS_PHOTOS_SLIDER.addEventListener('animationend', (animationEvent) => {
    let moveAnimation = '';
    if (document.documentElement.clientWidth >= 1280) {
        moveAnimation = 'move-left-1200';
    } else if (document.documentElement.clientWidth < 1280 && document.documentElement.clientWidth >= 768) {
        moveAnimation = 'move-left-768';
    } else {
        moveAnimation = 'move-left-320';
    }

    //replase HTML-blocks value

    if (animationEvent.animationName === moveAnimation) {
        PETS_PHOTOS_SLIDER.classList.remove('transition-left');
        const leftItems1 = LEFT_SLIDE_1.innerHTML;
        const leftItems2 = LEFT_SLIDE_2.innerHTML;
        const leftItems3 = LEFT_SLIDE_3.innerHTML;

        CENT_SLIDE_1.innerHTML = leftItems1;
        CENT_SLIDE_2.innerHTML = leftItems2;
        CENT_SLIDE_3.innerHTML = leftItems3;
    } else {
        PETS_PHOTOS_SLIDER.classList.remove('transition-right');
        const rightItems1 = RIGHT_SLIDE_1.innerHTML;
        const rightItems2 = RIGHT_SLIDE_2.innerHTML;
        const rightItems3 = RIGHT_SLIDE_3.innerHTML;

        CENT_SLIDE_1.innerHTML = rightItems1;
        CENT_SLIDE_2.innerHTML = rightItems2;
        CENT_SLIDE_3.innerHTML = rightItems3;
    }

    BTN_LEFT.addEventListener('click', moveLeft);
    BTN_RIGHT.addEventListener('click', moveRight);

    createCards();
});