import { Router } from "express";
import postControllers from "../controllers/postControllers";
import validateSchema from "../middlewares/validateSchema";
import validateToken from "../middlewares/validateToken";
import postEditSchema from "../schemas/postEditSchema";
import postSchema from "../schemas/postSchema";

const router = Router();

router.post(
  "/post/create",
  validateToken,
  validateSchema(postSchema),
  postControllers.create
);
router.get("/post/user/view", validateToken, postControllers.view);
router.put(
  "/post/edit",
  validateToken,
  validateSchema(postEditSchema),
  postControllers.edit
);
router.delete("/post/delete/:id", validateToken, postControllers.deletePost);
router.get("/post/feed", validateToken, postControllers.findFeed);

export default router;
