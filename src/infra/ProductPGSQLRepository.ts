import ProductRepository from "../application/ProductRepository";
import Product from "../domain/Product";
import { database } from "./DatabaseConnection";

export default class ProductPGSQLRepository implements ProductRepository {
    async getAll(): Promise<Product[]> {
        const products = await database.query('SELECT * FROM products', []);
        return products;
    }

    async getById(id: String): Promise<Product> {
        const product = await database.query('SELECT * FROM products WHERE id = $1', [id]);
        return product;
    }

    async save(product: Product): Promise<String> {
        const id = await database.query('INSERT INTO products (id, name, price, type) VALUES ($1, $2, $3, $4) RETURNING id', [
            product.getId(),
            product.getName(),
            product.getPrice(),
            product.getType()
        ]);
        return id;
    }

    async delete(id: String): Promise<any> {
        await database.query('DELETE FROM products WHERE id = $1', [id]);
    }
}
