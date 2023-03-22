import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import products from "./routes/productRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import connectDB from "./config/db.js";

dotenv.config({ path: "./config/config.env" });
connectDB();

const app = express();

//Body parser middleware
app.use(express.json());

if (process.env.NODE_DEV != "production") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to products api",
  });
});

app.use("/api/v1/products", products);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);

//handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
