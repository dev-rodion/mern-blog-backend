import { body } from "express-validator";

export const loginValidation = [
  body("email", "Email isn't correct").isEmail(),
  body("password", "Password is too short").isLength({ min: 6 }),
];

export const registerValidation = [
  body("email", "Email isn't correct").isEmail(),
  body("password", "Password is too short").isLength({ min: 6 }),
  body("username", "Username is too short").isLength({ min: 4 }),
  body("avatarUrl").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "Text is too short").isLength({ min: 5 }).isString(),
  body("text", "Text is too short").isLength({ min: 10 }),
  body("tags", "Tags isn't correct'").optional().isArray(),
  body("imageUrl", "Image URL isn't correct").optional().isString(),
];
