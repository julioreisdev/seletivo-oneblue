import joi from "joi";

const postEditSchema = joi.object({
  postId: joi.number().required(),
  content: joi.string().required(),
});

export default postEditSchema;
