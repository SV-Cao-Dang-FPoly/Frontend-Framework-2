import dotenv from 'dotenv';
import Room from '../models/room';
import { roomSchema } from '../schemas/room';
import Category from '../models/category';
dotenv.config();

export const getAll = async (req, res) => {
  const { _limit = 10, _sort = 'createAt', _order = 'asc' } = req.query;

  const options = {
    customLabels: {
      docs: 'data',
      limit: _limit,
      sort: {
        [_sort]: _order === 'desc' ? -1 : 1,
      },
    },
    populate: {
      path: 'categoryId',
    },
  };
  try {
    const rooms = await Room.paginate({}, options);
    if (rooms.length === 0) {
      return res.status(404).json({
        message: 'Không có sản phẩm nào',
      });
    }
    return res.json({
      message: 'Lấy danh sách sản phẩm thành công',
      rooms,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const get = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('categoryId');

    if (!room) {
      return res.json({
        message: 'Không tìm thấy sản phẩm',
      });
    }
    return res.json({
      message: 'Lấy sản phẩm thành công',
      room,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const create = async (req, res) => {
  try {
    const { error } = roomSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const room = await Room.create(req.body);
    await Category.findByIdAndUpdate(room.categoryId, {
      $addToSet: { rooms: room._id },
    });
    if (!room) {
      return res.json({
        message: 'Thêm sản phẩm không thành công',
      });
    }
    return res.json({
      message: 'Thêm sản phẩm thành công',
      room,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const update = async (req, res) => {
  console.log(req.body);
  try {
    const room = await Room.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (!room) {
      return res.json({
        message: 'Cập nhật sản phẩm không thành công',
      });
    }
    return res.json({
      message: 'Cập nhật sản phẩm thành công',
      room,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const remove = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    return res.json({
      message: 'Xóa sản phẩm thành công',
      room,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

// computed protype name

// const myName = "bc";

// const myInfo = {
//     [myName]: "Dat",
// };
// console.log(myInfo.bc);
