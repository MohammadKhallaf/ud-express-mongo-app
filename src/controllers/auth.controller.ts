import { NextFunction, Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  public static async login(req: Request, res: Response, next: NextFunction) {
    // const result = validationResult(req);
    // if (!result.isEmpty()) {
    //   return res.send({ errors: result.array() });
    // }
    // const data = matchedData(req);
    // const user = await User.findOne({ where: { username: data.username } });
    // const isMatched = await bcrypt.compare(data.password, user.password);
    // if (!isMatched) {
    //   return res.status(401).send("Credintials didn't match!");
    // }
    // const token = jwt.sign(
    //   { userId: user.id, username: user.username },
    //   process.env.JWT_SECRET!,
    //   { expiresIn: "1h" }
    // );
    // res.status(200).json({ userId: user.id, token: "Bearer " + token });
  }

  public static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ) {}
  
}

export default AuthController;
