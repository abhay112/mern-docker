// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";

// Custom error handler middleware
export function errorHandler(
  err: any, // Error object
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err); // Log the error for debugging

  // Set default status code to 500 if it's not already set
  const statusCode = err.statusCode || 500;
  
  // Send the error response
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }) // Only include stack trace in development
  });
}
