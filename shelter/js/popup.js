import PETS_LIST from './pets-list.js';
const itemSlider = document.querySelectorAll('.item-slider');
const petsPhotosSlider = document.querySelector('.pets-photos-slider');
const popup = document.querySelector('.popup');
const popupCloseButt = document.querySelector('.popup-close');
const popupContent = document.querySelector('.popup-content');
const body = document.querySelector('body');
const header = document.querySelector('.header');

for (let item of itemSlider) {
    item.addEventListener('click', function() {
        let cardId = this.children[0].dataset.id;
        openModalWindow(cardId);
    });
}

popupCloseButt.addEventListener('click', closeModalWindow);
popup.addEventListener('click', closeModalWindow);

function openModalWindow(id) {
    popup.classList.add('open');
    header.classList.add('popup-is-open');
    body.classList.add('is-active'); // style from _burger-menu.scss
    createPetInfo(id)
}

function closeModalWindow() {
    popup.classList.remove('open');
    body.classList.remove('is-active');
    header.classList.remove('popup-is-open');
}

function createPetInfo(data) {
    popupContent.innerHTML = '';
    popupContent.innerHTML +=
        `
            <div class="image-pet-modal">
            </div>
            <div class="descriptions">
                <h3>${PETS_LIST[data]['name']}</h3>
                <p class="type">${PETS_LIST[data]['type']} &mdash; ${PETS_LIST[data]['breed']}</p>
                <p class="about">${PETS_LIST[data]['description']}</p>
                <ul>
                    <li><span>Age:</span> ${PETS_LIST[data]['age']}</li>
                    <li><span>Inoculations:</span> ${PETS_LIST[data]['inoculations']}</li>
                    <li><span>Diseases:</span> ${PETS_LIST[data]['diseases']}</li>
                    <li><span>Parasites:</span> ${PETS_LIST[data]['parasites']}</li>
                </ul>
            </div>
        `
    ;
    const imagePetModal = document.querySelector('.image-pet-modal');
    imagePetModal.style.backgroundImage = `url(${PETS_LIST[data]['modal-img']})`;
};

popupContent.addEventListener('click', (event) => {
    event.stopPropagation();
});