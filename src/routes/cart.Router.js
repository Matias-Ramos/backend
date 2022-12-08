//--------------------------------------------
// variables and instances declaration 

const express = require('express')

// router module
const { Router } = express;
const routerCarts = new Router();

// container class
const CartsContainer = require('../contenedores/CartsContainer')
const CartService = new CartsContainer(process.cwd()+"/db/dbCarts.json")

//--------------------------------------------
// endpoints
 routerCarts.post('/', async (_req, res) => {
    CartService.createCart()
    .then( cartList => { 
        res.json(cartList)
    })
})

 routerCarts.delete('/:id', async (req, res) => {
    CartService.delete(req.params.id)
    .then( cartList => { 
        res.json(cartList)
    })
})

 routerCarts.get('/:id/productos', async (req, res) => {
    CartService.list(req.params.id)
    .then( cartProducts => { 
        res.json(cartProducts)
    })
})

 routerCarts.post('/:id_cart/productos/:id_prod', async (req, res) => {
    CartService.update(req.params.id_cart, req.params.id_prod)
    .then ( cart =>{
        res.json(cart)
    })
})

routerCarts.delete('/:id_cart/productos/:id_prod', async (req, res) => {
    CartService.deleteProdInCart(req.params.id_cart, req.params.id_prod)
    .then ( cart =>{
        res.json(cart)
    })
})

//--------------------------------------------
module.exports =  routerCarts