import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import reviewRouter from "./api/ReviewController"; // Correct import
import { PORT } from "./config";

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(reviewRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
