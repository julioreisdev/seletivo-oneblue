import { Request, Response } from "express";
import likeServices from "../services/likeServices";

async function reasonLike(req: Request, res: Response) {
  const postId = Number(req.params.postId);
  const user = res.locals.user;
  try {
    await likeServices.reasonLike(user, postId);
    return res.sendStatus(202);
  } catch (error: any) {
    if (error.type === "notfound") return res.status(404).send(error.message);
    return res.status(500).send(error);
  }
}

const likeControllers = {
  reasonLike,
};

export default likeControllers;
