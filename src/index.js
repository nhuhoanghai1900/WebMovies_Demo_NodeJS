import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import { engine } from "express-handlebars"
import methodOverride from "method-override"
import dotenv from "dotenv" // biến môi trường
import routes from "./routes/index.routes.js"
import db from "./config/db/index.js"
import compression from "compression" // dùng GZIP để nén tất cả file HTML/CSS/JS trước khi gửi về client.
import cookieParser from "cookie-parser"
import checkTokenIfExists from "./app/middleware/checkTokenIfExists.js"
import assetMiddleware from './app/middleware/assetMiddleware.js' // gắn css + js vào hbs (do có contenthash)
import rateLimitMiddleware from './app/middleware/rateLimitMiddleware.js' // gắn css + js vào hbs (do có contenthash)

// 2. Thiết lập __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 3. Khởi tạo ứng dụng express
const app = express()
const port = 3000

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
app.use(methodOverride("_method")) // Ghi đè phương thức HTTP với ?_method=DELETE
app.use(cookieParser()) // Xử lý cookie
app.use(checkTokenIfExists)

dotenv.config() // Cấu hình biến môi trường

db()  // Kết nối cơ sở dữ liệu

// 7. Cài đặt cấu hình template engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs", //  Định dạng file template
    helpers: {
      sum: (a, b) => a + b, // Hàm helper cộng hai số
      eq: (a, b) => a === b, // Hàm helper so sánh
    },
  })
)
app.set("view engine", "hbs") // Thiết lập view engine là handlebars
app.set("views", path.join(__dirname, "resources", "views")) // Đường dẫn tới thư mục views

// 8. Cài đặt Routes
routes(app)

// 9. Khởi động server
app.listen(port, () => {
  console.log(`Ứng dụng đang được chạy: http://localhost:${port}`) // Lắng nghe kết nối tại cổng
})
