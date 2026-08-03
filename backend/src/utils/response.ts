import { Response } from 'express';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
}

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = 'Success',
  statusCode = 200
) => {
  const response: ApiResponse<T> = { success: true, message, data };
  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  message = 'Error',
  statusCode = 500,
  errors?: any
) => {
  const response: ApiResponse<null> = { success: false, message, errors };
  return res.status(statusCode).json(response);
};
