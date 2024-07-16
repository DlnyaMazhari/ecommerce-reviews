import { connect, close } from "../../../src/database/reviewDatabase";
import { Review, ReviewModel } from "../../../src/entities/Review";
import { ReviewRepository } from "../../../src/repositories/ReviewRepository";

describe("ReviewRepository", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await close();
  });

  afterEach(async () => {
    await ReviewModel.deleteMany({});
  });

  describe("getReviewsByProductId", () => {
    it("should return an empty array if no reviews exist for the product", async () => {
      const reviewRepository = new ReviewRepository();
      // Non-existent product ID
      const reviews = await reviewRepository.getReviewsByProductId(999);
      expect(reviews).toEqual([]);
    });

    it("should return reviews for a valid productId", async () => {
      const mockReviews = [
        { product_id: 1, content: "Great product!", rating: 5 },
        { product_id: 1, content: "Could be better.", rating: 3 },
      ];
      await ReviewModel.insertMany(mockReviews);

      const reviewRepository = new ReviewRepository();
      const reviews = await reviewRepository.getReviewsByProductId(1);
      expect(reviews).toHaveLength(2);
    });
  });

  describe("addReview", () => {
    it("should add a new review successfully", async () => {
      const reviewRepository = new ReviewRepository();
      const mockNewReview = {
        product_id: 789,
        content: "Nice product!",
        rating: 4,
      } as Review;

      const addedReview = await reviewRepository.addReview(mockNewReview);
      expect(addedReview).toMatchObject(mockNewReview);
    });

    it("should throw an error if a user tries to review the same product again", async () => {
      const mockReview = {
        product_id: 999,
        content: "Duplicate review",
        rating: 2,
        user_id: 1,
      };
      await ReviewModel.create(mockReview);

      const reviewRepository = new ReviewRepository();
      const mockDuplicateReview = {
        product_id: 999,
        content: "Another duplicate review",
        rating: 4,
        user_id: 1,
      } as Review;

      let error;
      try {
        await reviewRepository.addReview(mockDuplicateReview);
      } catch (err: any) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.message).toBe("User has already reviewed this product.");
    });
  });
});
