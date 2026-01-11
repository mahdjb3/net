document.addEventListener("DOMContentLoaded", function() {
    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const packageInput = document.getElementById("package");
    const priceInput = document.getElementById("price");
    const addBtn = document.getElementById("addBtn");
    const subsTable = document.getElementById("subsTable");

    // إضافة مشترك
    addBtn.addEventListener("click", function() {
        const nameVal = nameInput.value.trim();
        const phoneVal = phoneInput.value.trim();
        const packageVal = packageInput.value.trim();
        const priceVal = priceInput.value.trim();

        if (!nameVal || !phoneVal || !packageVal || !priceVal) {
            alert("❌ يرجى تعبئة جميع الحقول!");
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
    });

    // عرض المشتركين
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
                <td>
                    <button onclick="deleteSub('${child.key}')">حذف</button>
                </td>
            `;
            subsTable.appendChild(tr);
        });
    });

    // حذف مشترك
    window.deleteSub = function(id) {
        if (confirm("هل أنت متأكد من حذف هذا المشترك؟")) {
            db.ref("subscribers/" + id).remove();
        }
    };
});
