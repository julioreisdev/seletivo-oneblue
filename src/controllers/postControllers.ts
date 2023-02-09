import { Request, Response } from "express";
import postServices from "../services/postServices";
async function create(req: Request, res: Response) {
  const data = res.locals.body;
  const user = res.locals.user;
  try {
    const result = await postServices.create(user, data);
    return res.status(201).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function view(req: Request, res: Response) {
  const user = res.locals.user;
  try {
    const result = await postServices.view(user);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function edit(req: Request, res: Response) {
  const data = res.locals.body;
  const user = res.locals.user;
  try {
    await postServices.edit(user, data.postId, data);
    return res.status(202).send({ content: data.content });
  } catch (error: any) {
    if (error.type === "notfound") return res.status(404).send(error.message);
    if (error.type === "unauthorized")
      return res.status(404).send(error.message);
    return res.status(500).send(error);
  }
}

async function deletePost(req: Request, res: Response) {
  const postId = Number(req.params.id);
  const user = res.locals.user;
  try {
    await postServices.deletePost(user, postId);
    return res.sendStatus(202);
  } catch (error: any) {
    if (error.type === "notfound") return res.status(404).send(error.message);
    if (error.type === "unauthorized")
      return res.status(404).send(error.message);
    return res.status(500).send(error);
  }
}

async function findFeed(req: Request, res: Response) {
  try {
    const result = await postServices.findFeed();
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}

const postControllers = {
  create,
  view,
  edit,
  deletePost,
  findFeed,
};

export default postControllers;
