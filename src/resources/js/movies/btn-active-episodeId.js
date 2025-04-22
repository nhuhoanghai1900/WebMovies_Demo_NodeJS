const getEpNumber = location.pathname.split("/")
const currentEpnumber = getEpNumber[getEpNumber.length - 1]

document.querySelectorAll(".btn-movie-episodeId").forEach((btn) => {
  if (btn.dataset.episodeId == currentEpnumber) {
    btn.classList.add("active")
  }
})
