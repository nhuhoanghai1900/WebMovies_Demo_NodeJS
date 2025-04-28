// document.addEventListener("DOMContentLoaded", () => {
//   const linkFilterSchedule = document.querySelectorAll(".row-filter-select a")
//   if (linkFilterSchedule.length > 0) {
//     linkFilterSchedule.forEach((link) => {
//       link.addEventListener("click", async (e) => {
//         e.preventDefault()
//         console.log("click on", link.href)

//         const url = new URL(link.href)
//         const selectedDay = url.searchParams.get("selectedDay")
//         const status = url.searchParams.get("status")
//         const language = url.searchParams.get("language")
//         const showAll = url.searchParams.get("showAll")

//         let route
//         if (link.href.includes("/filter/schedule/")) {
//           route = `/filter/schedule/?selectedDay=${selectedDay}`
//         } else if (link.href.includes("/filter/status/")) {
//           route = showAll
//             ? (route = `/filter/status/?status=${status}&showAll=${showAll}`)
//             : (route = `/filter/status/?status=${status}`)
//         } else if (link.href.includes("/filter/category/")) {
//           route = showAll
//             ? (route = `/filter/category/?language=${language}&showAll=${showAll}`)
//             : (route = `/filter/category/?language=${language}`)
//         }

//         try {
//           const res = await fetch(route)
//           if (!res.ok) {
//             throw new Error("Lỗi khi đọc lịch chiếu phim")
//           }
//           const data = await res.text() // Nhận dữ liệu trả về từ BE (dạng HTML)

//           // Phân tích dữ liệu HTML trả về
//           const parser = new DOMParser()
//           const doc = parser.parseFromString(data, "text/html")

//           // Lấy phần tử chứa danh sách phim trong HTML trả về
//           const listSelect = doc.querySelector(".row-filter-select")
//           const listMovies = doc.querySelector(".row-filter-list-movies")

//           // Nếu tìm thấy phần tử thì cập nhật DOM
//           if (listMovies) {
//             document.querySelector(".row-filter-select").innerHTML =
//               listSelect.innerHTML
//             document.querySelector(".row-filter-list-movies").innerHTML =
//               listMovies.innerHTML
//           }
//         } catch (error) {
//           console.error("Lỗi fetch dữ liệu:", error)
//         }
//       })
//     })
//   }
// })

document.addEventListener("DOMContentLoaded", () => {
  const linkFilterSchedule = document.querySelector(".row-filter-select")
  if (linkFilterSchedule)
    linkFilterSchedule.addEventListener("click", async (e) => {
      const link = e.target.closest("a")
      if (link) {
        e.preventDefault()
        const url = new URL(link.href)
        const selectedDay = url.searchParams.get("selectedDay")
        const status = url.searchParams.get("status")
        const language = url.searchParams.get("language")
        const showAll = url.searchParams.get("showAll")

        let route
        if (link.href.includes("/filter/schedule/")) {
          route = `/filter/schedule/?selectedDay=${selectedDay}`
        } else if (link.href.includes("/filter/status/")) {
          route = showAll
            ? (route = `/filter/status/?status=${status}&showAll=${showAll}`)
            : (route = `/filter/status/?status=${status}`)
        } else if (link.href.includes("/filter/category/")) {
          route = showAll
            ? (route = `/filter/category/?language=${language}&showAll=${showAll}`)
            : (route = `/filter/category/?language=${language}`)
        } else if (link.href.includes("/")) {
          route = `/?selectedDay=${selectedDay}`
        }

        try {
          const res = await fetch(route)
          if (!res.ok) {
            throw new Error("Lỗi khi đọc lịch chiếu phim")
          }
          const data = await res.text() // Nhận dữ liệu trả về từ BE (dạng HTML)

          // Phân tích dữ liệu HTML trả về
          const parser = new DOMParser()
          const doc = parser.parseFromString(data, "text/html")

          // Lấy phần tử chứa danh sách phim trong HTML trả về
          const listSelect = doc.querySelector(".row-filter-select")
          const listMovies = doc.querySelector(".row-filter-list-movies")

          // Nếu tìm thấy phần tử thì cập nhật DOM
          if (listMovies) {
            document.querySelector(".row-filter-select").innerHTML =
              listSelect.innerHTML
            document.querySelector(".row-filter-list-movies").innerHTML =
              listMovies.innerHTML
          }
          const listMoviesHome = doc.querySelector(".row-list")
          if (listMoviesHome) {
            document.querySelector(".row-list").innerHTML =
              listMoviesHome.innerHTML
          }
        } catch (error) {
          console.error("Lỗi fetch dữ liệu:", error)
        }
      }
    })
})
