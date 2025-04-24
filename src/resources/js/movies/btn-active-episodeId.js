document.addEventListener('DOMContentLoaded', () => {
  const getEpNumber = location.pathname.split("/")
  const currentEpnumber = getEpNumber[getEpNumber.length - 1]

  // duyệt toàn bộ nút tập phim --> tìm nút active
  document.querySelectorAll(".btn-movie-episodeId").forEach((btn) => {
    if (btn.dataset.episodeId == currentEpnumber) {
      btn.classList.add("active")
    }
  })
})
