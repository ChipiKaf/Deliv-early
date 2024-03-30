import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

/**
 * Middleware function to handle validation errors.
 * If there are validation errors, it sends a 400 response with the errors as JSON.
 * Otherwise, it calls the next middleware function.
 * @param req The Express request object.
 * @param res The Express response object.
 * @param next The next middleware function.
 */
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/**
 * Array of validation middleware functions for the "myuser" request.
 * It validates the request body fields: name, addressLine1, city, and country.
 * If there are validation errors, it sends a 400 response with the errors as JSON.
 * Otherwise, it calls the handleValidationErrors middleware function.
 */
export const validateMyuserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("Address Line 1 must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("country").isString().notEmpty().withMessage("Country must be a string"),
  handleValidationErrors,
];
