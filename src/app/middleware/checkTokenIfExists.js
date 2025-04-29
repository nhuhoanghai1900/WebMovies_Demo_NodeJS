import jwt from "jsonwebtoken"
import Users from "../models/Users.js"

async function checkTokenIfExists(req, res, next) {
  const token = req.cookies?.token
  if (!token) return next() // token ko tồn tại vẫn cho đi
  
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const user = await Users.findById(payload._id).select('fullName img role')
    if (user) {
      const userObj = user.toObject() // chuyển plain object
      req.user = userObj
      res.locals.user = userObj
    }
  } catch (error) {
    console.log(error);
  }
  next()
}
export default checkTokenIfExists
