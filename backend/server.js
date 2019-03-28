const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(express.static('../static'));
app.use(cors());

const addItem = (item, cart) => {
    for (let good of cart.contents) {
        if (good.id_product === item.id_product) {
            good.quantity++;
            return;
        }
    }
    cart.contents.push(item);
};

app.get('/catalogData', (req, res) => {
    fs.readFile('./catalog.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.post('/addToCart', (req, res) => {
    fs.readFile('./cart.json', 'utf8', (err, data) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            const cart = JSON.parse(data);
            const item = req.body;
            ++cart.countGoods;
            cart.amount += item.price;
            addItem(item, cart);
            fs.writeFile('./cart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            });
        }
    });
});
app.get('/getBasket', (req, res) => {
    fs.readFile('./cart.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.post('/deleteFromBasket', (req, res) => {
    fs.readFile('./cart.json', 'utf8', (err, data) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            const cart = JSON.parse(data);
            const item = req.body;
            cart.contents.forEach(good => {
                if (good.id_product === item.id) {
                    cart.amount -= (good.price * good.quantity);
                    cart.countGoods -= (good.quantity);
                }
            });
            cart.contents = cart.contents.filter(good => good.id_product !== item.id);
            fs.writeFile('./cart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            });
        }
    });
});

app.post('/deleteAllBasket', (req, res) => {
    fs.writeFile('./cart.json', ('{"amount":0,"countGoods":0,"contents":[]}'), (err) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            res.send('{"result": 1}');
        }
    });
});

app.listen(3000, function () {
    console.log('server is running on port 3000!');
});