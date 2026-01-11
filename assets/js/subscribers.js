document.addEventListener("DOMContentLoaded", function() {

  const subsTable = document.getElementById("subsTable");
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const packageInput = document.getElementById("package");
  const priceInput = document.getElementById("price");

  function addSubscriber() {
      const nameVal = nameInput.value.trim();
      const phoneVal = phoneInput.value.trim();
      const packageVal = packageInput.value.trim();
      const priceVal = priceInput.value.trim();

      if (!nameVal || !phoneVal || !packageVal || !priceVal) {
          alert("❌ يرجى تعبئة جميع الحقول");
          return;
      }

      db.ref("subscribers").push({
          name: nameVal,
          phone: phoneVal,
          package: packageVal,
          price: priceVal,
          createdAt: Date.now(),
          paid: false
      });

      nameInput.value = "";
      phoneInput.value = "";
      packageInput.value = "";
      priceInput.value = "";
  }

  window.addSubscriber = addSubscriber; // لجعل الزر قادر على استدعاءها

  db.ref("subscribers").on("value", snapshot => {
      subsTable.innerHTML = "";
      snapshot.forEach(child => {
          const s = child.val();
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${s.name}</td>
            <td>${s.phone}</td>
            <td>${s.package}</td>
            <td>${s.price}</td>
            <td><button onclick="deleteSub('${child.key}')">حذف</button></td>
          `;
          subsTable.appendChild(tr);
      });
  });

  window.deleteSub = function(id) {
      if (confirm("هل أنت متأكد من حذف هذا المشترك؟")) {
          db.ref("subscribers/" + id).remove();
      }
  };

});
