import Movies from "../models/Movies.js"
class SiteController {
  async home(req, res, next) {
    try {
      const currentPage = Number(req.query.page) || 1
      const skip = (currentPage - 1) * 15

      const [moviesTop, count] = await Promise.all([
        Movies.find({}).lean().limit(10), // Lấy top 10 phim
        Movies.countDocuments(), //tổng số khoá học
      ])

      //filter movie theo selectedDay
      let movies
      const { selectedDay } = req.query
      if (selectedDay) {
        const dayRegex = new RegExp(`Lịch chiếu vào trưa ${selectedDay}`, "i")
        movies = await Movies.find({ schedule: { $regex: dayRegex } }).lean()
      } else {
        movies = await Movies.find().skip(skip).limit(15).lean()
      }

      const totalPages = Math.ceil(count / 15) // tổng số phân trang
      const totalPagesCount = Array.from(
        { length: totalPages },
        (_, i) => i + 1
      )

      res.render("home.hbs", {
        moviesTop,
        movies,
        currentPage,
        totalPages,
        totalPagesCount,
        user: req.user || null,
      })
    } catch (error) {
      next(error)
    }
  }

  async filterCategory(req, res) {
    try {
      const category = await Movies.distinct("language")
      let { language } = req.query
      if (!language) {
        language = "Tu Tiên"
      }

      let { showAll } = req.query
      showAll = showAll === "true"
      const limit = showAll ? 0 : 5

      const selectedLanguage = language || language[0]
      const movies = await Movies.find({ language }).lean().limit(limit)
      res.render("filter/category.hbs", {
        movies,
        category,
        selectedLanguage,
        showAll,
      })
    } catch (error) {
      console.log(error)
    }
  }

  async filterStatus(req, res) {
    try {
      const statusMovie = await Movies.distinct("status")
      let { status } = req.query
      if (!status) {
        status = "Đang chiếu"
      }

      let { showAll } = req.query
      showAll = showAll === "true"
      const limit = showAll ? 0 : 5

      const selectedStatus = status
      const movies = await Movies.find({ status }).lean().limit(limit)
      res.render("filter/status.hbs", {
        movies,
        statusMovie,
        selectedStatus,
        showAll,
      })
    } catch (error) {
      console.log(error)
    }
  }

  async filterSchedule(req, res) {
    try {
      let movies
      const { selectedDay } = req.query
      if (selectedDay) {
        const dayRegex = new RegExp(`Lịch chiếu vào trưa ${selectedDay}`, "i")
        movies = await Movies.find({ schedule: { $regex: dayRegex } }).lean()
      } else {
        movies = await Movies.find({}).limit(15).lean()
      }
      res.render("filter/schedule.hbs", { movies })
    } catch (error) {
      res.status(500).json({ message: "Lỗi BE khi lọc lịch chiếu" })
    }
  }
}
export default new SiteController()
