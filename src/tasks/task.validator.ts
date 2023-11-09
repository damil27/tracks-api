import { body, ValidationChain } from "express-validator";
import { Status } from "../enum/Status";
import { Priority } from "../enum/Priority";

export const createValidator: ValidationChain[] = [
  body("title")
    .not()
    .isEmpty()
    .withMessage("Title field is mandatory")
    .trim()
    .isString()
    .withMessage("Title field needs to be text format"),
  body("description")
    .not()
    .trim()
    .isEmail()
    .withMessage("Description field is required")
    .isString()
    .withMessage("Description field needs to be in text format"),
  body("date")
    .not()
    .isEmpty()
    .withMessage("Date field is required")
    .isString()
    .withMessage("Date field need to be date format"),
  body("priority")
    .trim()
    .isIn([Priority.high, Priority.normal, Priority.low])
    .withMessage("Priority can only be high, normal or lows"),
  body("status")
    .trim()
    .isIn([Status.completed, Status.inProgress, Status.todo])
    .withMessage("Status can only be Completed, inprogress and todo"),
];

export const updateValidator: ValidationChain[] = [
  body("id")
    .not()
    .isEmpty()
    .withMessage("id is required to make an update")
    .isString()
    .trim(),
  body("status")
    .not()
    .isEmpty()
    .withMessage("status is mandatory")
    .isIn([Status.completed, Status.inProgress, Status.todo])
    .withMessage("Status can only be completed, inprogress or todo"),
];
