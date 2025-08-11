import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { validateRequest, BadRequestError } from "@raipackages/common";
import { User } from "../models/user";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return next(new BadRequestError("Invalid email and password"));
    }

    const checkPassword = await Password.compare(
      existingUser.password,
      password
    );

    if (!checkPassword) {
      return next(new BadRequestError("Invalid email and password"));
    }

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    return res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
