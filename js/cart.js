const CART_KEY = "riffrecords_cart";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find((item) => item.productId === product.productId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
  flashAdded(product.productId);
}

function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.productId !== productId);
  saveCart(cart);
}

function updateQty(productId, qty) {
  const cart = getCart();
  const item = cart.find((i) => i.productId === productId);
  if (!item) return;
  item.qty = Math.max(1, parseInt(qty, 10) || 1);
  saveCart(cart);
}

function cartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

function cartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function updateCartBadge() {
  const badge = document.getElementById("cartBadge");
  if (badge) badge.textContent = cartCount();
}


function flashAdded(productId) {
  const btn = document.querySelector(`[data-id="${productId}"].add-to-cart, [data-id="${productId}"].quick-add`);
  if (!btn) return;
  const original = btn.textContent;
  btn.textContent = "Added ✓";
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = original;
    btn.disabled = false;
  }, 900);
}


document.addEventListener("click", (e) => {
  const btn = e.target.closest(".add-to-cart, .quick-add");
  if (!btn || btn.disabled) return;

  addToCart({
    productId: btn.dataset.id,
    albumTitle: btn.dataset.title,
    price: parseFloat(btn.dataset.price),
    image: btn.dataset.image
  });
});

document.addEventListener("DOMContentLoaded", updateCartBadge);
