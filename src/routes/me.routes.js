import express from "express"
const route = express.Router()
import meController from "../app/controllers/meController.js"
import checkToken from '../app/middleware/checkToken.js'
import checkRole from "../app/middleware/checkRole.js"

route.get("/stored/movies", checkToken, checkRole(['admin']), meController.storedMovies)
route.get("/trash/movies", checkToken, checkRole(['admin']), meController.trashMovies)

export default route
