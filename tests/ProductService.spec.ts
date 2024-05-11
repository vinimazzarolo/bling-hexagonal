import { afterAll, expect, test } from "bun:test";
import ProductPGSQLRepository from "../src/infra/ProductPGSQLRepository";
import ProductService from "../src/application/ProductService";
import { database } from "../src/infra/DatabaseConnection";
import ProductInMemoryRepository from "../src/infra/ProductInMemoryRepository";

const productRepository = new ProductInMemoryRepository();

test('Deve calcular um acréscimo de 10% no preço ao cadastrar um produto', async () => {
    // Arrange
    const productService = new ProductService(productRepository);
    const input = { name: 'Produto 1', price: 100, type: 'PRODUCT' };

    // Act
    const output = await productService.save(input);
    const product = await productService.getById(output.id);

    // Assert
    expect(output.id).not.toBeNull();
    expect(output.id).not.toBeUndefined();
    expect(output.id).toBeString();
    expect(output.id).toHaveLength(36);
    expect(product?.getPrice()).toBe(110);
});

test('Deve calcular um acréscimo de 5% no preço ao cadastrar um serviço', async () => {
    // Arrange
    const productService = new ProductService(productRepository);
    const input = { name: 'Serviço 1', price: 100, type: 'SERVICE' };

    // Act
    const output = await productService.save(input);
    const product = await productService.getById(output.id);

    // Assert
    expect(output.id).not.toBeNull();
    expect(output.id).not.toBeUndefined();
    expect(output.id).toBeString();
    expect(output.id).toHaveLength(36);
    expect(product?.getPrice()).toBe(105);
});

afterAll(async () => {
    database.$pool.end();
});
