class ApiHandler {
  async fetchData(url, options) {
    try {
      return await fetch(url, options);
    } catch {
      // handle fetch error
      Promise.reject("Unable to fetch cart data");
    }
  }
}

class Items {
  #items;
  constructor(items) {
    this.#items = items || [];
  }

  getNode(cart) {
    const fragment = document.createDocumentFragment();
    this.#items.forEach((item) => {
      fragment.appendChild(new Item(item).getNode(cart));
    });
    return fragment;
  }
}

async function main() {
  const apiHandler = new ApiHandler();
  const productData = await apiHandler
    .fetchData("/json-cart.json")
    .then((res) => res.json());
  const cart = new Cart();
  document
    .querySelector(".product-block")
    ?.appendChild(new Items(productData.items).getNode(cart));
}

window.addEventListener("DOMContentLoaded", main);
