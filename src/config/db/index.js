import mongoose from "mongoose"

// async function connect() {}
// try {
//   await mongoose.connect("mongodb://127.0.0.1:27017/education_dev")
//   console.log("Connect success MongoDb!!!")
// } catch (error) {
//   console.log("Connect failure MongoDb!!!")
// }
// export default connect

// import mongoose from "mongoose"

async function connect() {
  try {
    const mongoUri = process.env.MONGODB_URI

    if (!mongoUri) {
      console.error("MongoDB URI is not defined!")
      return
    }
    await mongoose.connect(mongoUri)
    console.log("Connect success MongoDB!!!")
  } catch (error) {
    console.log("Connect failure MongoDB!!!")
    console.error(error)
  }
}
export default connect
