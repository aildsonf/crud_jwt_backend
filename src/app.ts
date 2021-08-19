import "reflect-metadata";
import express, { Application } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
// local imports
import "./database/connection";
import router from "./routes";

dotenv.config();
if (!process.env.PORT) {
  process.exit(1);
}
const PORT: number = Number(process.env.PORT) || 5000;

const app: Application = express();
app.use(express.json());
app.use(cors());

app.use(router);
app.listen(PORT, () => {
  console.log(`*** Application listening on port ${PORT} ***`);
});
