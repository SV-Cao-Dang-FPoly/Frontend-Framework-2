import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    img: {
      type: String,
    },
    description: {
      type: String,
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
    },
    bookingRoom: [{ type: mongoose.Types.ObjectId, ref: 'Room' }],
    brand: {
      type: mongoose.Types.ObjectId,
      ref: 'Brand',
    },
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

roomSchema.plugin(mongoosePaginate);
export default mongoose.model('Room', roomSchema);
