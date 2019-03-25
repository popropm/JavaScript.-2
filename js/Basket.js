class Basket {
    constructor(items = []) {
        this.items = items;
        this.isVisibleCart = false;
    }

    addItems(items = []) {
        this.items = this.items.concat(items);
    };

    removeItems(items = []) {
    };

    getItems() {
        return this.items
    };
}