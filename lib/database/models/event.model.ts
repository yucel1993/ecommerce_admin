import { Document, Schema, model, models } from "mongoose";

export interface IEvent extends Document {
  _id: string;
  title: string;
  description?: string;

  createdAt: Date;
  imageUrl: string;

  price: string;
  stock: string;

  brand: { _id: string; name: string };
  category: { _id: string; name: string };
  organizer: { _id: string; firstName: string; lastName: string };
}

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },

  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },

  price: { type: String },
  stock: { type: String },
  brand: { type: Schema.Types.ObjectId, ref: "Brand" },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
});

const Event = models.Event || model("Event", EventSchema);

export default Event;
