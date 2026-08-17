"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.loginUser = exports.registerUser = void 0;
const User_model_1 = require("../models/User.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../utils/jwt");
const ApiError_1 = require("../utils/ApiError");
const registerUser = async (email, password) => {
    // kiểm tra email đã tồn tại chưa
    const existingUser = await User_model_1.UserModel.findOne({ email });
    if (existingUser) {
        throw new ApiError_1.ApiError(400, "Email already registered");
    }
    // mã hoá mật khẩu
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    // tạo user mới
    const user = await User_model_1.UserModel.create({ email, password: hashedPassword });
    return user;
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await User_model_1.UserModel.findOne({ email });
    if (!user) {
        throw new ApiError_1.ApiError(404, "User not found");
    }
    // kiểm tra mật khẩu
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new ApiError_1.ApiError(401, "Invalid credentials");
    }
    // tạo JWT token
    const token = (0, jwt_1.generateToken)({ id: user._id, role: user.role });
    return { user, token };
};
exports.loginUser = loginUser;
const getUserById = async (id) => {
    const user = await User_model_1.UserModel.findById(id).select("-password");
    if (!user) {
        throw new ApiError_1.ApiError(404, "User not found");
    }
    return user;
};
exports.getUserById = getUserById;
//# sourceMappingURL=User.service.js.map