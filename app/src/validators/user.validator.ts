import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    password_confirmation: Joi.string().valid(Joi.ref("password")).required()
        .messages({ "any.only": "Password confirmation does not match" }),
});

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map((d) => d.message).join(", "),
        });
    }
    next();
};
