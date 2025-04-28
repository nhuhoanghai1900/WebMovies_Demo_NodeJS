import express from "express"
const route = express.Router()
import siteController from "../app/controllers/siteController.js"

route.get("/filter/schedule", siteController.filterSchedule)
route.get("/filter/category", siteController.filterCategory)
route.get("/filter/status", siteController.filterStatus)
route.get("/", siteController.home)

export default route
