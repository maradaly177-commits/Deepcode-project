import { Request, Response } from "express";
import * as propertyService from "../services/Property.service";
import { asyncHandler } from "../utils/asyncHandler";

export const createProperty = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const property = await propertyService.createProperty(req.user.id, req.body);
    res.status(201).json({ success: true, data: property });
});

export const getProperty = asyncHandler(async (req: Request, res: Response) => {
    const propertyId: string = req.params.id as string;   // ép kiểu rõ ràng
    const property = await propertyService.getProperty(propertyId);

    if (!property) {
        return res.status(404).json({ success: false, message: "Property not found" });
    }

    res.json({ success: true, data: property });
});
