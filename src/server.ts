import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDatabase from "./config/db";
import accountRoutes from "./routes/account.routes";
import encryptionRoutes from "./routes/encryption.routes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

connectDatabase();

app.use("/api/accounts", accountRoutes);
app.use("/api/encryption", encryptionRoutes);

//check app health
app.use("/health", (req, res) => {
  res.status(200).json({ status: "OK 🎉" });
});

//handle error generally
app.use((req, res) => {
  res.status(404).json({ message: "Not Found 😞" });
});

app.listen(PORT, () => {
  console.log(`This server is running on port ${PORT} 💥🚀`);
});
