// 1. Nhập các module cần thiết
import express from "express" // 1.1
import path from "path" // 1.2
import { fileURLToPath } from "url" // 1.3
import { engine } from "express-handlebars" // 1.4
import methodOverride from "method-override" // 1.5
import dotenv from "dotenv" // 1.6
import routes from "./routes/index.routes.js" // 1.8
import db from "./config/db/index.js" // 1.9
import compression from "compression" // dùng GZIP để nén tất cả file HTML/CSS/JS trước khi gửi về client.
import cookieParser from "cookie-parser" // 1.7
import checkTokenIfExists from "./app/middleware/checkTokenIfExists.js"
import assetMiddleware from './app/middleware/assetMiddleware.js' // gắn css + js vào hbs (do có contenthash)
import rateLimitMiddleware from './app/middleware/rateLimitMiddleware.js' // gắn css + js vào hbs (do có contenthash)

// 2. Thiết lập __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url)) // 2.1

// 3. Khởi tạo ứng dụng express
const app = express() // 3.1
const port = 3000 // 3.2

// 4. Cài đặt Middleware
app.use(assetMiddleware)
app.use(rateLimitMiddleware)
app.use(express.urlencoded({ extended: true })) // 4.1 // Xử lý dữ liệu từ form gửi lên
app.use(express.json()) // 4.2 // Xử lý dữ liệu JSON
app.use(compression())
app.use(express.static(path.join(__dirname, "public"), {
  setHeaders: (res, filePath) => {
    res.setHeader('Cache-Control', 'public, max-age=86400, immutable') // 4.3 // Thiết lập thư mục tĩnh
  }
}))
app.use(methodOverride("_method")) // 4.4 // Ghi đè phương thức HTTP với ?_method=DELETE
app.use(cookieParser()) // 4.5 // Xử lý cookie
app.use(checkTokenIfExists)

// 5. Cấu hình biến môi trường
dotenv.config() // 5.1

// 6. Kết nối cơ sở dữ liệu
db() // 6.1 // Kết nối tới database

// 7. Cài đặt cấu hình template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs", // 7.1 // Định dạng file template
    helpers: {
      sum: (a, b) => a + b, // 7.2 // Hàm helper cộng hai số
      eq: (a, b) => a === b, // Hàm helper so sánh
    },
  })
)
app.set("view engine", "hbs") // 7.3 // Thiết lập view engine là handlebars
app.set("views", path.join(__dirname, "resources", "views")) // 7.4 // Đường dẫn tới thư mục views

// 8. Cài đặt Routes
routes(app) // 8.1 // Định nghĩa các route cho ứng dụng

// 9. Khởi động server
app.listen(port, () => {
  console.log(`Ứng dụng đang được chạy: http://localhost:${port}`) // 9.1 // Lắng nghe kết nối tại cổng
})
