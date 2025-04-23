document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById("searchInput")
  const suggestionBox = document.getElementById("suggestionBox")

  if (searchInput)
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

  // UX search
  let currentIndex = -1
  document.addEventListener("keydown", (e) => {
    const suggestions = document.querySelectorAll(".suggestion-item")
    if (!suggestions.length) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      currentIndex = (currentIndex + 1) % suggestions.length
      updateActiveSuggestion(suggestions)
    }

    if (e.key === "ArrowUp") {
      e.preventDefault()
      currentIndex = (currentIndex - 1 + suggestions.length) % suggestions.length
      updateActiveSuggestion(suggestions)
    }

    if (e.key === "Enter") {
      e.preventDefault()
      if (currentIndex >= 0 && suggestions[currentIndex]) {
        suggestions[currentIndex].click()
      }
    }
  })

  // UX search active
  function updateActiveSuggestion(suggestions) {
    suggestions.forEach((item, index) => {
      item.classList.toggle("active", index === currentIndex)
    })

    // Scroll đến phần tử được active
    const activeItem = suggestions[currentIndex]
    if (activeItem) {
      activeItem.scrollIntoView({
        behavior: "smooth",
        block: "nearest", // đảm bảo không nhảy bật lên đầu list
      })
    }
  }

  //render suggestionBox movie --> search input
  function renderSearchBox(dataMovies) {
    currentIndex = -1 // reset
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
})
