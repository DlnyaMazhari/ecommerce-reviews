import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { ReviewService } from "../../../src/services/ReviewService";
import { Review, ReviewModel } from "../../../src/entities/Review";

describe("ReviewService", () => {
  let mongoServer: MongoMemoryServer;
  let mongoUri: string;
  let reviewService: ReviewService;

  beforeEach(async () => {
    mongoServer = await MongoMemoryServer.create();
    mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
    reviewService = new ReviewService();
  });

  afterEach(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe("getReviewsByProductId", () => {
    it("should return reviews for a valid productId", async () => {
      const mockProductId = 1;
      const mockReviews = [
        { product_id: mockProductId, content: "Great product!", rating: 5 },
        { product_id: mockProductId, content: "Do not recommend!", rating: 2 },
      ];

      await ReviewModel.create(mockReviews);

      const result = await reviewService.getReviewsByProductId(mockProductId);

      expect(result).toHaveLength(mockReviews.length);
      expect(result.map((review) => review.content)).toEqual(
        expect.arrayContaining(mockReviews.map((review) => review.content))
      );
    });

    it("should return an empty array for a productId with no reviews", async () => {
      const mockProductId = 2;

      const result = await reviewService.getReviewsByProductId(mockProductId);

      expect(result).toHaveLength(0);
    });
  });

  describe("addReview", () => {
    it("should add a new review successfully", async () => {
      const mockNewReview = {
        product_id: 1,
        content: "Happy with the product!",
        rating: 5,
      } as Review;

      const result = await reviewService.addReview(mockNewReview);

      expect(result.product_id).toEqual(mockNewReview.product_id);
      expect(result.content).toEqual(mockNewReview.content);
      expect(result.rating).toEqual(mockNewReview.rating);
      expect(result).toHaveProperty("_id");
    });
  });
});
