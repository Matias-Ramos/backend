const { promises: fs } = require('fs')

class ContainerProducts {

    constructor(path) {
        this.path = path;
    }

    async list(id) {
        try {
            const productList = JSON.parse(await fs.readFile(this.path, 'utf8'));
            const product = productList.find( item => item.id === parseInt(id));
            return product;
          }
          catch (error) {
            console.log(`There has been an error retrieving the specific product: ${error}`);
          }
    }

    async listAll() {
        const productList = JSON.parse(await fs.readFile(this.path, 'utf8'));
        return productList;
    }

    async save(product) {
        try {
            const productList = JSON.parse(await fs.readFile(this.path, 'utf8'));

            // addition of automatic properties
            const ids = productList.map(item => {
              return item.id;
            });
            const availableID = Math.max(...ids) + 1;
            product = { ...product, id: availableID, timeStamp: Date.now() };

            // persistence
            productList.push(product);
            await fs.writeFile(this.path, JSON.stringify(productList));
            return productList;
          } 
          catch (error) {
            console.log(`There has been an error posting the product: ${error}`);
          }
    }

    async update(product, id) {
        try {
            const productList = JSON.parse(await fs.readFile(this.path, 'utf8'));
            const position = productList.findIndex( product => product.id === parseInt(id)); // (position = -1) <-- no productID coincidence in productList
            
            // addition of automatic properties
            if(position > -1) {
              product = {...product, "id":id, "timeStamp":productList[position].timeStamp}
              productList[position] = product;
            }

            // persistence
            await fs.writeFile(this.path, JSON.stringify(productList));
            return productList;
          } 
          catch (error) {
            console.log(`There has been an error updating the product: ${error}`);
          }
    }

    async delete(id) {
        try {
            const productList = JSON.parse(await fs.readFile(this.path, 'utf8'));
            const position = productList.findIndex( product => product.id === parseInt(id));
            position > -1 && productList.splice(position, 1);
            
            await fs.writeFile(this.path, JSON.stringify(productList));
            return productList;
          } 
          catch (error) {
            console.log(`There has been an error deleting the product: ${error}`);
          }
    }

    async deleteAll() {

    }
}

module.exports = ContainerProducts