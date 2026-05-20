async function dangKy() {

    let username = document.getElementById("txtTenTK").value.trim();
    let password = document.getElementById("txtMK").value.trim();
    let xnmk = document.getElementById("txtXNMK").value.trim();
    let email = document.getElementById("txtEmail").value.trim();
    let sdt = document.getElementById("txtSdt").value.trim();

    let overlay = document.querySelector(".overlay");

    // kiểm tra rỗng
    if (username.length == 0 || password.length == 0 || email.length == 0) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
    }

    // tên tài khoản không được có ký tự đặc biệt
    let usernameRegex = /^[a-zA-Z0-9_]+$/;

    if (!usernameRegex.test(username)) {
        alert("Tên tài khoản không được chứa ký tự đặc biệt");
        return;
    }

    // email hợp lệ
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert("Email không hợp lệ");
        return;
    }

    // xác nhận mật khẩu
    if (password !== xnmk) {
        alert("Mật khẩu xác nhận không khớp");
        return;
    }

    // số điện thoại chỉ được chứa số
    let sdtRegex = /^[0-9]+$/;

    if (sdt.length > 0 && !sdtRegex.test(sdt)) {
        alert("Số điện thoại không hợp lệ");
        return;
    }

    try {

        let captcha = grecaptcha.getResponse();

        if (captcha.length == 0) {
            alert("Vui lòng xác minh CAPTCHA");
            return;
        }

        overlay.style.display = "flex";

        let response = await fetch("https://truongstar.onrender.com/api/l/DangKy", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                TenTK: username,
                MatKhau: password,
                Email: email,
                Sdt: sdt,
                Captcha: captcha
            })
        });

        overlay.style.display = "none";

        let text = await response.text();

        console.log(text);

        let data = JSON.parse(text);

        alert(data.message);

    }
    catch (err) {

        overlay.style.display = "none";

        alert("Lỗi: " + err);
    }
}