class Snackbar {
  #el = null;
  constructor () {
    this.#el = document.querySelector('.flash-msg');
  }
  show(msg) {
    this.#el.textContent = msg;
    this.#el.style.display = "inline-block";
    setTimeout(() => {this.#el.style.display = "none";},3000);
  }
}