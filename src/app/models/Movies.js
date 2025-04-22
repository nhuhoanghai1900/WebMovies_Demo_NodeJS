import mongoose from "mongoose"
import mongooseDelete from "mongoose-delete"

const Schema = mongoose.Schema

const Movies = new Schema(
  {
    name: { type: String, maxLength: 255, required: true },
    slug: { type: String, maxLength: 255 },
    url: { type: String },
    img: { type: String, required: true },
    status: { type: String, required: true },
    quality: { type: String, required: true },
    language: { type: String, required: true },
    country: { type: String, required: true },
    episodes: [
      {
        epNumber: { type: Number, required: true },
        videoUrl: { type: String, required: true },
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      },
    ],
    schedule: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)
Movies.plugin(mongooseDelete, { overrideMethods: "all", deletedAt: true })

export default mongoose.model("Movies", Movies)
