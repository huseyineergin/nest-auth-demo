import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const exceptionResponse = exception.getResponse();
    const status = exception.getStatus();
    let message = exception.message;

    if (typeof exceptionResponse === "object" && exceptionResponse !== null) {
      if ("message" in exceptionResponse) {
        message = (exceptionResponse as Record<string, string>)["message"];
      }
    }

    response.status(status).json({
      success: false,
      status: status,
      message,
    });
  }
}
