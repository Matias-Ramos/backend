import knexClient from "../clients/knexClient.js";

export default class ProductModel{

    constructor(tableName){
        this.tableName = tableName;
    }

    async createProduct(product){
        try{
            await knexClient(this.tableName).insert(product);
            return await this.fetchProducts();
        } catch (err) {
            console.error(`There has been a failure creating the product: ${err}`);
        } finally { 
            knexClient.destroy();
        }

    }

    async fetchProducts(){
        try{
            const productList = await knexClient(this.tableName).select('*');
            return productList;        
        } catch (err) {
            console.error(`There has been a failure fetching the product list: ${err}`);
        } finally { 
            knexClient.destroy();
        }
    }

    async fetchProduct(id){
        try{
            const product = await knexClient(this.tableName).select('*').where('id', parseInt(id));
            return product;
        } catch (err) {
            console.error(`There has been a failure fetching the product: ${err}`);
        } finally { 
            knexClient.destroy();
        }
    }

    async updateProduct(id, product){
        try{
            await knexClient(this.tableName).where('id', parseInt(id)).update(product);
        } catch (err) {
            console.error(`There has been a failure updating the product: ${err}`);
        } finally { 
            knexClient.destroy();
        }
    }

    async deleteProduct(id){
        try{
            await knexClient(this.tableName).where('id', parseInt(id)).del();
        } catch (err) {
            console.error(`There has been a failure deleting the product: ${err}`);
        } finally { 
            knexClient.destroy();
        }
    }
}