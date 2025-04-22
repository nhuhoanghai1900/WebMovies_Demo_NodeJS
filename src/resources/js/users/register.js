import { showToast } from "../toastify/toastifyHeader.js"

document.addEventListener('DOMContentLoaded', () => {
  // 1. handle hiển thị lỗi validate phía FE bao gồm {email, password} --> dùng fetch + json
  const registerForm = document.getElementById("register-form")
  if (registerForm)
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault()
      document.getElementById("email-error").textContent = ""
      document.getElementById("password-error").textContent = ""
      document.getElementById("password-error-confirm").textContent = ""

      const formDataRegister = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("confirmPassword").value,
      }

      const res = await fetch("/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataRegister),
      })

      const result = await res.json() // lưu ý await phải có --> nếu ko dữ liệu ko lấy được về
      if (!res.ok) {
        if (result.errors) {
          // dùng 'Object.keys' lấy danh sách key trong mảng ["email", "password"]
          Object.keys(result.errors).forEach((key) => {
            const errMessageKey = document.getElementById(`${key}-error`)
            errMessageKey
              ? (errMessageKey.textContent = result.errors[key])
              : (document.getElementById("password-error-confirm").textContent =
                result.errors[key])
          })
        }
      } else {
        showToast("Đăng ký thành công!")
        setTimeout(() => {
          window.location.href = "/users/login"
        }, 1500)
      }
    })
})


