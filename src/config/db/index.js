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
    await mongoose.connect(mongoUri, {
      maxPoolSize: 100, // Tối đa 50 connection mở cùng lúc
      minPoolSize: 50, // Duy trì ít nhất 5 connection mở sẵn (optional)
      serverSelectionTimeoutMS: 5000, // Nếu không tìm thấy server trong 5s thì báo lỗi
      socketTimeoutMS: 45000, // Nếu socket mất kết nối sau 45s thì timeout
    })
    console.log("Connect success MongoDB!!!")
  } catch (error) {
    console.log("Connect failure MongoDB!!!")
    console.error(error)
  }
}
export default connect
