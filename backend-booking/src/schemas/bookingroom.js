import joi from 'joi';
export const bookingroomSchema = joi.object({
  name: joi.string(),
  roomId: joi.string(),
  roomName: joi.string(),
  user: joi.string(),
  email: joi.string(),
  checkInDate: joi.string(),
  checkOutDate: joi.string(),
  numberOfGuests: joi.number(),
});
