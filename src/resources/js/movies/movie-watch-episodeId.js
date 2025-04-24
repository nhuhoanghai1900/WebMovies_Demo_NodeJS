import { showToastDanger } from "../toastify/toastifyHeader.js"

document.addEventListener('DOMContentLoaded', () => {
  //nút tập phim
  const linkMovies = document.querySelectorAll(".checkTokenMovies")

  // kiểm tra token rồi mới được xem phim
  linkMovies.forEach((link) =>
    link.addEventListener("click", async (e) => {
      e.preventDefault()
      const url = link.getAttribute("href")
      try {
        const res = await fetch(url)
        const err = await res.json()
        if (!res.ok) {
          showToastDanger(err.message)
        }
      } catch (error) {
        window.location.href = url
      }
    })
  )

})


