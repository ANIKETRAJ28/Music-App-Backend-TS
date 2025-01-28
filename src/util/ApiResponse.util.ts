import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Response } from 'express';

export function sendResponse(res: Response, response: ApiResponse): void {
  res.status(response.statusCode).json({
    message: response.message,
    data: response.data,
  });
}

class ApiResponse {
  constructor(
    public message: string,
    public statusCode: number,
    public data?: unknown,
  ) {}
}

export class ErrorResponse {
  constructor(
    public res: Response,
    public error: Error | PrismaClientKnownRequestError,
  ) {
    let statusCode = 500;
    let message = error.message;
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P1000':
          statusCode = 503;
          message = 'Database connection error';
          break;
        case 'P1002':
          statusCode = 504;
          message = 'Database connection timeout';
          break;
        case 'P2001':
          statusCode = 404;
          message = 'Record not found';
          break;
        case 'P2002':
          statusCode = 409;
          message = 'Unique constraint failed';
          break;
      }
    }
    this.res.status(statusCode).json({ message });
  }
}

export class Created extends ApiResponse {
  constructor(message: string, data?: unknown) {
    super(message, 201, data);
  }
}

export class Success extends ApiResponse {
  constructor(message: string, data?: unknown) {
    super(message, 200, data);
  }
}

export class Unauthorized extends ApiResponse {
  constructor(message: string, data?: unknown) {
    super(message, 401, data);
  }
}

export class NotFound extends ApiResponse {
  constructor(message: string, data?: unknown) {
    super(message, 404, data);
  }
}

export class BadRequest extends ApiResponse {
  constructor(message: string, data?: unknown) {
    super(message, 400, data);
  }
}

export class InternalServerError extends ApiResponse {
  constructor(message: string, data?: unknown) {
    super(message, 500, data);
  }
}
