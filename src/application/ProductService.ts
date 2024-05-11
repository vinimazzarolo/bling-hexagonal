import Product from "../domain/Product";
import ProductRepository from "./ProductRepository";
const uuid = require('uuid')

export default class ProductService {
    constructor(private repository: ProductRepository) {}

    async getAll(): Promise<Product[]> {
        return await this.repository.getAll();
    }

    async getById(id: String): Promise<Product | null> {
        return await this.repository.getById(id);
    }

    async save(input: SaveProductInput): Promise<SaveProductOutput> {
        if (input.type === 'SERVICE') {
            input.price = Number(input.price) * 1.05;
        }
        if (input.type === 'PRODUCT') {
            input.price = Number(input.price) * 1.10;
        }

        const id = uuid.v4();
        const product = new Product(id, input.name, input.price, input.type);

        await this.repository.save(product);

        return { id };
    }

    async delete(id: String): Promise<any> {
        await this.repository.delete(id);
    }
}

type SaveProductInput = {
    name: String;
    price: Number;
    type: String;
}

type SaveProductOutput = {
    id: String;
}