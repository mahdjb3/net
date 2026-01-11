const subsTable = document.getElementById("subsTable");

function addSubscriber() {
    const nameVal = document.getElementById("name").value.trim();
    const phoneVal = document.getElementById("phone").value.trim();
    const packageVal = document.getElementById("package").value.trim();
    const priceVal = document.getElementById("price").value.trim();

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

    // مسح الحقول بعد الإضافة
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("package").value = "";
    document.getElementById("price").value = "";
}

// استمع للتغيرات في الوقت الحقيقي
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

function deleteSub(id) {
    if (confirm("هل أنت متأكد من حذف هذا المشترك؟")) {
        db.ref("subscribers/" + id).remove();
    }
}
