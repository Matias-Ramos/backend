//execution: npm run migrate
    
import knexClient from "../clients/knexClient.js";

(async ()=>{
    try{
        //old tables clean up
        await knexClient.schema.dropTableIfExists('products');
        await knexClient.schema.dropTableIfExists('chats');

        //table creation - products
        await knexClient.schema.createTable('products', table =>{
            table.increments('id').primary();
            table.string('name').notNullable();
            table.integer('price').notNullable().unsigned();
            table.string('thumbnail').notNullable();
        })
        //table creation - chats
        await knexClient.schema.createTable('chats', table =>{
            table.increments('id').primary();
            table.string('email').notNullable();
            table.string('message').notNullable();   
        })

    } catch (error) {
        console.log(`DB couldn't be initialized: ${error}`)
    } finally {
        knexClient.destroy();
    }
})()