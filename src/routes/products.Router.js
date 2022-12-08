//--------------------------------------------
// variables and instances declaration 

const express = require('express');

// router module
const { Router } = express;
const routerProducts = new Router();

// container class
const ContainerProducts = require('../contenedores/ContainerProducts')
const ProductService = new ContainerProducts(process.cwd()+"/db/dbProducts.json")

// authentication
const {authenticateAdmin} = require("../authenticateAdmin")

//--------------------------------------------
// endpoints
routerProducts.get('/', async (_req, res) => {
    ProductService.listAll()
    .then( products => { 
        res.json(products)
    } )
})

routerProducts.get('/:id', async (req, res) => {
    ProductService.list(req.params.id)
    .then( product => { 
        res.json(product)
    } )
})

routerProducts.post('/', authenticateAdmin, async (req, res) => {
    ProductService.save(req.body)
    .then( productList => { 
        res.json(productList)
    })
})

routerProducts.put('/:id', authenticateAdmin, async (req, res) => {
    ProductService.update(req.body, req.params.id)
    .then( productList => { 
        res.json(productList)
    } )
})

routerProducts.delete('/:id', authenticateAdmin, async (req, res) => {
    ProductService.delete(req.params.id)
    .then( productList => { 
        res.json(productList)
    } )
})


module.exports = routerProducts