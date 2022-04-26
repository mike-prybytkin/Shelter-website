//---
// SLIDER realization
//---
// for pets-page
import PETS_LIST from './pets-list.js';
const PETS_PHOTOS_SLIDER = document.querySelector('.pets-photos-slider');
const BTN_LEFT = document.querySelector('.one-arr-left');
const DB_BTN_LEFT = document.querySelector('.two-arr-left');
const BTN_RIGHT = document.querySelector('.one-arr-right');
const DB_BTN_RIGHT = document.querySelector('.two-arr-right');
let pageNum = document.querySelector('.page-number');

// ---create arrays with ID---
// for 8 cards on page
const numPages1280 = 6;
const numCards1280 = 8;
const ARR_ID_1280 = [];

while (ARR_ID_1280.length < numPages1280) {
    let interimArr = [];
    while (interimArr.length < numCards1280) {
        let randomNum = (Math.floor(Math.random() * PETS_LIST.length)).toString();
        if (!interimArr.includes(randomNum)) {
            interimArr.push(randomNum);
        }
    };
    ARR_ID_1280.push(interimArr);
    interimArr = [];
};

// for 6 cards on page
const numCards768 = 6;
const ARR_ID_768 = [[], [], [], [], [], [], [], []];
let allId768 = ARR_ID_1280.flat();

while (allId768.length > 0) {
    let currSumb = allId768.pop();
    let i = 0;
    while (true) {
        if(!ARR_ID_768[i].includes(currSumb) && ARR_ID_768[i].length < numCards768) {
            ARR_ID_768[i].push(currSumb);
            break;
        } else {
            i++
        }
    }
};

// for 3 cards on page
const numCards320 = 3;
const ARR_ID_320 = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
let allId320 = ARR_ID_1280.flat();

while (allId320.length > 0) {
    let currSumb = allId320.pop();
    let i = 0;
    while (true) {
        if(!ARR_ID_320[i].includes(currSumb) && ARR_ID_320[i].length < numCards320) {
            ARR_ID_320[i].push(currSumb);
            break;
        } else {
            i++
        }
    }
};

// create div-wrappers be cards

const createDiv = () => {
    let amountDiv = 0;
    if (document.documentElement.clientWidth >= 1280) {
        amountDiv = ARR_ID_1280[0].length;
    } else if (document.documentElement.clientWidth < 1280 && document.documentElement.clientWidth >= 768) {
        amountDiv = ARR_ID_768[0].length;
    } else {
        amountDiv = ARR_ID_320[0].length;
    }

    for(let i = 0; i < amountDiv; i++){
        let div = document.createElement('div');
        div.className = 'item-slider';
        PETS_PHOTOS_SLIDER.appendChild(div)
    }
}
createDiv();

//--- create cards

const itemSlider = document.getElementById('pets-photos-slider');
const listChildren = itemSlider.children;

const createPage = (page) => {
    for(let i = 0; i < listChildren.length; i++){
        listChildren[i].innerHTML = '';

        if (document.documentElement.clientWidth >= 1280) {
            listChildren[i].innerHTML += 
        `
            <figure class="data-id" data-id = ${PETS_LIST[ARR_ID_1280[page][i]]['id']}>
                <img src="${PETS_LIST[ARR_ID_1280[page][i]]['img']}" alt="${PETS_LIST[ARR_ID_1280[page][i]]['name']}">
                <figcaption>${PETS_LIST[ARR_ID_1280[page][i]]['name']}</figcaption>
            </figure>
            <button>Learn more</button>
        `;
        } else if (document.documentElement.clientWidth < 1280 && document.documentElement.clientWidth >= 768) {
            listChildren[i].innerHTML += 
        `
            <figure class="data-id" data-id = ${PETS_LIST[ARR_ID_768[page][i]]['id']}>
                <img src="${PETS_LIST[ARR_ID_768[page][i]]['img']}" alt="${PETS_LIST[ARR_ID_768[page][i]]['name']}">
                <figcaption>${PETS_LIST[ARR_ID_768[page][i]]['name']}</figcaption>
            </figure>
            <button>Learn more</button>
        `;
        } else {
            listChildren[i].innerHTML += 
        `
            <figure class="data-id" data-id = ${PETS_LIST[ARR_ID_320[page][i]]['id']}>
                <img src="${PETS_LIST[ARR_ID_320[page][i]]['img']}" alt="${PETS_LIST[ARR_ID_320[page][i]]['name']}">
                <figcaption>${PETS_LIST[ARR_ID_320[page][i]]['name']}</figcaption>
            </figure>
            <button>Learn more</button>
        `;
        }
    }
}
createPage(0);

// --- fade effect

const setDuration = 200;
const buttonContainerSlider = document.querySelector('.button-container-slider');

buttonContainerSlider.addEventListener('click', () => {
    let allCardWrapper = document.querySelectorAll('.item-slider');
    allCardWrapper.forEach((el) => {
        el.classList.add('fade');
    });
    setTimeout(() => fadeEffectOff(), setDuration);
});

const fadeEffectOff = () => {
    let allCardWrapper = document.querySelectorAll('.item-slider');
    allCardWrapper.forEach((el) => {
        el.classList.remove('fade');
    });
}

// --- pagination

let counter = 0;

DB_BTN_RIGHT.addEventListener('click', fastMoveRight);
DB_BTN_LEFT.addEventListener('click', fastMoveLeft);

function fastMoveRight() {
    if (document.documentElement.clientWidth >= 1280) {
        setTimeout(() => createPage(ARR_ID_1280.length-1), setDuration);
        pageNum.innerHTML = ARR_ID_1280.length;
        counter = ARR_ID_1280.length - 1;
    } else if (document.documentElement.clientWidth < 1280 && document.documentElement.clientWidth >= 768) {
        setTimeout(() => createPage(ARR_ID_768.length-1), setDuration);
        pageNum.innerHTML = ARR_ID_768.length;
        counter = ARR_ID_768.length - 1;
    } else {
        setTimeout(() => createPage(ARR_ID_320.length-1), setDuration);
        pageNum.innerHTML = ARR_ID_320.length;
        counter = ARR_ID_320.length - 1;
    }
    finishMoveRight();
}

function fastMoveLeft() {
    if (counter > 0) {
        counter = 0;
        setTimeout(() => createPage(counter), setDuration);
        pageNum.innerHTML = counter + 1;
    
        finishMoveLeft()
    }
}

//-

BTN_LEFT.addEventListener('click', moveLeft);
BTN_RIGHT.addEventListener('click', moveRight);

function moveRight() {
    counter++;

    if (document.documentElement.clientWidth >= 1280) {
        if(counter < ARR_ID_1280.length - 1) {
            setTimeout(() => createPage(counter), setDuration);
            console.log(counter)
        } else {
            setTimeout(() => createPage(ARR_ID_1280.length-1), setDuration);
            finishMoveRight();
        }
    } else if (document.documentElement.clientWidth < 1280 && document.documentElement.clientWidth >= 768) {
        if(counter < ARR_ID_768.length - 1) {
            setTimeout(() => createPage(counter), setDuration);
        } else {
            setTimeout(() => createPage(ARR_ID_768.length-1), setDuration);
            finishMoveRight();
        }
    } else {
        if(counter < ARR_ID_320.length - 1) {
            setTimeout(() => createPage(counter), setDuration);
        } else {
            setTimeout(() => createPage(ARR_ID_320.length-1), setDuration);
            finishMoveRight();
        }
    }

    // counter++;
    pageNum.innerHTML = counter + 1;
    
    BTN_LEFT.removeAttribute("disabled");
    DB_BTN_LEFT.removeAttribute("disabled");
    BTN_LEFT.classList.remove('disabled');
    DB_BTN_LEFT.classList.remove('disabled');
    BTN_LEFT.classList.add('active-butt');
    DB_BTN_LEFT.classList.add('active-butt');
}

function moveLeft() {
    counter--;
    setTimeout(() => createPage(counter), setDuration);
    pageNum.innerHTML = counter + 1;

    BTN_RIGHT.removeAttribute("disabled");
    DB_BTN_RIGHT.removeAttribute("disabled");
    BTN_RIGHT.classList.remove('disabled');
    DB_BTN_RIGHT.classList.remove('disabled');
    BTN_RIGHT.classList.add('active-butt');
    DB_BTN_RIGHT.classList.add('active-butt');
    if(counter === 0) {
        finishMoveLeft();
    }
}

function finishMoveLeft() {
    BTN_LEFT.setAttribute("disabled", '');
    DB_BTN_LEFT.setAttribute("disabled", '');
    BTN_LEFT.classList.remove('active-butt');
    DB_BTN_LEFT.classList.remove('active-butt');
    BTN_LEFT.classList.add('disabled');
    DB_BTN_LEFT.classList.add('disabled');
    //-
    BTN_RIGHT.removeAttribute("disabled");
    DB_BTN_RIGHT.removeAttribute("disabled");
    BTN_RIGHT.classList.remove('disabled');
    DB_BTN_RIGHT.classList.remove('disabled');
    BTN_RIGHT.classList.add('active-butt');
    DB_BTN_RIGHT.classList.add('active-butt');
};

function finishMoveRight() {
    BTN_LEFT.removeAttribute("disabled");
    DB_BTN_LEFT.removeAttribute("disabled");
    BTN_LEFT.classList.add('active-butt');
    DB_BTN_LEFT.classList.add('active-butt');
    BTN_LEFT.classList.remove('disabled');
    DB_BTN_LEFT.classList.remove('disabled');
    //-
    BTN_RIGHT.setAttribute("disabled", '');
    DB_BTN_RIGHT.setAttribute("disabled", '');
    BTN_RIGHT.classList.add('disabled');
    DB_BTN_RIGHT.classList.add('disabled');
    BTN_RIGHT.classList.remove('active-butt');
    DB_BTN_RIGHT.classList.remove('active-butt');
}