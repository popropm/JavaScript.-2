class GoodsList {
    constructor() {
        this.goods = [];
        this.filterGoods = [];
        this.filter = '';
    }

    fetchGoods() {
        return new Promise(function (resolve, reject) {
            this.goods = [
                { title: 'Shirt', price: 150 },
                { title: 'Socks', price: 50 },
                { title: 'Jacket', price: 350 },
                { title: 'Shoes', price: 250 },
                { title: 'Shirt', price: 150 },
                { title: 'Socks', price: 50 },
                { title: 'Jacket', price: 350 },
                { title: 'Shoes', price: 250 }
            ];
            resolve();
        }.bind(this))
    }

    countPrice() {
        let sum = 0;
        for (let i in this.goods) {
            if (this.goods[i].price) {
                sum += this.goods[i].price
            } else {
                sum += DEFAULT_PRICE
            }
        }
        return sum
    };

    FilterGoods() {
        this.filterGoods = [];
        for (let i in this.goods) {
            if (this.goods[i].title.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0 || this.filter === '') {
                this.filterGoods.push(this.goods[i]);
            }
        }
    }

    render() {
        this.FilterGoods();
        document.querySelector('.goods-list').innerHTML = '';
        if (this.filterGoods.length > 0) {
            let goodsList = this.filterGoods.map(item => {
                return `<div class="goods-item">
                <div class="img"></div>
                <h3>${item.title}</h3>
                <p>${item.price}</p>
                <div class="button" id="${item.title}">Добавить</div>
            </div>`
            });
            document.querySelector('.goods-list').innerHTML = goodsList.join('');
        } else {
            document.querySelector('.goods-list').innerHTML = 'Нет данных!';
        }

        for (let i in this.goods) {
            let button = document.getElementById(this.goods[i].title);
            if (button) button.onclick = () => {
                basket.addItems([this.goods[i]])
            }
        }
    }
}