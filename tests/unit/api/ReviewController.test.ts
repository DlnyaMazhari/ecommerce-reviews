import request from "supertest";
import express, { Application } from "express";
import bodyParser from "body-parser";
import reviewRouter from "../../../src/api/ReviewController";
import { connect, close } from "../../../src/config/database";
import { ReviewModel } from "../../../src/entities/Review";

const app: Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(reviewRouter);

describe("ReviewController", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await close();
  });

  afterEach(async () => {
    await ReviewModel.deleteMany({});
  });

  describe("GET /api/products/:productId/reviews", () => {
    it("should return an empty array if there are no reviews for the product", async () => {
      const response = await request(app).get("/api/products/1/reviews");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it("should return reviews for the specified product", async () => {
      const mockReview = new ReviewModel({
        product_id: 1,
        content: "Great product!",
        rating: 5,
        user_id: 123,
      });
      await mockReview.save();

      const response = await request(app).get("/api/products/1/reviews");
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].content).toBe("Great product!");
    });
  });

  describe("POST /api/products/:productId/reviews", () => {
    it("should create a new review", async () => {
      const mockReviewData = {
        content: "Excellent!",
        rating: 5,
        user_id: 123,
      };

      const response = await request(app)
        .post("/api/products/1/reviews")
        .send(mockReviewData);

      expect(response.status).toBe(200);
      expect(response.body.content).toBe("Excellent!");
      expect(response.body.rating).toBe(5);

      const reviews = await ReviewModel.find({ product_id: 1 });
      expect(reviews).toHaveLength(1);
      expect(reviews[0].content).toBe("Excellent!");
    });

    it("should return an error if the rating is not between 1 and 5", async () => {
      const mockReviewData = {
        content: "Bad product",
        rating: 0,
        user_id: 123,
      };

      const response = await request(app)
        .post("/api/products/1/reviews")
        .send(mockReviewData);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "Rating is required and must be between 1 and 5"
      );
    });
  });
});
