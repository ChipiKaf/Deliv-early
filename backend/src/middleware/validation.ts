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

// Validate my Restaurant request
export const validateMyRestaurantRequest = [
  body("restaurantName")
    .isString()
    .notEmpty()
    .withMessage("Restaurant name must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("country").isString().notEmpty().withMessage("Country must be a string"),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .notEmpty()
    .withMessage("Delivery price must be a number"),
  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("Estimated delivery time must be a positive integer"),
  body("cuisines")
    .isArray({ min: 1 })
    .withMessage("Cuisines must be an array with at least one element"),
  body("menuItems")
    .isArray({ min: 1 })
    .withMessage("Menu items must be an array with at least one element"),
  body("imageUrl")
    .isString()
    .notEmpty()
    .withMessage("Image URL must be a string"),
    body("menuItems.*.name").notEmpty().withMessage("Menu item name is required"),
    body("menuItems.*.price").isFloat({ min: 0 }).withMessage("Menu item price must be a number"),
  handleValidationErrors,
];