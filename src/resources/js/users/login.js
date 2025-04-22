import { showToast, showToastDanger } from "../toastify/toastifyHeader.js"

document.addEventListener('DOMContentLoaded', () => {
  // 1. xử lý validate pass + email --> json + fetch
  const loginForm = document.getElementById("login-form")
  if (loginForm)
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault()
      document.getElementById("email-error").textContent = ""
      document.getElementById("password-error").textContent = ""
      document.getElementById("check-error").textContent = ""

      const formDataLogin = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      }

      const res = await fetch("/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataLogin),
      })

      const result = await res.json()
      if (!res.ok) {
        if (result.errors) {
          Object.keys(result.errors).forEach((key) => {
            const errEL = document.getElementById(`${key}-error`)
            if (errEL) errEL.textContent = result.errors[key]
          })
        } else {
          document.getElementById("check-error").textContent = result.message
        }
      } else {
        showToast("Đăng nhập thành công!")
        setTimeout(() => {
          window.location.href = "/"
        }, 2000)
      }
    })
})
