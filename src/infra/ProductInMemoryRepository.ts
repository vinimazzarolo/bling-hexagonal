import ProductRepository from "../application/ProductRepository";
import Product from "../domain/Product";

export default class ProductInMemoryRepository implements ProductRepository {
    private products: Product[] = [];

    async getAll(): Promise<Product[]> {
        return await this.products;
    }

    async getById(id: String): Promise<Product | null> {
        const product = await this.products.find(product => product.getId() === id);

        if (!product) {
            return null;
        }

        return product;
    }

    async save(data: Product): Promise<String> {
        this.products.push(data);
        return data.getId();
    }

    async delete(id: String): Promise<any> {
        const productIndex = this.products.findIndex(product => product.getId() === id);
        this.products.splice(productIndex, 1);
    }
}