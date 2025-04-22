const searchInput = document.getElementById("searchInput")
const suggestionBox = document.getElementById("suggestionBox")

searchInput.addEventListener("input", async () => {
  const keyword = searchInput.value.trim().toLowerCase()
  if (!keyword) {
    suggestionBox.textContent = ""
    return
  }
  try {
    const res = await fetch(
      `/search/searchMovies?q=${encodeURIComponent(keyword)}`
    )
    const data = await res.json()
    renderSearchBox(data)
  } catch (error) {
    console.error("Lỗi khi seach", error)
  }
})

function renderSearchBox(dataMovies) {
  suggestionBox.textContent = ""
  const template = document.getElementById("suggestion-template")

  dataMovies.forEach((movie) => {
    const clone = template.content.cloneNode(true)
    const imgMovies = clone.querySelector(".suggestion-img")
    const nameMovies = clone.querySelector(".suggestion-name")
    const scheduleMovies = clone.querySelector(".suggestion-schedule")

    imgMovies.src = movie.img
    nameMovies.textContent = movie.name + " - " + movie.status
    scheduleMovies.textContent = movie.schedule

    clone.querySelector(".suggestion-item").addEventListener("click", () => {
      window.location.href = `/movies/${movie.slug}/details`
    })
    suggestionBox.appendChild(clone)
  })
  suggestionBox.style.display = "block"
}
