const fileSys = require("fs").promises;

class purchaseClass {
  constructor(path) {
    this.path = path;
  }

  async save(product) {
    try {
      let purchaseList = await this.getAllProducts();
      purchaseList.push(product);
      await fileSys.writeFile(this.path, JSON.stringify(purchaseList));
      return purchaseList;
    }
    catch (error) {
      console.log(`There has been an error 1: ${error}`);
    }
  }

  //support fn 2
  async getAllProducts() {
    try {
      let purchaseList = [];
      const rawData = await fileSys.readFile(this.path, "utf-8");
      rawData && (purchaseList = JSON.parse(rawData)); // [...] || []
      return purchaseList;
    } catch (error) {
      console.log(`There has been an error 2: ${error}`);
    }
  }
}

module.exports = purchaseClass;
