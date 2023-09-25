import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../utils/prismaDB";

const SECRET = process.env.JWT_SECRET;

export const roleAuth =
  (requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({ error: "Unauthorized " });
      }

      let decoded: JwtPayload;

      try {
        decoded = jwt.verify(token, SECRET as string) as JwtPayload;
      } catch (error) {
        return res.status(401).json({ error: "Unauthorized 🦀" });
      }

      const userId = decoded.userId;

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return res.status(401).json({ error: "Unauthorized 🔴" });
      }

      const isAuthenticated = requiredRoles.some((role) =>
        user.role.includes(role)
      );

      if (!isAuthenticated) {
        return res.status(403).json({ error: "Forbidden" });
      }

      next();
    } catch (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  };
