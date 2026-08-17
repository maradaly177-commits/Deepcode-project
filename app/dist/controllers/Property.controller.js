"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProperty = exports.createProperty = void 0;
const propertyService = __importStar(require("../services/Property.service"));
const asyncHandler_1 = require("../utils/asyncHandler");
exports.createProperty = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const property = await propertyService.createProperty(req.user.id, req.body);
    res.status(201).json({ success: true, data: property });
});
exports.getProperty = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const propertyId = req.params.id; // ép kiểu rõ ràng
    const property = await propertyService.getProperty(propertyId);
    if (!property) {
        return res.status(404).json({ success: false, message: "Property not found" });
    }
    res.json({ success: true, data: property });
});
//# sourceMappingURL=Property.controller.js.map