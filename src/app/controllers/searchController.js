import Movies from "../models/Movies.js"

class SearchController {
  // Escape các ký tự đặc biệt trong từ khóa tìm kiếm để tránh lỗi regex
  escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  }

  async searchMovies(req, res) {
    const keyword = req.query.q
    if (!keyword) return res.status(400).json({ message: "Thiếu từ tìm kiếm" })
    const escapedKeyword = this.escapeRegex(keyword)
    try {
      const movies = await Movies.find({
        $or: [
          { name: { $regex: escapedKeyword, $options: "i" } },
          { status: { $regex: escapedKeyword, $options: "i" } },
          { language: { $regex: escapedKeyword, $options: "i" } },
          { country: { $regex: escapedKeyword, $options: "i" } },
        ],
      })
        .sort({ name: 1 })
        .limit(5)
        .lean()

      res.status(200).json(movies)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "BE: Lỗi server" })
    }
  }
}

export default new SearchController()
