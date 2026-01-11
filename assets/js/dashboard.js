if (!localStorage.getItem("loggedIn")) {
    location.href = "login.html";
}

db.ref("subscribers").on("value", snap => {
    let total = 0, paidCount = 0, unpaidCount = 0;

    snap.forEach(c => {
        total++;
        c.val().paid ? paidCount++ : unpaidCount++;
    });

    totalSubs.innerText = total;
    paid.innerText = paidCount;
    unpaid.innerText = unpaidCount;
});

function logout() {
    localStorage.clear();
    location.href = "login.html";
}
