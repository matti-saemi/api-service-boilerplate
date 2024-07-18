import { JwtPayload } from "jsonwebtoken";

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export class TokenError extends Error {
  status: number;

  constructor(message: string, status: number) {
      super(message);
      this.status = status;
  }
}

export interface CustomJwtPayload extends JwtPayload {
  userId: number;
}