class Item {
  data;
  el;
  addOrRemoveBtn;
  constructor(data) {
    this.data = {
      ...data,
      uid: btoa(data.name),
    };
  }
}

Item.prototype.removedFromCart = function () {
  this.addOrRemoveBtn.classList.remove("added");
  this.addOrRemoveBtn.textContent = "Add to cart";
  this.data.isAddedToCart = false;
};

Item.prototype.getNode = function (cart) {
  const item = this.data;
  const dummy = document.createElement("div");
  dummy.innerHTML = `
      <div class="product-block__item">
        <div class="product-block__item-image">
          <span class="discount">${item.discount}% off</span>
          <img src="${item.image}">
        </div>
        <div class="product-block__item-details">
          <div class="product-block__item-name">${item.name}</div>
          <div class="product-block__item-price-btn">
            <p class="item-price"><span class="actual-price">₹${item.price.display}</span>₹${item.price.actual}</p>
            <button class="add-cart__btn">Add to cart</button>
          </div>
        </div>
      </div>
  `;
  const product = dummy.children[0];
  const addOrRemoveBtn = product.querySelector(".add-cart__btn");
  addOrRemoveBtn.addEventListener("click", (e) => {
    if (item.isAddedToCart) {
      cart.removeItem(item.uid);
    } else {
      cart.addItem(this);
      addOrRemoveBtn.classList.add("added");
      addOrRemoveBtn.textContent = "Remove";
      item.isAddedToCart = true;
    }
  });
  this.el = product;
  this.addOrRemoveBtn = addOrRemoveBtn;
  return product;
};
