import { z, ZodError } from "zod";
import { CustomError } from "./customError.js";

export class ErrorHandler {
  constructor(private readonly error: any) {}

  // Based on instance of err, return the response payload
  handle() {
    if (this.error instanceof ZodError) {
      return this.handleZodError(this.error);
    } else if (this.error instanceof CustomError) {
      return this.handleCustomError(this.error);
    } else if (this.error instanceof Error) {
      return this.handleJSError(this.error);
    }

    return {
      message: "Internal server error",
      data: null,
      status: 500,
    };
  }

  handleCustomError(err: CustomError) {
    console.log({ s: err.statusCode });
    return {
      status: err.statusCode,
      message: err.message,
      data: err.data ?? null,
    };
  }

  handleJSError(err: Error) {
    return {
      status: 500,
      message: err.message || "Internal server error",
      data: null,
    };
  }

  handleZodError(err: ZodError) {
    return {
      status: 422,
      message: "Validation failed",
      data: z.treeifyError(err),
    };
  }
}
