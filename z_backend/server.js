import { app } from "./app.js";
import dotenv from "dotenv";
import { connectDatabase } from "./config/db.js";
import cloudinary from "cloudinary";

dotenv.config({ path: "./z_backend/config/config.env" });

const port = process.env.PORT || 5000

connectDatabase();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//start server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));