import { knexProducts } from "../clients/knexClients.js";

export default class ProductModel{

    constructor(tableName){
        this.tableName = tableName;
    }

    async createProduct(product){
        try{
            await knexProducts(this.tableName).insert(product);
            return await this.fetchProducts();
        } catch (err) {
            console.error(`There has been a failure creating the product: ${err}`);
        }
    }

    async fetchProducts(){
        try{
            const productList = await knexProducts(this.tableName).select('*');
            return productList;        
        } catch (err) {
            console.error(`There has been a failure fetching the product list: ${err}`);
        }
    }

    // async fetchProduct(id){
    //     try{
    //         const product = await knexProducts(this.tableName).select('*').where('id', parseInt(id));
    //         return product;
    //     } catch (err) {
    //         console.error(`There has been a failure fetching the product: ${err}`);
    //     } 
    // }

    // async updateProduct(id, product){
    //     try{
    //         await knexProducts(this.tableName).where('id', parseInt(id)).update(product);
    //     } catch (err) {
    //         console.error(`There has been a failure updating the product: ${err}`);
    //     }
    // }

    // async deleteProduct(id){
    //     try{
    //         await knexProducts(this.tableName).where('id', parseInt(id)).del();
    //     } catch (err) {
    //         console.error(`There has been a failure deleting the product: ${err}`);
    //     }
    // }
}