import { z, ZodError } from "zod";

export class ErrorHandler {
  constructor(private readonly error: any) {}

  handle() {
    if (this.error instanceof ZodError) {
      return this.handleZodError(this.error);
    } else if (this.error instanceof Error) {
      return this.handleJSError(this.error);
    }

    return {
      message: "Internal server error",
      data: null,
      status: 500,
    };
    // Based on instance of err, return the response payload
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
