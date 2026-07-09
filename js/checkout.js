function renderOrderSummary() {
  const cart = getCart();
  const list = document.getElementById("orderSummaryList");
  const totalEl = document.getElementById("orderSummaryTotal");
  const form = document.getElementById("checkoutForm");

  list.textContent = "";

  if (cart.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.className = "stock-out";
    emptyMsg.textContent = "Your cart is empty.";
    list.appendChild(emptyMsg);
    if (totalEl) totalEl.textContent = "$0.00";
    if (form) form.querySelector("button[type=submit]").disabled = true;
    return;
  }

  cart.forEach((item) => {
    const line = document.createElement("div");
    line.className = "mini-line";

    const left = document.createElement("span");
    left.textContent = `${item.albumTitle} × ${item.qty}`;

    const right = document.createElement("span");
    right.textContent = `$${(item.price * item.qty).toFixed(2)}`;

    line.appendChild(left);
    line.appendChild(right);
    list.appendChild(line);
  });

  totalEl.textContent = `$${cartTotal().toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", renderOrderSummary);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkoutForm");
  if (!form) return;

  const validators = {
    fullName: (value) => {
      const trimmed = value.trim();
      if (trimmed === "") return "Full name is required.";
      if (trimmed.length < 3) return "Name must be at least 3 characters.";
      if (!/^[A-Za-z\u00C0-\u024F\u10A0-\u10FF' -]+$/.test(trimmed)) {
        return "Name can only contain letters, spaces, apostrophes, and hyphens.";
      }
      if (trimmed.split(/\s+/).length < 2) return "Please enter your first and last name.";
      return "";
    },
    email: (value) => {
      const trimmed = value.trim();
      if (trimmed === "") return "Email is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) return "Enter a valid email address.";
      return "";
    },
    address: (value) => {
      const trimmed = value.trim();
      if (trimmed === "") return "Shipping address is required.";
      if (trimmed.length < 10) return "Address seems too short — include street and city.";
      return "";
    },
    phone: (value) => {
      const trimmed = value.trim();
      if (trimmed === "") return "Phone number is required.";
      const digitsOnly = trimmed.replace(/\D/g, "");
      if (digitsOnly.length < 9 || digitsOnly.length > 15) return "Enter a valid phone number (9–15 digits).";
      if (!/^[+\d\s()-]+$/.test(trimmed)) return "Phone number contains invalid characters.";
      return "";
    }
  };

  function showError(input, message) {
    input.classList.add("input-error");
    input.setAttribute("aria-invalid", "true");
    let errorEl = input.parentElement.querySelector(".field-error");
    if (!errorEl) {
      errorEl = document.createElement("span");
      errorEl.className = "field-error";
      input.insertAdjacentElement("afterend", errorEl);
    }
    errorEl.textContent = message;
  }

  function clearError(input) {
    input.classList.remove("input-error");
    input.removeAttribute("aria-invalid");
    const errorEl = input.parentElement.querySelector(".field-error");
    if (errorEl) errorEl.remove();
  }

  function validateField(input) {
    const rule = validators[input.id];
    if (!rule) return true;
    const message = rule(input.value);
    if (message) {
      showError(input, message);
      return false;
    }
    clearError(input);
    return true;
  }

  Object.keys(validators).forEach((id) => {
    const input = document.getElementById(id);
    if (!input) return;
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      if (input.classList.contains("input-error")) validateField(input);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (getCart().length === 0) return;

    let isFormValid = true;
    Object.keys(validators).forEach((id) => {
      const input = document.getElementById(id);
      if (input && !validateField(input)) isFormValid = false;
    });

    if (!isFormValid) {
      form.querySelector(".input-error")?.focus();
      return;
    }

    completeOrder();
  });

  function completeOrder() {
    saveCart([]);
    const layout = document.getElementById("checkoutLayout");
    layout.textContent = "";

    const success = document.createElement("p");
    success.className = "success-message";
    success.textContent = "✅ Order placed! Thank you for shopping at RiffRecords. A confirmation will land in your inbox shortly.";

    layout.appendChild(success);
  }
});