const mongoose = require("mongoose");
require("dotenv").config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
}
  const connectDB  = async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/blogging",options); 
      // await mongoose.connect(process.env.MONGO_URI,options)
      console.log("database connected successfullly");
    } catch (error) {
      console.log(error); 
      process.exit(1);
    }
  }

  module.exports = connectDB;