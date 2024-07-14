import { ReviewRepository } from "../../../src/repositories/ReviewRepository";
import { Review } from "../../../src/entities/Review";

describe("ReviewRepository", () => {
  let reviewRepository: ReviewRepository;
  function clearDatabase() {}

  beforeEach(() => {
    reviewRepository = new ReviewRepository();
  });

  afterEach(() => {
    clearDatabase();
  });

  it("should add a new review", async () => {
    const mockReview: Review = {
      product_id: "123",
      content: "Great product!",
      rating: 5,
    };

    const addedReview = await reviewRepository.addReview(mockReview);
    expect(addedReview).toEqual(mockReview);

    const reviews = await reviewRepository.getReviewsByProductId(
      mockReview.product_id
    );
    expect(reviews).toHaveLength(1);
    expect(reviews[0]).toEqual(mockReview);
  });

  it("should get reviews by product ID", async () => {
    const mockProductId = "123";
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

    for (const review of mockReviews) {
      await reviewRepository.addReview(review);
    }

    const reviews = await reviewRepository.getReviewsByProductId(mockProductId);
    expect(reviews).toHaveLength(2);
    expect(reviews).toEqual(expect.arrayContaining(mockReviews));
  });
});
