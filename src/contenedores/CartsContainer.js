const { promises: fs } = require("fs");
const { type } = require("os");

class CartsContainer {
  constructor(path) {
    this.path = path;
  }

  async list(id) {
    try {
      const cartList = JSON.parse(await fs.readFile(this.path, "utf8"));
      const cart = cartList.find( cart => cart.id === parseInt(id));
      return cart.products;
    } catch (error) {
      console.log(
        `There has been an error retrieving your single cart products: ${error}`
      );
    }
  }

  async createCart() {
    try {
      const cartList = JSON.parse(await fs.readFile(this.path, "utf8"));

      // addition of automatic properties
      const ids = cartList.map(cart => {
        return cart.id;
      });
      const availableID = Math.max(...ids) + 1;
      cartList.push({
        id: availableID,
        timestamp: Date.now(),
        products: [],
      });

      // persistence
      await fs.writeFile(this.path, JSON.stringify(cartList));
      return cartList;
    } 
    catch (error) {
      console.log(`There has been an error saving a new cart: ${error}`);
    }
  }

  async delete(id) {
    try {
      const cartList = JSON.parse(await fs.readFile(this.path, "utf8"));
      const position = cartList.findIndex( cart => cart.id === parseInt(id));
      position > -1 && cartList.splice(position, 1);
      await fs.writeFile(this.path, JSON.stringify(cartList));
      return cartList;
    } catch (error) {
      console.log(`There has been an error deleting the cart: ${error}`);
    }
  }

  async update(cartID, prodID) {
    try {

      // cart matching
      const cartList = JSON.parse(await fs.readFile(this.path, "utf8"));
      const position = cartList.findIndex( cart => cart.id === parseInt(cartID)); // (position = -1) <-- no cartID coincidence in cartList
      
      // product matching
      const productList = JSON.parse( await fs.readFile(this.path.replace("dbCarts", "dbProducts"), "utf8")
        );
      const product = productList.find ( item => item.id == parseInt(prodID) )
      
      // product push into cart w/ validation
      position > -1 && cartList[position].products.push(product)
      
      //persistence
      await fs.writeFile(this.path, JSON.stringify(cartList));
      return cartList[position];
    } 
    catch (error) {
      console.log(`There has been an error updating the cart: ${error}`);
    }
  }

  async deleteProdInCart(cartID, productID) {
    try {
        const cartList = JSON.parse(await fs.readFile(this.path, "utf8"));
        const index = cartList.findIndex( cart => cart.id === parseInt(cartID)); // (index = -1) <-- no cartID coincidence in cartList
        
        if(index > -1) { 
            const filteredProducts = cartList[index].products.filter( product =>
                product.id != parseInt(productID) )
            cartList[index].products = filteredProducts;
    
            await fs.writeFile(this.path, JSON.stringify(cartList));
            return cartList[index];
        } else { 
            throw (`There is no cart with the ID ${cartID}`)
        }
      } catch (error) {
        console.log(`There has been an error deleting the product: ${error}`);
      }
  }
}

module.exports = CartsContainer;
