import Movies from "../models/Movies.js"

class SiteController {
  async home(req, res, next) {
    try {
      const moviesFull = await Movies.find({}).lean()

      const page = parseInt(req.query.page) || 1
      const limit = 10
      const skip = (page - 1) * limit
      // Lấy danh sách khoá học có phân trang
      const movies = await Movies.find().skip(skip).limit(limit).lean()
      // Đếm tổng số khoá học để tính số trang
      const count = await Movies.countDocuments()

      // Trả về view cùng với dữ liệu cần thiết
      res.render("home.hbs", {
        moviesFull: moviesFull,
        movies: movies,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        user: req.user || null,
      })
    } catch (error) {
      next(error)
    }
  }
}
export default new SiteController()
