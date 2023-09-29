import CartManager from "../dao/cartManager.js";

class CartService {
  constructor() {
    this.cartManager = new CartManager();
  }

  async createCart() {
    return await this.cartManager.newCart();
  }

  async getCart(id) {
    return await this.cartManager.getCart(id);
  }

  async addProductToCart(cid, pid) {
    const result = await this.cartManager.addProductToCart(cid, pid);
    if (result) {
      return { status: "ok", message: "El producto se agregó correctamente!" };
    } else {
      throw new Error('Error! No se pudo agregar el Producto al Carrito!');
    }
  }

  async updateQuantityProductFromCart(cartId, productId, quantity) {
    return await this.cartManager.updateQuantityProductFromCart(
      cartId,
      productId,
      quantity
    );
  }

  async deleteProductFromCart(cartId, productId) {
    return await this.cartManager.deleteProductFromCart(cartId, productId);
  }

  async deleteCart(cartId) {
    return await this.cartManager.deleteCart(cartId);
  }

  async updateCart(cartId, products) {
    return await this.cartManager.updateCart(cartId, products);
  }

  async deleteAllProductsFromCart(cartId) {
    return await this.cartManager.deleteAllProductsFromCart(cartId);
  }
}

export default CartService;
