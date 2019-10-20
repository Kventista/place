class Popup {
    constructor(popupElem, button) {
        this.popupElem = popupElem;
        this.button = button;
        this.close = this.close.bind(this);
        this.popupElem
            .querySelector('.popup__close')
            .addEventListener('click', this.close);
        this.open = this.open.bind(this);

        if (this.button) {
            this.button.addEventListener('click', this.open);
        }
    }

    open() {
        this.popupElem.classList.add('popup_is-opened');
    }
    close() {
        this.popupElem.classList.remove('popup_is-opened');
    }
}