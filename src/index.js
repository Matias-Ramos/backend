import express from "express"; 
import { Server as HTTPServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { socketBehaviour } from './clients/socketIO.js'
import initializeTables from "./initializations/initializeTables.js";

//---------------
//app config
const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(express.static('public'))
initializeTables();

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
