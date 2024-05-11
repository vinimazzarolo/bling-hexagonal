import { Router, Request, Response } from "express";
import ProductPGSQLRepository from "./infra/ProductPGSQLRepository";
import ProductService from "./application/ProductService";

const express = require('express');
const route = Router();
const app = express();
app.use(express.json());

const productRepository = new ProductPGSQLRepository();

route.get('/products', async (req: Request, res: Response) => {
    const service = new ProductService(productRepository);
    const response = await service.getAll();
    res.json(response);
});

route.post('/products', async (req: Request, res: Response) => {
    const service = new ProductService(productRepository);
    const response = await service.save(req.body);
    res.json(response);
});

route.delete('/products/:id', async (req: Request, res: Response) => {
    const service = new ProductService(productRepository);
    await service.delete(req.params.id);
    res.json();
});

app.use(route);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
