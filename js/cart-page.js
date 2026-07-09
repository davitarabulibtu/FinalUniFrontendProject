function renderCartPage() {
  const cart = getCart();
  const tableWrap = document.getElementById("cartTableWrap");
  const emptyState = document.getElementById("cartEmptyState");
  const summary = document.getElementById("cartSummary");

  if (cart.length === 0) {
    tableWrap.style.display = "none";
    summary.style.display = "none";
    emptyState.style.display = "block";
    return;
  }

  tableWrap.style.display = "block";
  summary.style.display = "block";
  emptyState.style.display = "none";

  const tbody = document.getElementById("cartBody");
  tbody.textContent = "";

  cart.forEach((item) => {
    const row = document.createElement("tr");

    const cellInfo = document.createElement("td");
    const itemInfo = document.createElement("div");
    itemInfo.className = "cart-item-info";

    const itemImg = document.createElement("img");
    itemImg.src = item.image;
    itemImg.alt = item.albumTitle;

    const itemTitle = document.createElement("span");
    itemTitle.textContent = item.albumTitle;

    itemInfo.appendChild(itemImg);
    itemInfo.appendChild(itemTitle);
    cellInfo.appendChild(itemInfo);

    const cellPrice = document.createElement("td");
    cellPrice.textContent = `$${item.price.toFixed(2)}`;

    const cellQty = document.createElement("td");
    const qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.min = "1";
    qtyInput.className = "qty-input";
    qtyInput.value = item.qty;
    qtyInput.dataset.id = item.productId;
    cellQty.appendChild(qtyInput);

    const cellSubtotal = document.createElement("td");
    cellSubtotal.textContent = `$${(item.price * item.qty).toFixed(2)}`;

    const cellRemove = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-item";
    removeBtn.dataset.id = item.productId;
    removeBtn.textContent = "Remove";
    cellRemove.appendChild(removeBtn);

    row.appendChild(cellInfo);
    row.appendChild(cellPrice);
    row.appendChild(cellQty);
    row.appendChild(cellSubtotal);
    row.appendChild(cellRemove);

    tbody.appendChild(row);
  });

  document.getElementById("cartSubtotal").textContent = `$${cartTotal().toFixed(2)}`;
  document.getElementById("cartGrandTotal").textContent = `$${cartTotal().toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", renderCartPage);

document.addEventListener("change", (e) => {
  if (e.target.classList.contains("qty-input")) {
    updateQty(e.target.dataset.id, e.target.value);
    renderCartPage();
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-item")) {
    removeFromCart(e.target.dataset.id);
    renderCartPage();
  }
});