import { ApiError } from "../exceptions/api-error";
import * as express from "express";

module.exports = function (
  err: express.Errback,
  req: express.Request,
  res: express.Response,
  next
) {
  console.log(err);
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .send({message: err.message, errors: err.errors})
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: "Unforeseeable error" }).send({message: "Unforeseeable error"});
};
