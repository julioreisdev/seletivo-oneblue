import joi from "joi";

const postSchema = joi.object({
  content: joi.string().required(),
});

export default postSchema;
