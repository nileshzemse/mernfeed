import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`Mongodb Database Connected ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error in mongodb connection - ${error}`);
    process.exit(1);
  }
};

export default connectDB;
