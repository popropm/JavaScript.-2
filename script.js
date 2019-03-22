const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 }
];

const value = 250;
const renderGoodsItem = (title, price = value) =>
    `<div class="goods-item">
<div class="img"></div>
        <h3>${title}</h3>
        <p>${price}</p>
        <div class="button">  Добавить</div>
  
    </div>`;



const renderGoodsList = list => {
    const goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
}

window.onload = () => {
    renderGoodsList(goods);
};
let GoodsList = document.querySelector('.goods-list');
GoodsList.sumAllItem = function () {
    let sum = 0;
    for (let i in goods) {
        if (goods[i].price) {
            sum += goods[i].price
        } else {
            sum += valued
        }
    }
    return sum
};

const list = new GoodsList();
list.fetchGoods();

//  Task1/2;
let str = string.innerHTML;
const regexp = /([^\wа-я])'(.+?)'([^\wа-я])/ig;
document.write(str.replace(regexp, '$1"$2"$3'));


function makeGetRequest(url){
     return new Promise(resolve =>{
     let xhr;
     if ( window .XMLHttpRequest) {
xhr = new XMLHttpRequest();
} else if ( window .ActiveXObject) {
xhr = new ActiveXObject( "Microsoft.XMLHTTP" );
}
     xhr.onreadystatechange = function (){
         if(xhr.readyState === 400){
             resolve(xhr.responseText);
         }
     }
     xhr.open('GET', url, true);
     xhr.send();
     });
}


const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: ''
    },
    methods: {
        makeGETRequest(url) {
            return new Promise((resolve, reject) => {
                const xhr = window.XMLHttpRequest
                    ? new window.XMLHttpRequest() : new window.ActiveXObject()
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            resolve(JSON.parse(xhr.responseText))
                        }
                        reject(new Error())
                    }
                }
                xhr.open('GET', url, true)
                xhr.send()
            })
        }
    },
    async created() {
        try {
            this.goods = await this.makeGETRequest('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json')
            this.filteredGoods = this.goods
        } catch(err) {
            console.error(err)
        }
    }
})