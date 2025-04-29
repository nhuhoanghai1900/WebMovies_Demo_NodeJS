import Users from "../models/Users.js"
import Movies from "../models/Movies.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { check, validationResult } from "express-validator"

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
const __dirname = path.dirname(fileURLToPath(import.meta.url))

class UsersController {
  showRegisterForm(req, res, next) {
    res.render("users/register.hbs")
  }

  async handleRegisterForm(req, res, next) {
    try {
      const { fullName, email, password } = req.body
      //mã hóa pass
      const hashedPassword = await bcrypt.hash(password, 10)
      const users = new Users({
        fullName,
        email,
        password: hashedPassword,
      })
      await users.save()
      res.status(200).json({ success: true, message: "Đăng ký thành công" })
    } catch (error) {
      if (error.code === 11000 && error.keyPattern?.email) {
        return res
          .status(400)
          .json({ errors: { email: "Email đã được sử dụng" } })
      }
      return res
        .status(500)
        .json({ message: "BE: Lỗi server handleRegisterForm" })
    }
  }

  showLoginForm(req, res, next) {
    res.render("users/login.hbs")
  }

  async handleLoginForm(req, res, next) {
    try {
      const email = String(req.body.email).trim(); // Ép kiểu string + loại bỏ khoảng trắng
      const password = req.body.password;

      const user = await Users.findOne({ email: { $eq: email } })
      const isPassword = await bcrypt.compare(password, user.password)
      if (!user)
        return res
          .status(401)
          .json({ message: "Tài khoản và mật khẩu không tồn tại, thử lại" })
      if (!isPassword)
        return res
          .status(401)
          .json({ message: "Tài khoản và mật khẩu không tồn tại, thử lại" })

      // Tạo JWT token
      const token = jwt.sign(
        {
          _id: user._id,
          role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      )

      // Lưu token vào cookie
      res.cookie("token", token, {
        httpOnly: true, // Không cho JS truy cập cookie (giảm XSS)
        maxAge: 3 * 24 * 60 * 60 * 1000, // Thời gian 3day
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })

      res.status(200).json({ success: true, message: "Đăng nhập thành công" })
    } catch (error) {
      res.status(500).json({ message: "BE: Lỗi server handleLoginForm" })
    }
  }

  logout(req, res, next) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true, // true nếu dùng HTTPS
      sameSite: "strict",
    })
    res.end()
  }

  async uploadAvatar(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Không có file được upload" })
      }
      const user = await Users.findById(req.user?._id)

      if (user.img) {
        const oldImg = path.join(__dirname, "../../public", user.img)
        if (fs.existsSync(oldImg)) {
          fs.unlinkSync(oldImg) //file system
        }
      }
      const imagePath = `/uploads/${req.file.filename}`
      user.img = imagePath
      user.save()

      return res.status(201).json({
        message: "Thay đổi ảnh đại diện thành công",
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: "BE: Lỗi server uploadAvatar" })
    }
  }

  async meProfile(req, res) {
    //get user data
    const user = await Users.findById(req.user._id)
      .select("-_id fullName email img role favorites createdAt")
      .lean()
    const roleLabel = user.role === "admin" ? "Bang chủ Admin" : "Thành viên"
    const createdDate = new Date(user.createdAt).toLocaleDateString("vi-VN")

    //get user data
    const movie = await Movies.find({ _id: { $in: user.favorites } }).select('_id slug name img').lean()

    res.render("users/profile.hbs", {
      user,
      movie,
      roleLabel,
      createdDate,
    })
  }

  async mefavorite(req, res) {
    try {
      const user = await Users.findById(req.user._id).select("-_id favorites ")
      res.json(user)
    } catch (error) {
      console.log(error)
    }
  }
}
export default new UsersController()
