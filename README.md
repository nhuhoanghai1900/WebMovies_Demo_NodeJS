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

### 👤 Người dùng

- Đăng ký / Đăng nhập bảo mật (sử dụng `bcrypt` và `jsonwebtoken`)
- Xác thực phiên hoạt động bằng (sử dụng 'token JWT')
- Xem và chỉnh sửa **hồ sơ cá nhân** (profile)
- Upload ảnh đại diện bằng **FilePond + Multer**

### 🎬 Phim

- Xem **danh sách phim** theo nhiều tiêu chí
- Xem chi tiết phim: tiêu đề, mô tả, thể loại, iframe YouTube, danh sách tập
- Lọc phim theo: thể loại, trạng thái (đang chiếu / hoàn thành), lịch chiếu
- Tìm kiếm phim theo tên, hỗ trợ tìm nhanh

### 🛠️ Quản trị & quản lý nội dung

- Chức năng **thêm, sửa, xóa, xoá mềm** phim (sử dụng `mongoose-delete`)
- Kiểm soát nội dung phim: link nhúng, slug tự động (sử dụng `slugify`)
- Middleware chống spam (sử dụng `express-rate-limit`)
- Valid dữ liệu gửi lên (sử dụng `express-validator`)

### 💡 Trải nghiệm & hiệu năng

- Nén nội dung truyền tải bằng `compression`
- Caching thông minh (`http-cache-semantics`, `got`, `Cache-Control`)
- Tối ưu hóa mã nguồn JS/CSS bằng **Webpack**

### ⚙️ Build tool & Dev tool

- **Webpack** – Biên dịch SCSS, tối ưu JS/CSS, hỗ trợ cache, minify, tách file
- **Terser & CSS Minimizer** – Nén mã JS/CSS
- **Concurrently** – Chạy song song nhiều script trong quá trình phát triển
- **Dotenv** – Quản lý biến môi trường bảo mật

## 🌐 Truy cập bản demo

Dự án đã được deploy tại: **https://node-tienvuc3d.onrender.com**
github: **https://github.com/nhuhoanghai1900/WebMovies_Demo_NodeJS**

🚀 Chạy dự án
npm install
npm run start:dev
npm run build:prod
