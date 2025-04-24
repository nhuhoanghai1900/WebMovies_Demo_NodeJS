import { log } from "console"
import Movies from "../models/Movies.js"
import slugify from "slugify"

class MoviesController {
  // Xem một tập phim cụ thể của phim
  watchEpisode(req, res, next) {
    const { slug, epNumber } = req.params

    Movies.findOne({ slug })
      .then((movies) => {
        const episode = movies.episodes.find((ep) => ep.epNumber == epNumber)
        res.render("movies/movie-watch.hbs", {
          movies: movies.toObject(),
          episode: episode.toObject(),
        })
      })
      .catch(next)
  }

  // Xem chi tiết phim
  movieDetails(req, res, next) {
    Movies.findOne({ slug: req.params.slug })
      .then((movies) => {
        res.render("movies/movie-details.hbs", {
          movies: movies.toObject(),
        })
      })
      .catch(next)
  }

  // Hiển thị trang tạo phim
  create(req, res, next) {
    res.render("movies/create.hbs")
  }

  // Hiển thị trang tạo tập phim cho phim
  async createEpisode(req, res, next) {
    try {
      const movies = await Movies.findById({ _id: req.params.id })
      res.render("movies/create-movie-detail.hbs", {
        movies: movies.toObject(),
      })
    } catch (error) {
      next(error)
    }
  }

  // Lưu phim mới vào cơ sở dữ liệu
  store(req, res, next) {
    req.body.slug = slugify(req.body.name, {
      lower: true,
      strict: true,
      replacement: "",
      locale: "vi",
    })
    const movies = new Movies(req.body)
    movies.save()
    res.redirect("/me/stored/movies")
  }

  // Lưu tập phim mới vào phim
  async storeEpisode(req, res, next) {
    try {
      const { epNumber, videoUrl } = req.body
      const { id } = req.params
      await Movies.updateOne(
        { _id: id },
        {
          $push: { episodes: { epNumber, videoUrl } },
        }
      )
      res.redirect(`/movies/create/${req.params.id}/episode`)
    } catch (error) {
      next(error)
    }
  }

  // Hiển thị trang chỉnh sửa phim
  async edit(req, res, next) {
    try {
      const { id } = req.params
      const movies = await Movies.findById(id)
      res.render('movies/edit.hbs', { movies: movies.toObject() })
    } catch (error) {
      next(error)
    }
  }

  // Hiển thị trang chỉnh sửa chi tiết phim
  async editMovieDetails(req, res, next) {
    try {
      const movies = await Movies.findById(req.params.id)
      res.render("movies/edit-movie-details.hbs", {
        movies: movies.toObject(),
      })
    } catch (error) {
      next(error)
    }
  }

  // Cập nhật thông tin phim
  async update(req, res, next) {
    try {
      // kiểm tra dữ liệu đầu vào req.body
      const allowedFields = ["name", "status", "quality", "language", 'country', 'schedule'];
      const updateData = {};
      for (const checkFields of allowedFields) {
        if (req.body[checkFields]) {
          updateData[checkFields] = req.body[checkFields]
        }
      }
      console.log(updateData);
      if (req.file) updateData.img = `/img/${req.file.filename}`
      await Movies.updateOne({ _id: req.params.id }, updateData)
      res.redirect("/me/stored/movies")
    } catch (error) {
      next(error)
    }
  }

  // Xóa mềm phim
  async destroy(req, res, next) {
    try {
      await Movies.delete({ _id: req.params.id })
      res.redirect("/me/stored/movies")
    } catch (error) {
      next(error)
    }
  }

  // Xóa một tập phim khỏi phim
  async destroyEpisode(req, res, next) {
    try {
      const { movieId, episodeId } = req.params
      await Movies.updateOne(
        {
          _id: movieId,
        },
        { $pull: { episodes: { _id: episodeId } } }
      )
      res.redirect(`/movies/${movieId}/edit/details`)
    } catch (error) {
      next(error)
    }
  }

  // Khôi phục phim đã bị xóa mềm
  async restore(req, res, next) {
    try {
      await Movies.restore({ _id: req.params.id })
      const movies = await Movies.findById(req.params.id)
      if (movies && "deleted" in movies) {
        movies.deleted = false
        await movies.save()
      }
      res.redirect("/me/trash/movies")
    } catch (error) {
      next(error)
    }
  }

  // Xóa vĩnh viễn phim
  async forceDestroy(req, res, next) {
    try {
      await Movies.deleteOne({ _id: req.params.id })
      res.redirect("/me/trash/movies")
    } catch (error) {
      next(error)
    }
  }

  // Xử lý các hành động từ form (ví dụ: xóa nhiều phim)
  async handleFormActions(req, res, next) {
    try {
      switch (req.body.action) {
        case "delete":
          await Movies.delete({ _id: { $in: req.body.Ids } })
          res.redirect("/me/stored/movies")
          break
        default:
          break
      }
    } catch (error) {
      next(error)
    }
  }

}
export default new MoviesController()

// ------------- code update many data in MongoDB shell
// db["Movies"].updateOne(
//   { _id: ObjectId('67f4c98f7c870d621590d007') },
//   {
//     $push: {
//       episodes: {
//         $each: [
// ----------- lấy data json bỏ vào đây -----
//         ]
//       }
//     }
//   }
// )
