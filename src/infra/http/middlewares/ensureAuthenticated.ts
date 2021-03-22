import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import AppError from "@shared/errors/AppError";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError("Token JWT ausente", 401);

  const [, token] = authHeader.split(" ");

  try {
    const secret = process.env.APP_SECRET || "default";

    const decoded = verify(token, secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError("Token JWT inválido", 401);
  }
}
