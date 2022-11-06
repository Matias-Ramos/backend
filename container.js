fileSys = require("fs").promises;

class Container {
  constructor(path) {
    this.path = path;
    this.counter = 1;
  }

  async deleteAll() {
    try {
      await fileSys.writeFile(this.path, "[]");
    } 
    catch (error) {
      console.log(`There has been an error: ${error}`);
    }
  }

  async deleteById(id) {
    try {
      const arrayOfProducts = await this.getAllProducts();
      const position = arrayOfProducts.map((item) => item.id).indexOf(id);
      arrayOfProducts.splice(position, 1);
      await fileSys.writeFile(this.path, JSON.stringify(arrayOfProducts));
      return arrayOfProducts;
    } 
    catch (error) {
      console.log(`There has been an error: ${error}`);
    }
  }

  async getById(id) {
    try {
      const arrayOfProducts = await this.getAllProducts();
      const product = arrayOfProducts.find((item) => item.id === id) || null; //"or" logical operator
      return product;
    } 
    catch (error) {
      console.log(`There has been an error: ${error}`);
    }
  }

  async save(product) {
    try {
      product = await this.setIdInProduct(product);
      const arrayOfProducts = await this.getAllProducts();
      arrayOfProducts.push(product);
      await fileSys.writeFile(this.path, JSON.stringify(arrayOfProducts));
      return product.id;
    } 
    catch (error) {
      console.log(`There has been an error: ${error}`);
    }
  }

  //support fn 1
  async setIdInProduct(product) {
    try {
      const previousProducts = await this.getAllProducts();
      if (previousProducts.length) {
        const lastProductInArray =
          previousProducts[previousProducts.length - 1];
        this.counter = lastProductInArray.id + 1;
      }
      product = { ...product, id: this.counter };
      return product;
    } 
    catch (error) {
      console.log(`There has been an error: ${error}`);
    }
  }

  //support fn 2
  async getAllProducts() {
    try {
      let arrayOfProducts = [];
      const rawData = await fileSys.readFile(this.path, "utf-8");
      rawData && (arrayOfProducts = JSON.parse(rawData)); // [...] || []
      return arrayOfProducts;
    } 
    catch (error) {
      console.log(`There has been an error: ${error}`);
    }
  }
}

module.exports = Container;
