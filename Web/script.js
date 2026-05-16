async function dangKy() {
    let username = document.getElementById("txtTenTK").value;
    let password = document.getElementById("txtMK").value;
    let xnmk = document.getElementById("txtXNMK").value;
    let email = document.getElementById("txtEmail").value;
    let overlay = document.querySelector(".overlay");

    if (username.length == 0 || password.length == 0 || email.length == 0) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
    }



    try {
        let captcha = grecaptcha.getResponse();
        if (captcha.length == 0)
{
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
                username: username,
                password: password,
                email: email,
                captcha: captcha
            })
        });

        overlay.style.display = "none";

        let text = await response.text();
        console.log(text);
        let data = JSON.parse(text);
        alert(data.message);
    } catch (err) {
        overlay.style.display = "none";
        alert("Lỗi: " + err);
    }
}