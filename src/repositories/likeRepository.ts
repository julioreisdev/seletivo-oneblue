import connection from "../database/connection";

async function find(postId: number, userId: number) {
  return await connection.likes.findMany({
    where: { user_id: userId, post_id: postId },
  });
}

async function findByPostId(postId: number) {
  return await connection.likes.findMany({ where: { post_id: postId } });
}

async function findByUserId(userId: number) {
  return await connection.likes.findMany({ where: { user_id: userId } });
}

async function create(postId: number, userId: number, username: string) {
  return await connection.likes.create({
    data: { post_id: postId, user_id: userId, username },
  });
}

async function deleteLike(postId: number, userId: number) {
  return await connection.likes.deleteMany({
    where: { user_id: userId, post_id: postId },
  });
}

const likeRepository = {
  create,
  deleteLike,
  find,
  findByPostId,
  findByUserId,
};

export default likeRepository;
