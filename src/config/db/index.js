import mongoose from "mongoose"

async function connect() {}
try {
  await mongoose.connect("mongodb://127.0.0.1:27017/education_dev")
  console.log("Connect success MongoDb!!!")
} catch (error) {
  console.log("Connect failure MongoDb!!!")
}
export default connect
