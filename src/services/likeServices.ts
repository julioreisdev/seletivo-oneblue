import { IUserAuthenticated } from "../interfaces/user-authenticated.interface";
import likeRepository from "../repositories/likeRepository";
import postRepository from "../repositories/postRepository";

async function reasonLike(user: IUserAuthenticated, postId: number) {
  const post = await postRepository.findById(postId);
  if (!post) throw { type: "notfound", message: "Post not found" };
  const like = await likeRepository.find(postId, user.id);
  if (like.length) {
    await likeRepository.deleteLike(postId, user.id);
  } else {
    await likeRepository.create(postId, user.id, user.username);
  }
  return;
}

const likeServices = {
  reasonLike,
};

export default likeServices;
