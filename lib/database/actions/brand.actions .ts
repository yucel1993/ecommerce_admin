"use server";

import { handleError } from "../../utils";
import { connectToDatabase } from "..";
import Brand from "../models/brand.modal";
import { CreateBrandParams } from "@/types";

export const createBrand = async ({ brandName }: CreateBrandParams) => {
  try {
    await connectToDatabase();

    const newBrand = await Brand.create({ name: brandName });

    return JSON.parse(JSON.stringify(newBrand));
  } catch (error) {
    handleError(error);
  }
};

export const getAllBrands = async () => {
  try {
    await connectToDatabase();

    const brands = await Brand.find();

    return JSON.parse(JSON.stringify(brands));
  } catch (error) {
    handleError(error);
  }
};
