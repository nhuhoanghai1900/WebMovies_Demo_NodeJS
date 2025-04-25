import jwt from "jsonwebtoken"

function checkToken(req, res, next) {
  const token = req.cookies.token // Lấy token từ cookie
  try {
    if (!token) {
      return res
        .status(401)
        .json({ message: "Bạn cần đăng nhập (!token)" })
    }

    // Kiểm tra token hợp lệ
    jwt.verify(token, process.env.JWT_SECRET, (err, userPayload) => {
      if (err) {
        return res.status(403).json({ message: "Token không hợp lệ" })
      }
      req.user = userPayload
      next()
    })
  } catch (error) {
    return res.status(500).json({ message: "BE: Lỗi kiểm tra token" })
  }
}
export default checkToken
