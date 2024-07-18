import { Request, Response, NextFunction } from "express";
import { validationResult, body, param } from "express-validator";

class Validation {
  static userIdInParamValidation =
    param('userId')
      .isNumeric()
      .withMessage('userId should be numeric');

  public static checkValidation(req: Request, res: Response, next: NextFunction) {
      // Input validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array().map((error: any) => {
            const { value, ...rest } = error;
            return rest;
          }),
        });
      }

      return next()
    }
}

export default Validation;
