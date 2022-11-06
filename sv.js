const express = require("express");
const { getAllProducts } = require("./instantiation");
const app = express();
const port = 8080;

//allProducts
app.get("/productos", (request, response) => {
  getAllProducts().then((arrayProducts) =>
    response.send(`${JSON.stringify(arrayProducts)}`)
  );
});

//productRandom
app.get("/productoRandom", (request, response) => {
  function getRandomNumb(min, max) {
    return Math.trunc(Math.random() * (max - min) + min);
  }

  getAllProducts().then((arrayProducts) =>
    response.send(`
        ${JSON.stringify(
          arrayProducts[getRandomNumb(1, arrayProducts.length)]
        )}`)
  );
});

const server = app.listen(port, () => {
  console.log(`up on: ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error on server: ${error}`));
