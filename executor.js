const {myContainer, product} = require("./logical.js")

async function execute(){
    myContainer.save(product)
    .then( id => console.log(`Fue creado el item número ${id}`));
}

async function execute2(id){
    myContainer.getById(id).then( product => {
        console.log("El producto buscado es:\n");
        console.log(product)});
}

async function execute3(id){
    myContainer.deleteById(id).then( array => console.log(array));
}

async function execute4(){
    myContainer.deleteAll()
    myContainer.getAllProducts().then( array => console.log(array));
}

//comentar 3 de las 4 lineas debajo para ejecutar el programa a elección.
execute(); // SAVE
// execute2(3); //GET BY ID
// execute3(8); // DELETE BY ID
// execute4(); //DELETE ALL