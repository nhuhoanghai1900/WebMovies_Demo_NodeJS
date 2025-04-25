import express from "express"
import usersController from "../app/controllers/usersController.js"
import registerValidate from '../app/middleware/registerValidate.js'
import loginValidate from '../app/middleware/loginValidate.js'
import checkToken from '../app/middleware/checkToken.js'
import handleUpload from '../app/middleware/uploadMiddleware.js'
import rateLimit from "../app/middleware/rateLimitMiddleware.js";

const route = express.Router()

route.get("/register", usersController.showRegisterForm)
route.post("/register", registerValidate, usersController.handleRegisterForm)

route.get("/login", usersController.showLoginForm)
route.post("/login", rateLimit, loginValidate, usersController.handleLoginForm)

route.post('/logout', usersController.logout)

route.post('/upload-avatar', checkToken, handleUpload("uploads"), rateLimit, usersController.uploadAvatar)

route.get("/me/profile", checkToken, usersController.meProfile)
route.get("/me/favorite", checkToken, usersController.mefavorite)

export default route
