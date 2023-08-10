const products = document.querySelectorAll(".product");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");
const clearCartButton = document.getElementById("clear-cart");

// Lấy danh sách sản phẩm trong giỏ hàng từ LocalStorage
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Hiển thị danh sách sản phẩm trong giỏ hàng
function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.quantity} x $${item.price}`;
    cartItems.appendChild(li);

    total += item.price * item.quantity;
  }

  totalPrice.textContent = `$${total}`;
}

// Lưu giỏ hàng vào LocalStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Thêm sản phẩm vào giỏ hàng
function addToCart(name, price) {
  let existingItem = null;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      existingItem = cart[i];
      break;
    }
  }

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  saveCart();
  renderCart();
}

// Xóa giỏ hàng
clearCartButton.addEventListener("click", function () {
  cart.length = 0;
  saveCart();
  renderCart();
});

// Xử lý sự kiện khi nhấn nút "Thêm vào giỏ hàng"
for (let i = 0; i < products.length; i++) {
  const product = products[i];
  const name = product.querySelector("h3").textContent;
  const price = parseInt(product.querySelector("span").textContent);
  const addButton = product.querySelector(".add-to-cart");

  addButton.addEventListener("click", function () {
    addToCart(name, price);
  });
}

// Hiển thị giỏ hàng khi trang web được tải
renderCart();
