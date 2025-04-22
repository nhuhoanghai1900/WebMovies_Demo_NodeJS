import Movies from "../models/Movies.js"

class MeController {
  async storedMovies(reg, res, next) {
    try {
      const [movies, deletedCount] = await Promise.all([
        Movies.find({}).lean(),
        Movies.countDocumentsDeleted(),
      ])

      res.render("me/stored-movies.hbs", {
        moviesMe: movies,
        deletedCount,
      })
    } catch (error) {
      next(error)
    }
  }

  async trashMovies(reg, res, next) {
    try {
      const movies = await Movies.findDeleted({}).lean()
      res.render("me/trash-movies.hbs", {
        moviesMe: movies,
      })
    } catch (error) {
      next(error)
    }
  }
}
export default new MeController()
