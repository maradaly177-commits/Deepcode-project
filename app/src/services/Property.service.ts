import { PropertyModel } from "../models/Property.model";

export const createProperty = async (userId: string, data: any) => {
    const property = await PropertyModel.create({ ...data, owner: userId });
    return property;
};

export const getProperty = async (id: string) => {
    return PropertyModel.findById(id);
};
