import { Router } from "express";
import CartManager from "../dao/cartManager.js";
import cartControllers from "../controllers/cartControllers.js";

const cartsRouter = Router();
const CM = new CartManager();

cartsRouter.post("/", cartControllers.createCart.bind(cartControllers));
cartsRouter.get("/:cid", cartControllers.getCart.bind(cartControllers));

cartsRouter.post(
  "/:cid/products/:pid",
  cartControllers.addProductToCart.bind(cartControllers)
);

cartsRouter.put("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const quantity = req.body.quantity;
  const result = await CM.updateQuantityProductFromCart(cid, pid, quantity);

  if (result) {
    res.send({
      status: "ok",
      message: "El producto se actualizó correctamente!",
    });
  } else {
    res.status(400).send({
      status: "error",
      message: "Error! No se pudo actualizar el Producto del Carrito!",
    });
  }
});

cartsRouter.put("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const products = req.body.products;
  const result = await CM.updateProducts(cid, products);

  if (result) {
    res.send({ status: "ok", message: "El producto se agregó correctamente!" });
  } else {
    res
      .status(400)
      .send({
        status: "error",
        message: "Error! No se pudo agregar el Producto al Carrito!",
      });
  }
});

cartsRouter.delete("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const result = await CM.deleteProductFromCart(cid, pid);

  if (result) {
    res.send({
      status: "ok",
      message: "El producto se eliminó correctamente!",
    });
  } else {
    res.status(400).send({
      status: "error",
      message: "Error! No se pudo eliminar el Producto del Carrito!",
    });
  }
});

cartsRouter.delete("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const result = await CM.deleteProductsFromCart(cid);

  if (result) {
    res.send({ status: "ok", message: "El carrito se vació correctamente!" });
  } else {
    res.status(400).send({
      status: "error",
      message: "Error! No se pudo vaciar el Carrito!",
    });
  }
});
export default cartsRouter;
