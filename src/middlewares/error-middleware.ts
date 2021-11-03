import { ApiError } from "../exceptions/api-error";

module.exports = function (
  err: {
    status: any;
    message: any;
    errors: any;
  },
  req: any,
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: {
        (arg0: { message: string; errors?: string[] }): any;
        new (): any;
      };
    };
  },
  next: any
) {
  console.log(err);
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: "Unforeseeable error" });
}
