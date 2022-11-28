//--------------------------------------------
// instancio servidor, socket y api

const express = require('express')

const { Server: HTTPServer } = require('http')
const { Server: IOServer } = require('socket.io')

const purchaseClass = require("../classes/purchaseClass.js");
const purchases = new purchaseClass(process.cwd()+`/records/purchaseRecord.txt`);

const app = express();
const httpSv = new HTTPServer(app);
const io = new IOServer(httpSv);

//--------------------------------------------
// declaro variables locales
let chatRecord = [];

//--------------------------------------------
// configuro el socket

io.on('connection', socket => {
    
    //products
    purchases.getAllProducts()
    .then( purchaseList => 
        socket.emit('newPurchaseList', purchaseList));

    socket.on('newPurchaseObj', purchaseObj =>{
        purchases.save(purchaseObj)
        .then( purchaseList =>{
            io.sockets.emit('newPurchaseList', purchaseList);
        } )
    })
    
    //chat
    socket.emit('newChatRecord', chatRecord);
    socket.on('newMessageObj', message=>{
        chatRecord.push(message);
        io.sockets.emit('newChatRecord', chatRecord);
    });

});

//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//--------------------------------------------
// inicio el servidor

const PORT = 8080
const connectedServer = httpSv.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
