import {Router} from "express";
import ProductModel from "../models/ProductModel.js";

//instances
const productsRouter = new Router();
const productModel = new ProductModel("products");

//------------------------------------
//AUX. FN.
const productList = async function (){
    const productList = await productModel.fetchProducts();
    return productList;
}

//CREATE
productsRouter.post('/', async(req, resp)=>{
    try {
        const product = req.body;
        await productModel.createProduct(product);
        resp.json( await productList() );
    } catch (err) {
        resp.send(`There has been a failure creating the product (post method): ${err}`);
    }
})

//READ ALL
productsRouter.get('/', async(_req, resp)=>{
    try {
        resp.json( await productList() );
    } catch (err) {
        resp.send(`There has been a failure retrieving the product list (get method): ${err}`);
    }
})

//READ SINGLE
productsRouter.get('/:id', async(req, resp)=>{
    try {
        const product = await productModel.fetchProduct(req.params.id);
        resp.json(product);
    } catch (err) {
        resp.send(`There has been a failure retrieving the single product (get method): ${err}`);
    }
})

//UPDATE
productsRouter.put('/:id', async(req, resp)=>{
    try {
        //update
        const updatedProductObj = req.body;
        const productId = req.params.id;
        await productModel.updateProduct(productId, updatedProductObj);
        resp.json( await productList() );
    } catch (err) {
        resp.send(`There has been a failure updating the product (put method): ${err}`);
    }
})

//DELETE
productsRouter.delete('/:id', async(req, resp)=>{
    try {
        await productModel.deleteProduct(req.params.id);
        resp.json( await productList() );
    } catch (err) {
        resp.send(`There has been a failure deleting the product (del method): ${err}`);
    }
})

export default productsRouter;