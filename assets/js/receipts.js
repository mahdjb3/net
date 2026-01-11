db.ref("payments").on("value", snap => {
    receipts.innerHTML = "";
    snap.forEach(c => {
        const r = c.val();
        const li = document.createElement("li");
        li.innerText = `مبلغ: ${r.amount} - ${new Date(r.date).toLocaleDateString()}`;
        receipts.appendChild(li);
    });
});
