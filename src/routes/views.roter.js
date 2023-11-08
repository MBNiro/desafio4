import { Router } from "express";
import ProductManager from "../manager/product.manager.js";

const productManager = new ProductManager("./products.json");
const router = Router();

router.get("/index", async (req, res) => {
  const products = await productManager.getAllProducts();
  res.render("index", { products });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

export default router;