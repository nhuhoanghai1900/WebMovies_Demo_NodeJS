import express from "express"
const route = express.Router()
import searchController from "../app/controllers/searchController.js"

route.get("/searchMovies", searchController.searchMovies.bind(searchController))

export default route
