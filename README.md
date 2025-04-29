# 🎮 Movie Web Demo

**Website xem phim miễn phí cho người dùng trên mọi thiết bị.**  
Giao diện đơn giản, dễ dùng, hỗ trợ các tính năng cơ bản đến nâng cao phục vụ trải nghiệm xem phim trực tuyến.

## 🚀 Công nghệ sử dụng

### 🖼️ Frontend

- **HTML, CSS, SCSS** – Giao diện responsive, dễ bảo trì
- **JavaScript (ES6+)** – Tương tác động, fetch API, xử lý logic phía client
- **Handlebars (express-handlebars)** – Template engine để render HTML động
- **FilePond** Upload ảnh giao diện đẹp, hỗ trợ preview

### 🧠 Backend

- **Node.js + Express** – Xây dựng RESTful API
- **Multer** – Middleware xử lý upload ảnh
- **jsonwebtoken** – Tạo và xác thực token đăng nhập
- **Mongoose** – ORM làm việc với MongoDB
- **Mongoose-delete** – Hỗ trợ xoá mềm (soft delete)
- **express-validator** – Kiểm tra và validate dữ liệu đầu vào
- **express-rate-limit** – Giới hạn request, chống spam
- **cookie-parser, compression, method-override** – Các middleware hỗ trợ

### 🛢️ Database

- **MongoDB** – Lưu trữ phim, người dùng, trạng thái...

## ⚙️ Chức năng chính

- Đăng nhập / Đăng ký người dùng
- Tìm kiếm phim theo tên
- Xem danh sách phim
- Xem chi tiết phim và mô tả
- Xem phim bằng iframe (YouTube)
- Upload ảnh đại diện người dùng
- Thêm phim yêu thích
- Hồ sơ cá nhân (profile)
- Quản lý phim (thêm / xoá mềm)
- Lọc phim theo thể loại, trạng thái và lịch chiếu

### ⚙️ Build tool & Dev tool

- **Webpack** – Biên dịch SCSS, tối ưu JS/CSS, hỗ trợ cache, minify, tách file
- **Terser & CSS Minimizer** – Nén mã JS/CSS
- **Concurrently** – Chạy song song nhiều script trong quá trình phát triển
- **Dotenv** – Quản lý biến môi trường bảo mật

## 🌐 Truy cập bản demo

Dự án đã được deploy tại:  
**https://node-tienvuc3d.onrender.com**

# Clone repo

git clone **https://github.com/nhuhoanghai1900/WebMovies_Demo_NodeJS**

🚀 Chạy dự án

npm install
npm run start:dev
