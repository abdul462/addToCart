class CartItem {
  data;
  quantity = 1;
  el;
  constructor(data) {
    this.data = { ...data };
  }
  get displayPrice() {
    return this.quantity * this.data.price.display;
  }
  get price() {
    return this.quantity * this.data.price.actual;
  }
  get discount() {
    return this.quantity * (this.data.price.display - this.data.price.actual);
  }
}

CartItem.prototype.getNode = function (cart) {
  const item = this.data;
  const dummy = document.createElement("div");
  dummy.innerHTML = `
    <div class="cart-item-details flex-justify-content">
      <div class="item-name"><button class="remove">x</button>${item.name}</div>
      <div class="item-qty">
        <button class="minus btn minus-btn">-</button>
        <p class="quantity">1</p>
        <button class="plus btn plus-btn">+</button>
      </div>
      <div class="item-cost">
        ${this.price}
      </div>
    </div>
  `;
  const cartItem = dummy.children[0];
  const quantityEl = cartItem.querySelector(".quantity");
  const costEl = cartItem.querySelector(".item-cost");
  const plusBtn = cartItem.querySelector(".plus-btn");
  const quantityUpdated = () => {
    quantityEl.textContent = this.quantity;
    costEl.textContent = this.price;
    cart.updateTotals();
  };
  plusBtn.addEventListener("click", () => {
    this.quantity++;
    quantityUpdated();
  });
  const minusBtn = cartItem.querySelector(".minus-btn");
  minusBtn.addEventListener("click", () => {
    if (this.quantity === 1) {
      cart.removeItem(item.uid);
    } else {
      this.quantity--;
      quantityUpdated();
    }
  });
  const removeBtn = cartItem.querySelector(".remove");
  removeBtn.addEventListener("click", () => {
    cart.removeItem(item.uid);
  });
  this.el = cartItem;
  return cartItem;
};
