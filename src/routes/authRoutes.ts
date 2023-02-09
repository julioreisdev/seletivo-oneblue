import { Router } from "express";
import authControllers from "../controllers/authControllers";
import validateSchema from "../middlewares/validateSchema";
import validateToken from "../middlewares/validateToken";
import authSchema from "../schemas/authSchema";

const router = Router();

router.post(
  "/auth/register",
  validateSchema(authSchema),
  authControllers.register
);
router.post("/auth/login", validateSchema(authSchema), authControllers.login);
router.delete("/auth/delete", validateToken, authControllers.deleteUser);
router.get("/auth/view", validateToken, authControllers.viewUser);
router.put(
  "/auth/edit",
  validateToken,
  validateSchema(authSchema),
  authControllers.edit
);

export default router;
