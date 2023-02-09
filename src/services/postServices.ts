import { Likes, Posts } from "@prisma/client";
import { IPost } from "../interfaces/post.interface";
import { IUserAuthenticated } from "../interfaces/user-authenticated.interface";
import likeRepository from "../repositories/likeRepository";
import postRepository from "../repositories/postRepository";

async function create(user: IUserAuthenticated, data: IPost) {
  await postRepository.create({
    user_id: user.id,
    username: user.username,
    content: data.content,
    created_at: new Date(),
    updated_at: new Date(),
  });
  return { content: data.content };
}

async function view(user: IUserAuthenticated) {
  const posts = await postRepository.findAll(user.id);
  const postFormat: { post: Posts; likes: Likes[] }[] = [];
  for (let i = 0; i < posts.length; i++) {
    let likes = await likeRepository.findByPostId(posts[i].id);
    postFormat.push({ post: posts[i], likes: likes });
  }
  return postFormat;
}

async function edit(user: IUserAuthenticated, postId: number, data: IPost) {
  const post = await postRepository.findById(postId);
  if (!post) throw { type: "notfound", message: "Post not found" };
  if (post.user_id !== user.id)
    throw { type: "unauthorized", message: "Unauthorized" };
  await postRepository.edit(postId, {
    content: data.content,
    updated_at: new Date(),
  });
  return;
}

async function deletePost(user: IUserAuthenticated, id: number) {
  const post = await postRepository.findById(id);
  if (!post) throw { type: "notfound", message: "Post not found" };
  if (post.user_id !== user.id)
    throw { type: "unauthorized", message: "Unauthorized" };
  await postRepository.deletePost(id);
  return;
}

async function findFeed() {
  const posts = await postRepository.findFeed();
  const order = posts.sort((a, b) => {
    if (a.created_at < b.created_at) return -1;
    if (a.created_at > b.created_at) return 1;
    return 0;
  });
  const postFormat: { post: Posts; likes: Likes[] }[] = [];
  for (let i = 0; i < order.length; i++) {
    let likes = await likeRepository.findByPostId(order[i].id);
    postFormat.push({ post: order[i], likes: likes });
  }
  return postFormat;
}

const postServices = {
  create,
  view,
  edit,
  deletePost,
  findFeed,
};

export default postServices;
