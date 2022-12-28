import ProductModel from "../models/ProductModel.js";

//----------------------------------------
// Local variables declaration
let chatRecord = [];
const productModel = new ProductModel("products");

//----------------------------------------
//----------------------------------------
function socketBehaviour (socket, io) {
    //--------products----------
    //emit
    productModel.fetchProducts()
    .then( purchaseList => 
        socket.emit('newPurchaseList', purchaseList));
    //receive
    socket.on('newPurchaseObj', purchaseObj =>{
        productModel.createProduct(purchaseObj)
        .then( purchaseList =>{
            io.sockets.emit('newPurchaseList', purchaseList);
        } )
    })
    
    //--------chats----------
    //emit
    socket.emit('newChatRecord', chatRecord);
    //receive
    socket.on('newMessageObj', message=>{
        chatRecord.push(message);
        io.sockets.emit('newChatRecord', chatRecord);
    });
    //----------------------------------------
}
export {socketBehaviour}; 