let basket = new Basket();


Vue.component('search-input', {
    props: ['filter'],
    template: '' +
    '<div>' +
    '<label> Поиск: <input type="text" title="search" v-on:input="$emit(\'search\')"></label>' +
    '</div>'
});

let app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        filter: '',
        isVisibleCart: {
            visibility: 'hidden'
        }
    },
    methods: {
        search: function () {
            this.filteredGoods = [];
            for (let i in this.goods) {
                if (this.goods[i].title.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0 || this.filter === '') {
                    this.filteredGoods.push(this.goods[i]);
                }
            }
        },
        visibleBasket: function () {
            if (this.isVisibleCart.visibility === 'hidden') {
                this.isVisibleCart.visibility = 'visible'
            } else {
                this.isVisibleCart.visibility = 'hidden'
            }
        },
        getGoods: function (url) {
            return new Promise(function (resolve, reject) {
                let goods = [
                    {title: 'Shirt', price: 150},
                    {title: 'Socks', price: 50},
                    {title: 'Jacket', price: 350},
                    {title: 'Shoes', price: 350},
                    {title: 'Shirt', price: 150},
                    {title: 'Socks', price: 50},
                    {title: 'Jacket', price: 350},
                    {title: 'Shoes', price: 350},

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