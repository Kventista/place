class Card {
    constructor(name, link) {
        this.cardElement = this.createCard(name, link);
        this.like = this.like.bind(this);
        this.cardElement
            .querySelector('.place-card__like-icon')
            .addEventListener('click', this.like);
        this.remove = this.remove.bind(this);
        this.cardElement
            .querySelector('.place-card__delete-icon')
            .addEventListener('click', this.remove);
        this.cardElement
            .querySelector('.place-card__image')
            .addEventListener('click', this.showImage);
    }


    /* Можно лучше: т.к. метод не относится непосредственно к функционалу карточки и
    не обращается к контексту класса через this можно вынести его из класса просто в функцию */
    createElement(elementType, classes) {
        const element = document.createElement(elementType);
        classes.forEach(function(clas) {
            element.classList.add(clas);
        });
        return element;
    };

    createCard(name, link) {
        const place = this.createElement('div', ['place-card']);
        const placeImage = this.createElement('div', ['place-card__image']);
        const cardButtonDelete = this.createElement('button', ['place-card__delete-icon']);
        const placeDescription = this.createElement('div', ['place-card__description']);
        const cardName = this.createElement('h3', ['place-card__name']);
        const cardButtonLike = this.createElement('button', ['place-card__like-icon']);
        placeImage.setAttribute('style', 'background-image:url(' + link + ')');
        placeImage.appendChild(cardButtonDelete);
        cardName.textContent = name;
        placeDescription.appendChild(cardName);
        placeDescription.appendChild(cardButtonLike);
        place.appendChild(placeImage);
        place.appendChild(placeDescription);
        return place;

    }
    like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
        event.stopPropagation();
    }
    remove(event) {
        const card = event.target.parentElement.parentElement;
        card.parentElement.removeChild(card);
        event.stopPropagation();

    }

    showImage(event) {
        if (event.target.classList.contains('place-card__image')) {
            imgContent.style.backgroundImage = event.target.style.backgroundImage;
        }
        imagePopup.open();
    }

}