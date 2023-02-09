import { Router } from "express";
import likeControllers from "../controllers/likeControllers";
import validateToken from "../middlewares/validateToken";

const router = Router();

router.post("/reasonlike/:postId", validateToken, likeControllers.reasonLike);

export default router;
