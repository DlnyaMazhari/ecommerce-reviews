import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import reviewRouter from "./api/ReviewController";
import { PORT } from "./config";
import { connect, close } from "./database/reviewDatabase";

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(reviewRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });

process.on("SIGINT", async () => {
  await close();
  process.exit(0);
});
