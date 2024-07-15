import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongoServer = new MongoMemoryServer();

export const connect = async () => {
  await mongoServer.start();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
};

export const close = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};
