import dotenv from "dotenv";
import joi from 'joi';

import User from "../models/user";
dotenv.config();

export const getAll = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.json({
        message: 'Không có user',
      });
    }
    return res.json({
      message: 'Lấy User thành công ',
      users,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }


};

export const remove = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    return res.json({
      message: "Xóa sản phẩm thành công",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "loi xoa"
    });
  }
};
export const get = async (req, res) => {
  try {
    const userId = await User.findById(req.params.id);
    if (!userId) {
      return res.json({
        message: 'Không tìm thấy danh mục',
      });
    }
    return res.json(userId);
  } catch (error) {
    return res.status(400).json({
      message: "loi tim kiem",
    });
  }
};
export const activeUser = async (req, res) => {
  try {
    const userID = await User.findById(req.params.id)
    userID.active = userID.active === "Inactive" ? "Active" : "Inactive";
    const users = await User.findOneAndUpdate(
      { _id: req.params.id },
      userID,
      {
        new: true,
      }
    );
    return res.json({
      message: " thành công",
    });
  } catch (error) {
    return res.status(400).json({
      message: "error",
    });
  }
};
