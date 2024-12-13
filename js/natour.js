const addItemForm = document.getElementById("addItemForm");
const itemsTableBody = document.getElementById("itemsTableBody");
const totalPriceSpan = document.getElementById("totalPrice");

// مصفوفة لتخزين المواد (تحمل البيانات من Local Storage إذا كانت موجودة)
let items = JSON.parse(localStorage.getItem("items")) || [];

// عرض البيانات عند فتح الصفحة
updateTable();

// إضافة مادة جديدة
addItemForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // قراءة القيم من الفورم
  const itemName = document.getElementById("itemName").value;
  const itemQuantity = parseInt(document.getElementById("itemQuantity").value);
  const itemPrice = parseFloat(document.getElementById("itemPrice").value);

  // إضافة المادة للمصفوفة
  const newItem = { name: itemName, quantity: itemQuantity, price: itemPrice };
  items.push(newItem);

  // تحديث الجدول وحفظ البيانات
  updateTable();

  // مسح الفورم
  addItemForm.reset();
});

// تحديث الجدول
function updateTable() {
  // مسح محتويات الجدول
  itemsTableBody.innerHTML = "";

  // إعادة ملء الجدول
  items.forEach((item, index) => {
    const row = document.createElement("tr");

    const itemTotalPrice = (item.quantity * item.price).toFixed(2);

    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${item.price.toFixed(2)}</td>
      <td>${itemTotalPrice}</td>
      <td><button onclick="removeItem(${index})">إزالة</button></td>
    `;

    itemsTableBody.appendChild(row);
  });

  // تحديث المجموع الكلي
  updateTotalPrice();

  // حفظ البيانات في Local Storage
  localStorage.setItem("items", JSON.stringify(items));
}

// إزالة مادة
function removeItem(index) {
  items.splice(index, 1);
  updateTable();
}

// حساب المجموع الكلي
function updateTotalPrice() {
  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  totalPriceSpan.textContent = total.toFixed(2);
}
