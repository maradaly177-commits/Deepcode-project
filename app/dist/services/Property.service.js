"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProperty = exports.createProperty = void 0;
const Property_model_1 = require("../models/Property.model");
const createProperty = async (userId, data) => {
    const property = await Property_model_1.PropertyModel.create({ ...data, owner: userId });
    return property;
};
exports.createProperty = createProperty;
const getProperty = async (id) => {
    return Property_model_1.PropertyModel.findById(id);
};
exports.getProperty = getProperty;
//# sourceMappingURL=Property.service.js.map