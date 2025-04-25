import express from "express"
import usersController from "../app/controllers/usersController.js"
import registerValidate from '../app/middleware/registerValidate.js'
import loginValidate from '../app/middleware/loginValidate.js'
import checkToken from '../app/middleware/checkToken.js'
import handleUpload from '../app/middleware/uploadMiddleware.js'
import rateLimit from "../app/middleware/rateLimitMiddleware.js";

const route = express.Router()

route.get("/register", rateLimit, usersController.showRegisterForm)
route.post("/register", registerValidate, rateLimit, usersController.handleRegisterForm)

route.get("/login", rateLimit, usersController.showLoginForm)
route.post("/login", loginValidate, rateLimit, usersController.handleLoginForm)

route.post('/logout', usersController.logout)

route.post('/upload-avatar', checkToken, handleUpload("uploads"), rateLimit, usersController.uploadAvatar)

route.get("/me/profile", checkToken, rateLimit, usersController.meProfile)
route.get("/me/favorite", checkToken, rateLimit, usersController.mefavorite)

export default route
