import { Review } from "../../../src/entities/Review";
import { ReviewService } from "../../../src/services/ReviewService";
import { ReviewRepository } from "../../../src/repositories/ReviewRepository";

jest.mock("../../../src/repositories/ReviewRepository");

describe("ReviewService", () => {
  let reviewService: ReviewService;

  beforeEach(() => {
    reviewService = new ReviewService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add a new review", async () => {
    const mockReview: Review = {
      product_id: 123,
      content: "Great product!",
      rating: 5,
    };

    (
      ReviewRepository as jest.MockedClass<typeof ReviewRepository>
    ).prototype.addReview.mockResolvedValue(mockReview);

    const addedReview = await reviewService.addReview(mockReview);
    expect(addedReview).toEqual(mockReview);
  });

  it("should get reviews by product ID", async () => {
    const mockProductId = 123;
    const mockReviews: Review[] = [
      {
        product_id: mockProductId,
        content: "Great product!",
        rating: 5,
      },
      {
        product_id: mockProductId,
        content: "Not so good product.",
        rating: 2,
      },
    ];

    (
      ReviewRepository as jest.MockedClass<typeof ReviewRepository>
    ).prototype.getReviewsByProductId.mockResolvedValue(mockReviews);

    const reviews = await reviewService.getReviewsByProductId(mockProductId);
    expect(reviews).toEqual(mockReviews);
  });
});
