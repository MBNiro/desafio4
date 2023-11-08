const socketClient = io();

const form = document.getElementById("form");
const inputName = document.getElementById("name");
const inputPrice = document.getElementById("price");
const products = document.getElementById("products");

const inputStock = document.getElementById("stock");
const inputDescription = document.getElementById("description");

form.onsubmit = (e) => {
  e.preventDefault();
  const name = inputName.value;
  const price = inputPrice.value;
  const stock = inputStock.value;
  const description = inputDescription.value;
  socketClient.emit("newProduct", { name, price, stock, description });
};

socketClient.on("arrayProducts", (array) => {
  console.log(array);
  let infoProducts = "";
  array.forEach((p) => {
    infoProducts += `Producto: ${p.name} - Precio: $${p.price} - Stock: ${p.stock} - Descripción: ${p.description} <br>`;
  });
  products.innerHTML = infoProducts;
});