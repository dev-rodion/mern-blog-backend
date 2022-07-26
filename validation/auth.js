import { body } from "express-validator";

export const registerValidation = [
  body("email", "Email isn't correct").isEmail(),
  body("password", "Password is too short").isLength({ min: 6 }),
  body("username", "Username is too short").isLength({ min: 4 }),
  body("avatarUrl").optional().isURL(),
];
