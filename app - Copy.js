const products = [
  {
    id: 1,
    name: "Smart Phone",
    category: "electronics",
    price: 250,
    vendor: "Tech Store",
    image: "https://via.placeholder.com/200"
  },
  {
    id: 2,
    name: "Sneakers",
    category: "fashion",
    price: 80,
    vendor: "Fashion Hub",
    image: "https://via.placeholder.com/200"
  },
  {
    id: 3,
    name: "Laptop",
    category: "electronics",
    price: 700,
    vendor: "Digital World",
    image: "https://via.placeholder.com/200"
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productList = document.getElementById("product-list");
const homeFeaturedList = document.getElementById("home-featured-list");
const cartList = document.getElementById("cart-list");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const deliveryTotal = document.getElementById("delivery-total");

function renderProducts(list, container) {
  if (!container) return;

  container.innerHTML = "";

  list.forEach(product => {
    const card = document.createElement("div");

    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">

      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.vendor}</p>
        <strong>$${product.price}</strong>

        <button onclick="addToCart(${product.id})">
          Add to Cart
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);

  cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCart();

  alert(product.name + " added to cart");
}

function updateCart() {
  if (cartCount) {
    cartCount.textContent = cart.length;
  }

  if (!cartList) return;

  cartList.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price;

    const div = document.createElement("div");

    div.className = "cart-item";

    div.innerHTML = `
      <p>${item.name}</p>
      <strong>$${item.price}</strong>
    `;

    cartList.appendChild(div);
  });

  if (cartTotal) {
    cartTotal.textContent = "$" + total;
  }

  if (deliveryTotal) {
    deliveryTotal.textContent = "$" + total;
  }

  const cartEmpty = document.getElementById("cart-empty");
  const cartLoggedIn = document.getElementById("cart-logged-in");

  if (cart.length === 0) {
    if (cartEmpty) cartEmpty.style.display = "block";
    if (cartLoggedIn) cartLoggedIn.style.display = "none";
  } else {
    if (cartEmpty) cartEmpty.style.display = "none";
    if (cartLoggedIn) cartLoggedIn.style.display = "block";
  }
}

function switchView(view) {
  const panels = document.querySelectorAll(".panel");

  panels.forEach(panel => {
    panel.classList.add("hidden");
  });

  const targetPanel = document.getElementById(view + "-panel");

  if (targetPanel) {
    targetPanel.classList.remove("hidden");
  }
}

const searchInput = document.getElementById("search-input");

if (searchInput) {
  searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();

    const filtered = products.filter(product => {
      return (
        product.name.toLowerCase().includes(value) ||
        product.vendor.toLowerCase().includes(value)
      );
    });

    renderProducts(filtered, productList);
  });
}

const checkoutBtn = document.getElementById("checkout-btn");

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    switchView("delivery");
  });
}

const deliveryBackBtn = document.getElementById("delivery-back-btn");

if (deliveryBackBtn) {
  deliveryBackBtn.addEventListener("click", () => {
    switchView("cart");
  });
}

const deliveryForm = document.getElementById("delivery-form");

if (deliveryForm) {
  deliveryForm.addEventListener("submit", e => {
    e.preventDefault();

    alert("Order placed successfully!");

    cart = [];

    localStorage.removeItem("cart");

    updateCart();

    switchView("home");
  });
}

window.addEventListener("DOMContentLoaded", () => {
  renderProducts(products, productList);

  renderProducts(products.slice(0, 2), homeFeaturedList);

  updateCart();
});