document.addEventListener('DOMContentLoaded', () => {
    // 1.1 --> xử lý thông báo Validate Password confirmPassword
    const passwordInput = document.getElementById("password")

    if (passwordInput)
        passwordInput.addEventListener("input", () => {
            const errorPassword = document.getElementById("password-error")
            const error = []
            errorPassword.classList.replace("text-success", "text-danger")
            if (passwordInput.value.length < 6 || passwordInput.value.length > 12) {
                error.push("- Mật khẩu phải từ 6 đến 12 ký tự!")
            }
            if (!/[A-Z]/.test(passwordInput.value)) {
                error.push("- Mật khẩu có ít nhất 1 chữ in Hoa!")
            }
            if (!/[a-z]/.test(passwordInput.value)) {
                error.push(" - Mật khẩu có ít nhất 1 chữ thường!")
            }
            if (!/\d/.test(passwordInput.value)) {
                error.push("- Mật khẩu có ít nhất 1 số!")
            }
            if (error.length > 0) {
                errorPassword.innerHTML = error.join("<br>")
            } else {
                errorPassword.innerHTML = "MẬT KHẨU ĐƯỢC CHẤP NHẬN"
                errorPassword.classList.replace("text-danger", "text-success")
            }
        })

    // 1.2 --> Xử lý ẩn/hiện password
    const togglePassword = document.getElementById("togglePassword")
    if (togglePassword) {
        togglePassword.addEventListener("click", () => {
            const isPassword = passwordInput.type === "password"
            const eyes = document.getElementById("toggleIcon")
            if (isPassword) {
                passwordInput.type = "text"
                eyes.classList.replace("bi-eye", "bi-eye-slash")
            } else {
                passwordInput.type = "password"
                eyes.classList.replace("bi-eye-slash", "bi-eye")
            }
        })
    }

    // 2.1 --> xử lý thông báo Validate confirm-Password const
    const passwordConfirmInput = document.getElementById("confirmPassword")
    if (passwordConfirmInput)
        passwordConfirmInput.addEventListener("input", () => {
            const errorPasswordConfirm = document.getElementById("password-error-confirm")
            passwordConfirmInput.value !== passwordInput.value
                ? (errorPasswordConfirm.innerHTML = "- Mật khẩu xác nhận không chính xác")
                : (errorPasswordConfirm.innerHTML = "")
        })

    // 2.2 --> xử lý ẩn/hiện confirm - password
    const togglePasswordConfirm = document.getElementById("togglePasswordConfirm")
    if (togglePasswordConfirm)

        togglePasswordConfirm.addEventListener("click", () => {
            const isPassword = passwordConfirmInput.type === "password"
            const eyes = document.getElementById("toggleIconConfirm")
            if (isPassword) {
                passwordConfirmInput.type = "text"
                eyes.classList.replace("bi-eye", "bi-eye-slash")
            } else {
                passwordConfirmInput.type = "password"
                eyes.classList.replace("bi-eye-slash", "bi-eye")
            }
        })
})