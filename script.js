// مصفوفة لتخزين المنتجات المضافة للسلة
let cart = [];

// دالة تفعيل عند الضغط على Buy Now (تضيف للسلة وتفتحها فوراً أو تزيد الرقم)
function openCheckout(productName, productPrice) {
  // إضافة المنتج للمصفوفة لو مش موجود
  cart.push({ name: productName, price: productPrice });

  // تحديث عداد السلة في الهيدر
  updateCartCount();

  // فتح السلة مباشرة لإظهار التفاعل
  openCart();
}

// دالة لتحديث رقم العداد في الهيدر
function updateCartCount() {
  const cartSpan = document.querySelector(".cart span");
  if (cartSpan) {
    cartSpan.innerText = cart.length;
    cartSpan.style.boxShadow = "0 0 15px #00adb5";
  }
}

// دالة فتح نافذة السلة واستعراض محتوياتها
function openCart() {
  const listContainer = document.getElementById("cart_items_list");

  if (cart.length === 0) {
    listContainer.innerHTML =
      '<p style="opacity: 0.5;">Your cart is empty.</p>';
  } else {
    listContainer.innerHTML = ""; // تفريغ القائمة أولاً
    cart.forEach((item, index) => {
      listContainer.innerHTML += `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; background:rgba(255,255,255,0.02); padding:10px; border-radius:10px;">
                    <span>${item.name}</span>
                    <span style="color:#00adb5; font-weight:bold;">${item.price}</span>
                </div>
            `;
    });
  }

  document.getElementById("cart_modal").style.display = "flex";
}

// دالة إغلاق السلة
function closeCart() {
  document.getElementById("cart_modal").style.display = "none";
}

// الانتقال من السلة إلى نافذة الدفع
function proceedToCheckoutFromCart() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // إغلاق السلة
  closeCart();

  // تأخذ آخر منتج مضاف كمثال وتعرضه في نافذة الدفع
  const lastItem = cart[cart.length - 1];
  document.getElementById("modal_product_name").innerText = lastItem.name;
  document.getElementById("modal_product_price").innerText = lastItem.price;
  document.getElementById("checkout_modal").style.display = "flex";
}

// دالة إغلاق نافذة الدفع
function closeCheckout() {
  document.getElementById("checkout_modal").style.display = "none";
}

// دالة إتمام الدفع والنجاح
function handlePayment(event) {
  event.preventDefault();
  closeCheckout();
  document.getElementById("success_screen").style.display = "flex";

  // تفريغ السلة بعد الشراء الناجح
  cart = [];
  updateCartCount();
}

// إغلاق النوافذ عند الضغط خارجها
window.onclick = function (event) {
  const cartModal = document.getElementById("cart_modal");
  const checkoutModal = document.getElementById("checkout_modal");
  const successScreen = document.getElementById("success_screen");

  if (event.target === cartModal) closeCart();
  if (event.target === checkoutModal) closeCheckout();
  if (event.target === successScreen) successScreen.style.display = "none";
};
