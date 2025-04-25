import express from "express"; // 1. Import thư viện express
import moviesController from "../app/controllers/moviesController.js"; // 2. Import controller xử lý logic
import checkToken from "../app/middleware/checkToken.js"; // 3. Import middleware kiểm tra token
import checkRole from "../app/middleware/checkRole.js"; // 4. Import middleware kiểm tra quyền
import handleUpload from "../app/middleware/uploadMiddleware.js"; // 5. Import middleware xử lý upload file

const route = express.Router(); // 6. Tạo một instance của Router

// 7. Định nghĩa các route liên quan đến tạo mới movie
route.get("/create", checkToken, checkRole(["admin"]), moviesController.create); // 7.1. Hiển thị form tạo mới movie
route.post("/store", checkToken, checkRole(["admin"]), handleUpload("img"), moviesController.store); // 7.2. Lưu dữ liệu tạo mới vào db

// 8. Xử lý liên quan đến form
route.post("/handle-form-actions", checkToken, checkRole(["admin"]), moviesController.handleFormActions); // 8.1. Xử lý các hành động từ form

// 9. Định nghĩa các route liên quan đến episode
route.get("/create/:id/episode", checkToken, checkRole(["admin"]), moviesController.createEpisode); // 9.1. Hiển thị form tạo mới episode
route.post("/:id/storeEpisode", checkToken, checkRole(["admin"]), moviesController.storeEpisode); // 9.2. Lưu dữ liệu episode vào db
route.get("/:slug/watch/:epNumber", checkToken, moviesController.watchEpisode); // 9.3. Xem một episode cụ thể
route.delete("/:movieId/episodes/:episodeId", checkToken, checkRole(["admin"]), moviesController.destroyEpisode); // 9.4. Xóa một episode cụ thể

// 10. Định nghĩa các route liên quan đến chi tiết movie
route.get("/:slug/details", moviesController.movieDetails); // 10.1. Hiển thị chi tiết movie
route.get("/:id/edit/details", moviesController.editMovieDetails); // 10.2. Hiển thị form chỉnh sửa chi tiết movie

// 11. Định nghĩa các route liên quan đến chỉnh sửa và xóa movie
route.get("/:id/edit", checkToken, moviesController.edit); // 11.1. Hiển thị form chỉnh sửa movie
route.put("/:id", checkToken, handleUpload("img"), checkRole(["admin"]), moviesController.update); // 11.2. Cập nhật dữ liệu movie
route.delete("/:id", checkToken, checkRole(["admin"]), moviesController.destroy); // 11.3. Xóa mềm movie
route.delete("/:id/force", checkToken, checkRole(["admin"]), moviesController.forceDestroy); // 11.4. Xóa vĩnh viễn movie
route.patch("/:id/restore", checkToken, checkRole(["admin"]), moviesController.restore); // 11.5. Khôi phục movie đã xóa mềm

export default route; // 12. Export router để sử dụng trong ứng dụng
