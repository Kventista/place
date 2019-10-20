class CardList {
    constructor(container) {
        this.container = container;
        this.render();
    }
    addCard(name, link) {
        const { cardElement } = new Card(name, link);
        this.container.appendChild(cardElement);
    }
    render() {
        let me = this;
        api.getInitialCards().then(res => {
            res.forEach(function(element) {
                me.addCard(element['name'], element['link']);
            });
        })
    };
}