import ProductModel from "../CRUD/ProductModel.js";
import chatsModel from "../CRUD/chatsModel.js";

//----------------------------------------
// Class instanciations
const productModel = new ProductModel("products");
const chatModel = new chatsModel("chats");

//----------------------------------------
function socketBehaviour (socket, io) {
    //prd-emit
    productModel.fetchProducts()
    .then( purchaseList => 
        socket.emit('newPurchaseList', purchaseList));
    //prd-receive
    socket.on('newPurchaseObj', purchaseObj =>{
        productModel.createProduct(purchaseObj)
        .then( purchaseList =>{
            io.sockets.emit('newPurchaseList', purchaseList);
        } )
    })
    
    //chat-emit
    chatModel.fetchMessages()
    .then( chats => 
        socket.emit('newChatRecord', chats));
    //chat-receive
    socket.on('newMessageObj', message=>{
        chatModel.saveMessage(message)
        .then( chats => {
            io.sockets.emit('newChatRecord', chats);
        })
    })
}
export {socketBehaviour}; 