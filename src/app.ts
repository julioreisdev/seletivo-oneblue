import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import postRoutes from "./routes/postRoutes";
import likeRoutes from "./routes/likeRoutes";

const app = express();
app.use(cors(), express.json());
app.use(authRoutes, postRoutes, likeRoutes);

export default app;
