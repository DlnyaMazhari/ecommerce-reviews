import { Review } from "../entities/Review";
import { ReviewRepository } from "../repositories/ReviewRepository";

export class ReviewService {
  private readonly reviewRepository: ReviewRepository;

  constructor() {
    this.reviewRepository = new ReviewRepository();
  }

  async getReviewsByProductId(productId: string | number): Promise<Review[]> {
    return await this.reviewRepository.getReviewsByProductId(productId);
  }

  async addReview(review: Review): Promise<Review> {
    return await this.reviewRepository.addReview(review);
  }
}
