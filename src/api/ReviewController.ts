import express, { Request, Response } from "express";
import { ReviewModel } from "../entities/Review";
import { ReviewService } from "../services/ReviewService";

const router = express.Router();
const reviewService = new ReviewService();

router.get(
  "/api/products/:productId/reviews",
  async (req: Request, res: Response) => {
    const productId = Number(req.params.productId);
    const reviews = await reviewService.getReviewsByProductId(productId);
    res.json(reviews);
  }
);

router.post(
  "/api/products/:productId/reviews",
  async (req: Request, res: Response) => {
    const productId = Number(req.params.productId);
    const { content, rating, user_id } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ error: "Rating is required and must be between 1 and 5" });
    }

    try {
      const newReview = new ReviewModel({
        product_id: productId,
        content,
        rating,
        user_id,
      });

      const createdReview = await reviewService.addReview(newReview);
      res.json(createdReview);
    } catch (er: any) {
      res.status(400).json({ error: er.message });
    }
  }
);

export default router;
