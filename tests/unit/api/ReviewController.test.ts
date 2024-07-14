import request from "supertest";
import express, { Application } from "express";
import bodyParser from "body-parser";
import reviewController from "../../../src/api/ReviewController";

const app: Application = express();
app.use(bodyParser.json());
app.use(reviewController);

const productIdMock = 123;

describe("ReviewController", () => {
  describe("GET /api/products/:productId/reviews", () => {
    it("should return reviews for a product", async () => {
      const response = await request(app).get(
        `/api/products/${productIdMock}/reviews`
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });
  describe("POST /api/products/:productId/reviews", () => {
    it("should add a new review", async () => {
      const newReview = {
        content: "Amazing product!",
        rating: 5,
      };

      const response = await request(app)
        .post(`/api/products/${productIdMock}/reviews`)
        .send(newReview);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(newReview);
    });
  });
});
