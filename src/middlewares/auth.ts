import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();
if (!process.env.JWT_SECRET) {
  process.exit(1);
}
const jwt_secret = String(process.env.JWT_SECRET);

export default function authMiddleware(authorization: any) {
  if (!authorization) {
    // return status 401
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, jwt_secret);
  } catch {
    // return status 401
  }
}
