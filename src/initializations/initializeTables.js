import {knexProducts, knexChats} from "../clients/knexClients.js";

export default async function initializeTables() {
    //PRODUCTS
    if (await knexProducts.schema.hasTable('products') == false) {            
        await knexProducts.schema.createTable('products', table =>{
            table.increments('id').primary();
            table.string('name').notNullable();
            table.integer('price').notNullable().unsigned();
            table.string('thumbnail').notNullable();
        })
    }
    //CHATS
    if (await knexChats.schema.hasTable('chats') == false) {
        await knexChats.schema.createTable('chats', table =>{
            table.increments('id').primary();
            table.string('email').notNullable();
            table.string('message').notNullable();   
        })
    }
}
