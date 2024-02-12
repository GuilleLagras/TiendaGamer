import { CartsManager } from "../dao/factory.js";

class CartsRepository {
  constructor() {
    this.dao = new CartsManager()
  }

  async findById(id) {
    return await this.dao.findById(id);
  }

  async findAll() {
    return this.dao.findAll();
  }

  async findCartById(id) {
    return this.dao.findCartById(id);
  }

  async createCart() {
    return this.dao.createCart();
  }

  async addProductToCart(idCart, idProduct, quantity) {
    return this.dao.addProductToCart(idCart, idProduct, quantity);
  }

  async deleteAllProducts(idCart) {
    return this.dao.deleteAllProducts(idCart);
  }

  async removeProductFromCart(idCart, idProduct) {
    try {
      const cart = await this.findById(idCart);
      if (!cart) {
        return null;
      }

      const productIndex = cart.products.findIndex(
        (p) => p.product && p.product._id.toString() === idProduct
      );
      if (productIndex === -1) {
        return null;
      } else {
        cart.products.splice(productIndex, 1);
        await cart.save();
        return cart;
      }
    } catch (error) {
      console.error('Error removing product from cart:', error);
      throw error;
    }
  }

  async updateCart(idCart, updatedProducts) {
    try {
      const updatedCart = await this.dao.updateCart(idCart, updatedProducts);
      if (!updatedCart) {
        return { message: errorMessage.UPDATED_CART };
      }
      return updatedCart;
    } catch (error) {
      console.error('Error updating cart:', error);
      throw customError.generateError(errorMessage.UPDATED_CART, error.code, errorName.UPDATED_CART);
    }
  }

  async updateProductQuantity(idCart, idProduct, quantity) {
    return this.dao.updateProductQuantity(idCart, idProduct, quantity);
  }
}

export const cartsRepository = new CartsRepository();
