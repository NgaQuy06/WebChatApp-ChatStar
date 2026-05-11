async function dangKy() {

    let username = document.getElementById("txtTenTK").value;
    let password = document.getElementById("txtMK").value;
    let xnmk = document.getElementById("txtXNMK").value;
    let email = document.getElementById("txtEmail").value;

    try {

        let response = await fetch("https://truongstar.onrender.com/api/l/DangKy", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email
            })
        });

        let text = await response.text();

        console.log(text);

        let data = JSON.parse(text);

        alert(data.message);

    } catch (err) {
        alert("Lỗi: " + err);
    }
}