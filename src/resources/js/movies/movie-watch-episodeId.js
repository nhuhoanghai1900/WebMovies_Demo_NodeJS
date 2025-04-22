import { showToastDanger } from "../toastify/toastifyHeader.js"

const linkMovies = document.querySelectorAll(".checkTokenMovies")
linkMovies.forEach((button) =>
  button.addEventListener("click", async (e) => {
    e.preventDefault()
    const url = button.getAttribute("href")
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
