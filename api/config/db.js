const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected", connect.connection.host);
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = connectDB;
