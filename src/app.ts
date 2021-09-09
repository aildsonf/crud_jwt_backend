import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import * as dotenv from "dotenv";
// local imports
import router from "./routes";

dotenv.config();
if (!process.env.PORT) {
  process.exit(1);
}
const PORT: number = Number(process.env.PORT) || 5000;

createConnection()
  .then((connection) => {
    const app: Application = express();

    app.use(cors());
    app.use(helmet());
    app.use(express.json());

    app.use(router);
    app.listen(PORT, () => {
      console.log(`*** Application listening on port ${PORT} ***`);
    });
  })
  .catch((e) => console.error(e));
