import express from "express"
const route = express.Router()
import searchController from "../app/controllers/searchController.js"
import rateLimit from "../app/middleware/rateLimitMiddleware.js";

route.get("/searchMovies", searchController.searchMovies.bind(searchController))

export default route
