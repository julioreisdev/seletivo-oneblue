import { Posts } from "@prisma/client";
import connection from "../database/connection";
import { IPost } from "../interfaces/post.interface";

async function create(data: Omit<Posts, "id">) {
  return await connection.posts.create({ data });
}

async function findAll(userId?: number) {
  if (userId)
    return await connection.posts.findMany({ where: { user_id: userId } });
  return await connection.posts.findMany();
}

async function findById(id: number) {
  return await connection.posts.findUnique({ where: { id } });
}

async function edit(id: number, data: Partial<Posts>) {
  return await connection.posts.update({ where: { id }, data });
}

async function deletePost(id: number) {
  return await connection.posts.delete({ where: { id } });
}

async function findFeed() {
  return await connection.posts.findMany();
}

const postRepository = {
  create,
  findAll,
  edit,
  findById,
  deletePost,
  findFeed,
};

export default postRepository;
