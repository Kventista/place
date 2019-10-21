import { Api } from './api.js';
import { Card } from './Card.js';
import { CardList } from './CardList.js';
import { Popup } from './Popup.js';
import './pages/index.css';

export const api = new Api({
    baseUrl: 'http://95.216.175.5/cohort3',
    headers: {
        authorization: '9caabadd-d926-41cb-867b-ab4c313de264',
        'Content-Type': 'application/json'
    }
});

const placesSection = document.querySelector('.places-list');
const popupsSection = document.querySelector('.popups');
const addButton = document.querySelector('.user-info__button');
const editButton = document.querySelector('.user-info__button_edit');
const cardPopupAdd = document.querySelector('#addForm');
const cardPopupImage = document.querySelector('#imagePopup');
const imgContent = cardPopupImage.querySelector('.popup__content');
const cardPopupEdit = document.querySelector('#editForm');
const cardPopupCloseBtns = document.querySelectorAll('.popup__close');
const likeBtns = document.querySelectorAll('.place-card__like-icon');
const name = document.querySelector('#addForm .popup__input_type_name');
const link = document.querySelector('#addForm .popup__input_type_link-url');
const job = document.querySelector('#job');
const username = document.querySelector('#username');
const form = document.querySelector('#edit');
const submit = document.querySelector('#submit');
const newCardForm = document.forms.new;
const newEditForm = document.forms.edit;
const addPopup = new Popup(cardPopupAdd, addButton);
const editPopup = new Popup(cardPopupEdit, editButton);
const imagePopup = new Popup(cardPopupImage);
const nameUser = document.querySelector('.user-info__name');
const aboutUser = document.querySelector('.user-info__job');
const avatarUser = document.querySelector('.user-info__photo');
const card_list = new CardList(placesSection);
//Слушатели событий
username.addEventListener('input', handleValidate);
job.addEventListener('input', handleValidate);
submit.addEventListener('click', sendForm);
name.addEventListener('input', completeRow);
link.addEventListener('input', completeRow);

//Проверяем наличие текста в форму добавления карточки
function completeRow() {
    if (name.value !== '' && link.value !== '') {
        document.querySelector('#addForm .popup__button').disabled = false;
    } else {
        document.querySelector('#addForm .popup__button').disabled = true;
    }
};
//Валидация инфы о пользователе
function handleValidate(event) {
    resetError(event.target);
    validate(event.target);
};

function validate(element) {
    const errorElement = document.querySelector(`#error-${element.id}`);
    if (!element.checkValidity()) {
        errorElement.textContent = element.validationMessage;
        activateError(errorElement);
        return false
    }
    return true
};

function activateError(element) {
    element.parentNode.classList.add('input-container__invalid');
};

function resetError(element) {
    const errorElement = document.querySelector(`#error-${element.id}`);
    element.parentNode.classList.remove('input-container__invalid');
    element.textContent = '';
    errorElement.textContent = '';
    if (element.textContent == '') {
        username.disabled = false;
    } else {
        job.disabled = true;
    }
}

function sendForm(event) {
    event.preventDefault();
    const inputs = Array.from(form.elements);
    let isValidForm = true;
    inputs.forEach((elem) => {
        if (elem.id !== submit.id) {
            if (!validate(elem)) isValidForm = false;
        }
    });

    if (isValidForm) {
        event.preventDefault();
        editProfile(newEditForm.username.value, newEditForm.job.value);
        cardPopupEdit.classList.remove('popup_is-opened');
    } else {
        console.log('form is still not validated =( ');
    }
};

function updateMyInfo() {
    api.getMyInfo().then((data) => {
        nameUser.textContent = data.name;
        aboutUser.textContent = data.about;
        avatarUser.style.backgroundImage = "url('" + data.avatar + "')";
    });
}

//Внесение изменений в текст редактирования профиля
function editProfile(username, job) {
    api.editMyInfo(username, job).then(res => { updateMyInfo(); })
};

newCardForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const card = card_list.addCard(newCardForm.name.value, newCardForm.link.value);
    cardPopupAdd.classList.remove('popup_is-opened');
    document.getElementsByName('name')[0].value = '';
    document.getElementsByName('link')[0].value = '';
});

updateMyInfo();