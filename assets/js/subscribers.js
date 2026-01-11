const list = document.getElementById("list");

db.ref("subscribers").on("value", snap => {
    list.innerHTML = "";
    snap.forEach(c => {
        const s = c.val();
        const li = document.createElement("li");
        li.innerText = `${s.name} - ${s.phone} - ${s.price}`;
        list.appendChild(li);
    });
});

function addSubscriber() {
    if (!name.value || !phone.value || !price.value || !address.value) {
        alert("أدخل جميع البيانات");
        return;
    }

    db.ref("subscribers").push({
        name: name.value,
        phone: phone.value,
        price: price.value,
        address: address.value,
        paid: false
    });

    name.value = phone.value = price.value = address.value = "";
}
