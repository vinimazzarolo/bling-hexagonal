import ProductRepository from "../application/ProductRepository";
import Product from "../domain/Product";
import { database } from "./DatabaseConnection";

export default class ProductPGSQLRepository implements ProductRepository {
    async getAll(): Promise<Product[]> {
        const result = await database.query('SELECT * FROM products', []);
        const products = result.map((row: any) => {
            return new Product(row.id, row.name, row.price, row.type);
        });
        return products;
    }

    async getById(id: String): Promise<Product> {
        const result = await database.query('SELECT * FROM products WHERE id = $1', [id]);
        const product = new Product(result[0].id, result[0].name, Number(result[0].price), result[0].type);
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
