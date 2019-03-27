let basket = new Basket();

Vue.component('search-input', {
    template: '' +
    '<div>' +
    '<label> Поиск: <input v-on:input="$emit(\'input\', $event.target.value)" type="text" title="search"></label>' +
    '</div>',
});

Vue.component('basket', {
    template: '' +
    '<div id="basket">' +
    '   <div id="itemsPool"></div>' +
    '</div>'
});

Vue.component('alert', {
    template: '<div id="alert"> Нет данных!</div>'
});

let app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        filter: '',
        isVisibleCart: false,
    },
    methods: {
        search: function (filter) {
            this.filter = filter;
            this.filteredGoods = [];
            for (let i in this.goods) {
                if (this.goods[i].title.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0 || this.filter === '') {
                    this.filteredGoods.push(this.goods[i]);
                }
            }
        },
        visibleBasket: function () {
            this.isVisibleCart = !this.isVisibleCart
        },
        getGoods: function (url) {
            return new Promise(function (resolve, reject) {
                let goods = [
                    { title: 'Shirt', price: 150 },
                    { title: 'Socks', price: 50 },
                    { title: 'Jacket', price: 350 },
                    { title: 'Shoes', price: 250 },
                    { title: 'Shirt', price: 150 },
                    { title: 'Socks', price: 50 },
                    { title: 'Jacket', price: 350 },
                    { title: 'Shoes', price: 250 }

                ];
                resolve(goods);
            });
        },
        countPrice() {
            let sum = 0;
            for (let i in this.goods) {
                sum += this.goods[i].price
            }
            return sum
        },
    },
    created: function () {
        let promise = this.getGoods('http://localhost:8080/');
        promise.then(result => {
                this.goods = result;
                this.filteredGoods = result;
            },
            error => {
                console.log(error)
            },
        );
    }
});