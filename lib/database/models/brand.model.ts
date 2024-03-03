import { Document, Schema, model, models } from "mongoose";

export interface IBrand extends Document {
  _id: string;
  name: string;
}

const BrandSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const Brand = models.Brand || model("Brand", BrandSchema);

export default Brand;
