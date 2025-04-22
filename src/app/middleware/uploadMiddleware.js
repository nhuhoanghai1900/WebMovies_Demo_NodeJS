import multer from "multer"
import path from "path"
import { fileURLToPath } from "url"
const __dirname = path.dirname(fileURLToPath(import.meta.url)) // 2.1

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/uploads")) // Lưu vào thư mục này
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname) // Lấy đuôi file (.jpg, .png, ...)
    cb(null, file.fieldname + "-" + Date.now() + ext)
  },
})

// Hàm lọc file (fileFilter) để kiểm tra loại file được upload
function fileFilter(req, file, cb) {
  const allowedTypes = /jpeg|jpg|png|webp|avif/
  const mimeType = allowedTypes.test(file.mimetype)
  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  )
  if (mimeType && extName) {
    cb(null, true) // Nếu hợp lệ, chấp nhận file này
  } else {
    cb(new Error("Chỉ cho phép file ảnh JPG, JPEG, PNG, WEBP, AVIF"))
  }
}

// Giới hạn dung lượng (ví dụ 3MB)
const limits = {
  fileSize: 5 * 1024 * 1024,
}

// Kết hợp lại thành middleware
const upload = multer({
  storage,
  fileFilter,
  limits,
})

const handleUpload = (req, res, next) => {
  upload.single("img")(req, res, function (err) {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "File quá lớn! Tối đa 5MB." })
      }
      return res
        .status(500)
        .json({ message: "Lỗi upload file.", error: err.message })
    }
    next()
  })
}

export default handleUpload
