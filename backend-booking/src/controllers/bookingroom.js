import dotenv from 'dotenv';
import bookingroom from '../models/bookingroom';
import { bookingroomSchema } from '../schemas/bookingroom';
import Category from '../models/category';
dotenv.config();

export const create = async (req, res) => {
  try {
    const { error } = bookingroomSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const room = await bookingroom.create(req.body);
    await Category.findByIdAndUpdate(room.categoryId, {
      $addToSet: { rooms: room._id },
    });
    if (!room) {
      return res.json({
        message: 'Đặt Phòng Không Thành Công',
      });
    }
    return res.json({
      message: 'Đặt Phòng thành công',
      room,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const get = async (req, res) => {
  try {
    const room = await bookingroom.find({email : req.params.email});
    if (!room) {
      return res.json({
        message: 'Không tìm thấy danh mục',
      });
    }
    return res.json(room);
  } catch (error) {
    return res.status(400).json({
      message: "loi tim kiem",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const room = await bookingroom.find({});
    if (!room) {
      return res.json({
        message: 'Không có user',
      });
    }
    return res.json({
      message: 'Lấy User thành công ',
      room,
    });
  } catch (error) {
    return res.status(400).json({
      message: "loi",
    });
  }


};
export const remove = async (req, res) => {
  try {
    const room = await bookingroom.findByIdAndDelete(req.params.id);
    return res.json({
      message: 'Xóa sản phẩm  thành công',
      room,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Khong the Xoa",
    });
  }
};