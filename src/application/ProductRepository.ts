import Product from "../domain/Product";

export default interface ProductRepository {
    getAll(): Promise<Product[]>;
    getById(id: String): Promise<Product | null>;
    save(data: Product): Promise<String>;
    delete(id: String): Promise<any>;
}
