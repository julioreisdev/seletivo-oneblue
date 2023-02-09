import { Users } from "@prisma/client";
import authRepository from "../repositories/authRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUserAuthenticated } from "../interfaces/user-authenticated.interface";
import postRepository from "../repositories/postRepository";
import likeRepository from "../repositories/likeRepository";

async function register(data: Omit<Users, "id">) {
  const user = await authRepository.findByEmail(data.email);
  if (user) throw { type: "conflict", message: "User already exist" };
  await authRepository.create({
    ...data,
    password: bcrypt.hashSync(data.password, 10),
  });
  return;
}

async function login(data: Omit<Users, "id">) {
  const user = await authRepository.findByEmail(data.email);
  if (!user || !bcrypt.compareSync(data.password, user.password))
    throw { type: "unauthorized", message: "Unauthorized" };
  const token = jwt.sign(
    { id: user.id, username: user.email },
    `${process.env.SECRET}`,
    { expiresIn: "24h" }
  );
  return { token };
}

async function deleteUser(data: IUserAuthenticated) {
  const user = await authRepository.findByEmail(data.username);
  if (!user) throw { type: "notfound", message: "User not found" };
  await authRepository.deleteUser(data.id);
  return;
}

async function viewUser(data: IUserAuthenticated) {
  const user = await authRepository.findByEmail(data.username);
  if (!user) throw { type: "notfound", message: "User not found" };
  const posts = await postRepository.findAll(data.id);
  const likes = await likeRepository.findByUserId(data.id);
  return {
    username: user.email,
    id: user.id,
    posts: posts.length,
    likes: likes.length,
  };
}

async function edit(userJwt: IUserAuthenticated, data: Omit<Users, "id">) {
  const user = await authRepository.findByEmail(userJwt.username);
  if (!user) throw { type: "notfound", message: "User not found" };
  const userExist = await authRepository.findByEmail(data.email);
  if (userExist && user.email !== userExist.email)
    throw { type: "conflict", message: "User already exist" };
  await authRepository.edit(userJwt.id, {
    ...data,
    password: bcrypt.hashSync(data.password, 10),
  });
  return;
}

const authServices = {
  register,
  login,
  deleteUser,
  viewUser,
  edit,
};

export default authServices;
