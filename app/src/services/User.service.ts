import { UserModel } from "../models/User.model";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
import { ApiError } from "../utils/ApiError";

export const registerUser = async (email: string, password: string) => {
    // kiểm tra email đã tồn tại chưa
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, "Email already registered");
    }

    // mã hoá mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // tạo user mới
    const user = await UserModel.create({ email, password: hashedPassword });

    return user;
};

export const loginUser = async (email: string, password: string) => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials");
    }

    // tạo JWT token
    const token = generateToken({ id: user._id, role: user.role });

    return { user, token };
};

export const getUserById = async (id: string) => {
    const user = await UserModel.findById(id).select("-password");
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return user;
};
