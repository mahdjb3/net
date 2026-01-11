function login() {
    const u = username.value.trim();
    const p = password.value.trim();

    if (!u || !p) {
        error.innerText = "أدخل اسم المستخدم وكلمة المرور";
        return;
    }

    if (u === "admin" && p === "admin") {
        localStorage.setItem("loggedIn", "1");
        window.location.href = "index.html";
    } else {
        error.innerText = "بيانات الدخول غير صحيحة";
    }
}
