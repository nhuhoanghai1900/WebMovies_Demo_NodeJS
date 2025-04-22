import mongoose from "mongoose"
const Schema = mongoose.Schema

const Users = new Schema(
  {
    fullName: { type: String, maxLength: 255, required: true },
    email: { type: String, maxLength: 255, required: true, unique: true },
    password: { type: String, maxLength: 255, required: true },
    img: { type: String, maxLength: 255, default: ''},
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model("Users", Users)
