import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    price: Joi.number().required(),
    area: Joi.number().required(),
    address: Joi.string().required(),
});

export const validateProperty = (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }
    next();
};
