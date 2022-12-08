//--------------------------------------------
// variables and instances declaration 

const express = require('express')
const app = express()

const routerProducts = require('./routes/products.Router')
const carritosRouter = require('./routes/cart.Router')

//--------------------------------------------
// server config

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/productos', routerProducts)
app.use('/api/carritos', carritosRouter)
app.get('*', function (req, res) {
    res.send({ status: "error", description: `ruta ${req.url} método ${req.method} no implementada` });
})
//--------------------------------------------
module.exports = app