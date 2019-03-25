function Item(name = '', price = 0, count = 0) {
    this.name = name;
    this.price = price;
    this.count = count;
    this.add = function () {
        this.count++
    };
    this.remove = function () {
        if (this.count > 0) this.count--
    };
    this.getAllPrice = function () {
        return this.price * this.count
    }
}