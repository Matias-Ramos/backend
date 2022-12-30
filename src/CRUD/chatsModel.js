import { knexChats } from "../clients/knexClients.js";

export default class chatsModel{

    constructor(tableName){
        this.tableName = tableName;
    }

    async saveMessage(message){
        try{
            await knexChats(this.tableName).insert(message);
            return await this.fetchMessages();
        } catch (err) {
            console.error(`There has been a failure saving the message: ${err}`);
        }
    }

    async fetchMessages(){
        try{
            const productList = await knexChats(this.tableName).select('*');
            return productList;        
        } catch (err) {
            console.error(`There has been a failure fetching the chat list: ${err}`);
        }
    }

}