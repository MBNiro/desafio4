import express from "express";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.roter.js";
import ProductManager from "./manager/product.manager.js";

const productManager = new ProductManager("/products.json");

const app = express();

app.use("/", viewsRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

const httpServer = app.listen(8080, () => {
  console.log("Server ok on port 8080");
});

const socketServer = new Server(httpServer);

const arrayProducts = [];

socketServer.on("connection", (socket) => {
  console.log("usuario conectado!", socket.id);
  socket.on("disconnect", () => {
    console.log("usuario desconectado!");
  });

  socketServer.emit("arrayProducts", arrayProducts);

  socket.on("newProduct", (obj) => {
    arrayProducts.push(obj);
    socketServer.emit("arrayProducts", arrayProducts);
  });
});