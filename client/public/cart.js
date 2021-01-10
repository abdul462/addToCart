class Cart {
  #items = [];
  #cartItemsEl;
  #cartItemsCountEl;
  #displayTotalEl;
  #discountTotalEl;
  #priceTotalEl;
  constructor() {
    this.#cartItemsEl = document.querySelector(".cart-items");
    this.#cartItemsCountEl = document.querySelector(".cart-items-count");
    this.#displayTotalEl = document.querySelector(
      ".cart-total-items-display-price"
    );
    this.#discountTotalEl = document.querySelector(
      ".cart-total-items-discount-price"
    );
    this.#priceTotalEl = document.querySelector(".cart-total-items-price");
  }
  addItem(item) {
    const cartItem = new CartItem(item.data);
    this.#cartItemsEl.appendChild(cartItem.getNode(this));
    this.#items.push({
      uid: item.data.uid,
      productItem: item,
      cartItem,
    });
    this.itemsUpdated();
    new Snackbar().show(`${item.data.name} is added`); 
  }
  removeItem(uid) {
    const itemIndex = this.#items.findIndex(
      (cartListItem) => cartListItem.uid === uid
    );
    if (itemIndex > -1) {
      const item = this.#items[itemIndex];
      this.#items = [
        ...this.#items.slice(0, itemIndex),
        ...this.#items.slice(itemIndex + 1),
      ];
      item.cartItem.el.remove();
      item.productItem.removedFromCart();
      this.itemsUpdated();
    }
  }
  itemsUpdated() {
    this.#cartItemsCountEl.textContent = this.#items.length;
    this.updateTotals();
  }
  updateTotals() {
    this.#displayTotalEl.textContent = this.#items.reduce(
      (total, item) => total + item.cartItem.displayPrice,
      0
    );
    this.#discountTotalEl.textContent = this.#items.reduce(
      (total, item) => total - item.cartItem.discount,
      0
    );
    this.#priceTotalEl.textContent = this.#items.reduce(
      (total, item) => total + item.cartItem.price,
      0
    );
  }
}
