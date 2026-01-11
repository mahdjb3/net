db.ref("subscribers").once("value", snap => {
    snap.forEach(c => {
        const o = document.createElement("option");
        o.value = c.key;
        o.text = c.val().name;
        subs.appendChild(o);
    });
});

function pay() {
    if (!subs.value || !amount.value) {
        alert("أدخل البيانات");
        return;
    }

    db.ref("payments").push({
        subId: subs.value,
        amount: amount.value,
        date: Date.now()
    });

    db.ref("subscribers/" + subs.value).update({
        paid: true
    });

    amount.value = "";
}
