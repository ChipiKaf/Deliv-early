import { Request, Response, NextFunction } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from 'jsonwebtoken'
import User from "../models/user";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}
/**
 * Middleware function to check the JWT token for authentication.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {void}
 */
export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256'
});

/**
 * Middleware function to parse and verify the JWT token.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const jwtParse = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.sendStatus(401);
  }

  const token = authorization.split(' ')[1]

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload
    const auth0Id = decoded.sub;

    const user = await User.findOne({ auth0Id })

    if (!user) return res.sendStatus(401)

    req.auth0Id = auth0Id as string
    req.userId = user._id.toString()
    next()
  } catch (error) {
    return res.sendStatus(401)
  }
}
