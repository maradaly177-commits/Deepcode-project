"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProperty = void 0;
const joi_1 = __importDefault(require("joi"));
const schema = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string().optional(),
    price: joi_1.default.number().required(),
    area: joi_1.default.number().required(),
    address: joi_1.default.string().required(),
});
const validateProperty = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }
    next();
};
exports.validateProperty = validateProperty;
//# sourceMappingURL=property.validator.js.map