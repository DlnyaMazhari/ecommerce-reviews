import { Review } from "../entities/Review";

const reviews: Review[] = [];

export class ReviewRepository {
  async getReviewsByProductId(productId: string | number): Promise<Review[]> {
    return reviews.filter((review) => review.product_id === productId);
  }

  async addReview(review: Review): Promise<Review> {
    const existingReviewIndex = reviews.findIndex(
      (r) => r.product_id === review.product_id && r.content === review.content
    );

    if (existingReviewIndex !== -1) {
      reviews[existingReviewIndex] = review;
    } else {
      reviews.push(review);
    }

    return review;
  }
}
