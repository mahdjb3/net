function addSubscriber() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const pack = document.getElementById("package").value.trim();
  const amount = document.getElementById("amount").value.trim();

  if (!name || !phone || !pack || !amount) {
    alert("❌ يرجى تعبئة جميع الحقول");
    return;
  }

  db.ref("subscribers").push({
    name,
    phone,
    package: pack,
    amount,
    createdAt: Date.now()
  });

  alert("✅ تم إضافة المشترك");

  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("package").value = "";
  document.getElementById("amount").value = "";
}
