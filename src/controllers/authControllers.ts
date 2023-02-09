import { Request, Response } from "express";
import authServices from "../services/authServices";

async function register(req: Request, res: Response) {
  const data = res.locals.body;
  try {
    await authServices.register(data);
    return res.sendStatus(201);
  } catch (error: any) {
    if (error.type === "conflict") return res.status(409).send(error.message);
    return res.status(500).send(error);
  }
}

async function login(req: Request, res: Response) {
  const data = res.locals.body;
  try {
    const result = await authServices.login(data);
    return res.status(200).send(result);
  } catch (error: any) {
    if (error.type === "unauthorized")
      return res.status(401).send(error.message);
    return res.status(500).send(error);
  }
}

async function deleteUser(req: Request, res: Response) {
  const user = res.locals.user;
  try {
    await authServices.deleteUser(user);
    return res.sendStatus(202);
  } catch (error: any) {
    if (error.type === "notfound") return res.status(404).send(error.message);
    return res.status(500).send(error);
  }
}

async function viewUser(req: Request, res: Response) {
  const user = res.locals.user;
  try {
    const result = await authServices.viewUser(user);
    return res.status(200).send(result);
  } catch (error: any) {
    if (error.type === "notfound") return res.status(404).send(error.message);
    return res.status(500).send(error);
  }
}

async function edit(req: Request, res: Response) {
  const user = res.locals.user;
  const data = res.locals.body;
  try {
    await authServices.edit(user, data);
    return res.sendStatus(202);
  } catch (error: any) {
    if (error.type === "notfound") return res.status(404).send(error.message);
    if (error.type === "conflict") return res.status(409).send(error.message);
    return res.status(500).send(error);
  }
}

const authControllers = {
  register,
  login,
  deleteUser,
  viewUser,
  edit,
};

export default authControllers;
