import express from "express"; 
import productsRouter from './routes/productsRouter.js';
import { Server as HTTPServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { socketBehaviour } from './clients/socketIO.js'


//---------------
//app config
const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(express.static('public'))

//---------------
//socket config
const httpSv = new HTTPServer(app);
const io = new IOServer(httpSv);
io.on('connection', (socket) => socketBehaviour(socket, io))

//---------------
//server power on
const PORT = 8080
const connectedServer = httpSv.listen(PORT, () => {
    console.log(`sv. up on: ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error turning on the server: ${error}`))
