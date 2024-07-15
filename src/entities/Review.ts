import mongoose, { Document, Schema } from "mongoose";

export interface Review extends Document {
  product_id: number;
  content: string;
  rating: number;
  user_id?: number;
}

const reviewSchema = new Schema<Review>({
  product_id: { type: Number, required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  user_id: { type: Number, required: false },
});

export const ReviewModel = mongoose.model<Review>("Review", reviewSchema);
