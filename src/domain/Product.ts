export default class Product {
    constructor(
        private id: String,
        private name: String,
        private price: Number,
        private typee: String
    ) {}

    public getId(): String {
        return this.id;
    }

    public getName(): String {
        return this.name;
    }

    public getPrice(): Number {
        return this.price;
    }

    public getType(): String {
        return this.typee;
    }
}
