import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.BASE)
    .then((connect) => console.log("connected to mongodb.."))
    .catch((e) => console.log("could not connect to mongodb", e));

  mongoose.Promise = global.Promise;
};

export default connectDB;
