import express from "express"
const route = express.Router()
import siteController from "../app/controllers/siteController.js"
import rateLimit from "../app/middleware/rateLimitMiddleware.js";

route.get("/", siteController.home)

export default route
