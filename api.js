class Api {
    constructor(options) {
        this.baseURL = options['baseUrl'];
        this.headers = options['headers'];
    }

    getInitialCards() {
        return fetch(this.baseURL + '/cards', {
                headers: this.headers
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
            .catch((err) => {
                console.log(err);
                console.log('Ошибка. Запрос не выполнен');
            });
    }

    getMyInfo() {
        return fetch(this.baseURL + '/users/me', {
                headers: this.headers
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
            .catch((err) => {
                console.log(err);
                console.log('Ошибка. Запрос не выполнен');
            });
    }

    editMyInfo(newName, newInfo) {
        return fetch(this.baseURL + '/users/me', {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({
                    name: newName,
                    about: newInfo
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
            .catch((err) => {
                console.log(err);
                console.log('Ошибка. Запрос не выполнен');
            });
    }

    /*    addMyCard(newTitle, newLink) {
            return fetch(this.baseURL + '/cards', {
                    method: 'POST',
                    headers: this.headers,
                    body: JSON.stringify({
                        name: newTitle,
                        link: newLink
                    })
                })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    console.log(res.json);
                })
                .catch((err) => {
                    console.log(err);
                    console.log('Ошибка. Запрос не выполнен');
                });
        }*/

}