const DEFAULT_PRICE = 250;
let goodsItems = new GoodsList();

let basket = new Basket();

window.onload = () => {
    let promise = goodsItems.fetchGoods();

    promise.then(result => {
            goodsItems.render();
        },
        error => {
            console.log(error)
        },
    );
};

sendHttp();

function sendHttp() {
    let promise = makeGetRequest('http://localhost:8080/');
    promise.then(result => {
            console.log(result)
        },
        error => {
            console.log(error)
        },
    );
}

function makeGetRequest(url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.status === 200) {
                resolve(xhr);
            } else {
                reject("ololo");
            }
        }
    });
}

let app = new Vue({
    el: '#app',
    data: {
        filter: '',
        isVisibleCart: {
            visibility: 'hidden'
        }
    },
    methods: {
        search: function () {
            goodsItems.filter = this.filter;
            goodsItems.render();
        },
        visibleBasket: function () {
            if (this.isVisibleCart.visibility === 'hidden') {
                this.isVisibleCart.visibility = 'visible'
            } else {
                this.isVisibleCart.visibility = 'hidden'
            }
        }
    }
});