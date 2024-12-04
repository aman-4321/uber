import mongoose from "mongoose";

const DbConnection = process.env.DB_CONNECT || "mongodb://localhost:27017/uber";

export async function ConnectToDb() {
  try {
    await mongoose.connect(DbConnection);
    console.log("Connected to DB");
  } catch (err) {
    console.error("database connection error", err);
  }
}
