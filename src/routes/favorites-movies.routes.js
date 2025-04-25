import express from "express";
import favoritesController from "../app/controllers/favoritesController.js"; // 2. Import controller xử lý logic
import checkToken from "../app/middleware/checkToken.js";
const route = express.Router();

route.post("/:movieId/favorites", checkToken, favoritesController.favorites); // 10.1. Hiển thị chi tiết movie

export default route; 
