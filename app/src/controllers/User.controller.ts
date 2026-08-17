import { Request, Response } from "express";
import * as userService from "../services/User.service";

import { asyncHandler } from "../utils/asyncHandler";

export const register = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await userService.registerUser(email, password);
    res.status(201).json({ success: true, data: user });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { user, token } = await userService.loginUser(email, password);
    res.json({ success: true, data: { user, token } });
});
