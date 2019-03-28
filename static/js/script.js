const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        cartGoods: [],
        fetchError: false,
    },
    mounted() {
        return new Promise(resolve => {
            fetch('http://127.0.0.1:3000/catalogData')
                .then(response => response.json())
                .then(json => {
                    json.forEach(good => {
                        Vue.set(good, 'quantity', 1);
                    });
                    this.goods = json;
                    this.filteredGoods = json;
                })
                .catch(error => this.fetchError = true)
        })
    },
    methods: {
        filterGoods() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        },
        fetchGoodsCart() {
            return new Promise(resolve => {
                fetch(`http://127.0.0.1:3000/getBasket`)
                    .then(response => response.json())
                    .then(json => {
                        this.cartGoods = json;
                    })
            })
        },
        isVisibleCart(element) {
            basket.style.display = element;
        },
    },
    computed: {}
});

Vue.component('search-input', {
    props: ['value'],
    template:
        `<input id="searchInput" type="text" class="goods-search" v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)">`,
})

Vue.component('goods-item', {
    props: ['good'],
    template:
        `<div class="goods-item">
            <h3>{{ good.product_name }}</h3>
            <p>{{ good.price }} рублей </p>
            <button :id="good.id_product" @click="$emit('add-item')" class="cart-button"> В корзину </button>
        </div>`,
});

Vue.component('goods-list', {
    props: ['goods', 'cart'],
    template:
        `<div>
        <div class="goods-list" v-if="goods.length !== 0">
        <goods-item v-for="good in goods" :good="good" v-on:add-item="appendGoods()"></goods-item>
        </div>
         <h1 v-else>Нет данных</h1>
    </div>`,
    methods: {
        appendGoods() {
            console.log(1)
            const goodData = this.goods.filter(good => good.id_product == event.target.id);
            fetch('http://127.0.0.1:3000/addToCart', {
                method: 'post',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(goodData[0])
            })
                .then(response => response.json())
                .then(json => {
                    if (json.result === 1) {
                        app.fetchGoodsCart()
                    }
                })
        },
    }
});

Vue.component('basket', {
    props: ['cart'],
    template:
        `<div id="basket">
        <button id="buttonCart" @click="$emit('is-visible-cart')" class="button">&#10008;</button>
        <h1>Корзина:</h1>
        <h3 id="amount">Всего товаров: {{cart.countGoods}}шт.
        <br>Общая сумма: {{cart.amount}} рублей </h3>
        <basket-list :cart="cart"></basket-list>
        <button class="cart-button">Купить</button>
            <button id="remove" class="cart-button" @click="clearBasket">Очистить</button>
    </div>`,
    methods: {
        clearBasket: function () {
            fetch('http://127.0.0.1:3000/deleteAllBasket', {
                method: 'post',
            })
                .then(response => response.json())
                .then(json => {
                    if (json.result === 1) {
                        app.fetchGoodsCart()
                    }
                })
        }
    }
});

Vue.component('basket-list', {
    props: ['cart'],
    template:
        `<ol id="ol">
        <basket-item v-for="good in cart.contents" :good="good" v-on:remove-item="deleteFromBasket()"></basket-item>
        </ol>`,
    methods: {
        deleteFromBasket() {
            const goodId = event.target.id;
            fetch('http://127.0.0.1:3000/deleteFromBasket', {
                method: 'post',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({'id': goodId})
            })
                .then(response => response.json())
                .then(json => {
                    if (json.result == 1) {
                        this.removeItem(goodId);
                    }
                })
        },
        removeItem(goodId) {
            this.cart.contents.forEach(good => {
                if (good.id_product == goodId) {
                    this.cart.amount -= (good.price * good.quantity);
                    this.cart.countGoods -= (good.quantity);
                }
            })
            this.cart.contents = this.cart.contents.filter(good => good.id_product !== goodId);
        }
    }
});

Vue.component('basket-item', {
    props: ['good'],
    template:
        `<li>{{good.product_name}} - {{good.quantity}}шт. по цене: {{good.price}} рублей на сумму: {{good.quantity * good.price}} рублей
         <button class="button" :id="good.id_product" @click="$emit('remove-item')">&#10008;</button>
         </li>`
});
Vue.component('error', {
    template:
        `<h1 class="error" if>ERROR</h1>`
});