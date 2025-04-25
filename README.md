# 🎮 Movie Web Demo

Trang web demo xem phim đơn giản, dùng Node.js + Express, lưu phim và tập phim vào MongoDB. Giao diện render bằng Handlebars.

---

## 📁 Cấu trúc thư mục

```
src/
├── datatest.json              # Dữ liệu mẫu
├── index.js                   # Điểm vào ứng dụng

├── app/
│   ├── controllers/           # Controllers xử lý route
│   └── models/                # Schema mongoose

├── config/
│   └── db/                    # Kết nối MongoDB

├── public/                    # Tài nguyên tĩnh
│   ├── css/
│   └── img/

├── resources/
│   ├── scss/                  # SCSS tuỳ biến
│   └── views/                 # Giao diện (Handlebars)

├── routes/                    # Định tuyến
└── util/                      # Hàm tiện ích (mongoose helper)
```

---

## 🚀 Chạy dự án

```bash
npm install
npm start
```

---

## 🔧 Công nghệ sử dụng

- Node.js
- Express.js
- Express-Handlebars
- MongoDB + Mongoose
- Webpack (biên dịch SCSS + tạo CSS, nén JS + CSS, contenthash cache)
- Nodemon (dev tool)

---

## 🧠 Chức năng chính

- Thêm/sửa/xoá/xóa mềm/khôi phục --> phim
- Thêm/sửa/xoá --> tập phim
- Xem chi tiết phim
- Xem và phát video (dùng iframe YouTube)
- Giao diện phân quyền (me/stored, trash…)

---

"watch": "sass --watch src/resources/scss/app.scss src/public/css/app.css",
