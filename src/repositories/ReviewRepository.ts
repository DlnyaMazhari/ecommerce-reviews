import { Review, ReviewModel } from "../entities/Review";

export class ReviewRepository {
  async getReviewsByProductId(productId: number): Promise<Review[]> {
    return ReviewModel.find({ product_id: productId });
  }

  async addReview(review: Review): Promise<Review> {
    if (review.user_id) {
      const existingReview = await ReviewModel.findOne({
        product_id: review.product_id,
        user_id: review.user_id,
      });

      if (existingReview) {
        throw new Error("User has already reviewed this product.");
      }
    }
    const newReview = new ReviewModel(review);
    const savedReview = await newReview.save();

    return savedReview;
  }
}
