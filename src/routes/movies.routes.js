import express from "express" // 1. Import thư viện express
const route = express.Router() // 2. Tạo một instance của Router
import moviesController from "../app/controllers/moviesController.js" // 3. Import controller xử lý logic
import checkToken from '../app/middleware/checkToken.js'
import checkRole from "../app/middleware/checkRole.js"

// 4. Định nghĩa các route liên quan đến tạo mới
route.get("/create", checkToken, checkRole(['admin']), moviesController.create) // 4.1. Hiển thị form tạo mới
route.post("/store", checkToken, checkRole(['admin']), moviesController.store) // 4.2. Lưu dữ liệu tạo mới vào database

// 5. Định nghĩa các route liên quan đến xử lý form
route.post("/handle-form-actions", checkToken, checkRole(['admin']), moviesController.handleFormActions) // 5.1. Xử lý các hành động từ form

// 6. Định nghĩa các route liên quan đến episode
route.get("/create/:id/episode", checkToken, checkRole(['admin']), moviesController.createEpisode) // 6.1. Hiển thị form tạo mới episode
route.post("/:id/storeEpisode", checkToken, checkRole(['admin']), moviesController.storeEpisode) // 6.2. Lưu dữ liệu episode vào database
route.get("/:slug/watch/:epNumber", checkToken, moviesController.watchEpisode) // 6.3. Xem một episode cụ thể
route.delete("/:movieId/episodes/:episodeId", checkToken, checkRole(['admin']), moviesController.destroyEpisode) // 6.4. Xóa một episode cụ thể

// 7. Định nghĩa các route liên quan đến chi tiết movie
route.get("/:slug/details", moviesController.movieDetails) // 7.1. Hiển thị chi tiết movie
route.get("/:id/edit/details", moviesController.editMovieDetails) // 7.2. Hiển thị form chỉnh sửa chi tiết movie

// 8. Định nghĩa các route liên quan đến chỉnh sửa và xóa movie
route.get("/:id/edit", checkToken, moviesController.edit) // 8.1. Hiển thị form chỉnh sửa movie
route.put("/:id", checkToken, checkRole(['admin']), moviesController.update) // 8.2. Cập nhật dữ liệu movie
route.delete("/:id", checkToken, checkRole(['admin']), moviesController.destroy) // 8.3. Xóa mềm movie
route.delete("/:id/force", checkToken, checkRole(['admin']), moviesController.forceDestroy) // 8.4. Xóa vĩnh viễn movie
route.patch("/:id/restore", checkToken, checkRole(['admin']), moviesController.restore) // 8.5. Khôi phục movie đã xóa mềm

export default route // 9. Export router để sử dụng trong ứng dụng
