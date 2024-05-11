export default class Product {
    constructor(
        private id: String,
        private name: String,
        private price: Number,
        private type: String
    ) {}

    public getId(): String {
        return this.id;
    }

    public getName(): String {
        return this.name;
    }

    public getPrice(): Number {
        return Number(this.price.toFixed(2));
    }

    public getType(): String {
        return this.type;
    }
}
