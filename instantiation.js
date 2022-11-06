const Container = require("./container.js");
let myContainer = new Container("./productos.txt");

//getAll
exports.getAllProducts = async function(){
    return await myContainer.getAllProducts();
}
