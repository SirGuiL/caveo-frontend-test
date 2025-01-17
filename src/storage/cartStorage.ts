import { cartProduct } from "@/domain/types/product";

export class CartStorage {
  prefix = "@caveo-store:";
  cartKey = `${this.prefix}cart`;

  public getCart() {
    return JSON.parse(localStorage.getItem(this.cartKey) || "[]");
  }

  public addItemToCart(product: cartProduct) {
    const cart = this.getCart();

    const productExists = cart.find(
      (item: cartProduct) => item.id === product.id
    );

    if (productExists) {
      productExists.quantity += 1;

      return localStorage.setItem(this.cartKey, JSON.stringify(cart));
    }

    cart.push(product);

    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  public clearCart() {
    localStorage.removeItem(this.cartKey);
  }

  public removeItemFromCart(id: number) {
    const cart = this.getCart();
    const productExists = cart.find((item: cartProduct) => item.id === id);

    if (productExists) {
      if (productExists.quantity > 1) {
        productExists.quantity -= 1;
        return localStorage.setItem(this.cartKey, JSON.stringify(cart));
      }
    }

    const newCart = cart.filter((item: cartProduct) => item.id !== id);

    localStorage.setItem(this.cartKey, JSON.stringify(newCart));
  }
}
