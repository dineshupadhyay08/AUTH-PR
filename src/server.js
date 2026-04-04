import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDB from "./database.js";

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Failed to connect to DB:", error);
  });
