import "dotenv/config";
import connectDB from "./config/db.js";
import app from "./app/app.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Failed to start server");
    process.exit(1);
  }
};

startServer();
