import express from "express"
import usersController from "../app/controllers/usersController.js"
import registerValidate from '../app/middleware/registerValidate.js'
import loginValidate from '../app/middleware/loginValidate.js'
import checkToken from '../app/middleware/checkToken.js'
import handleUpload from '../app/middleware/uploadMiddleware.js'
import checkTokenIfExists from '../app/middleware/checkTokenIfExists.js'
const route = express.Router()

route.get("/register", usersController.showRegisterForm)
route.post("/register", registerValidate, usersController.handleRegisterForm)

route.get("/login", usersController.showLoginForm)
route.post("/login", loginValidate, usersController.handleLoginForm)

route.post('/logout', usersController.logout)

route.post('/upload-avatar', checkToken, handleUpload("uploads"), usersController.uploadAvatar)

route.get("/me/profile", checkToken, usersController.meProfile)
route.get("/me/favorite", checkToken, usersController.mefavorite)

route.get("/auth/check", checkTokenIfExists, (req, res) => {
    !req.user ? res.end() : res.status(200).json("message: Check success User (continute)")
})

export default route
