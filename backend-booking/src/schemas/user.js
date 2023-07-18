import joi from "joi";
export const roomSchema = joi.object({
    name: joi.string().required(),
    email: joi.number().required(),
    password: joi.string().required(),
});
