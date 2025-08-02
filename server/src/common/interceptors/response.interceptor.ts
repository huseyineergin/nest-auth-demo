import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Response } from "express";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface APIResponse<T> {
  message: string;
  status: number;
  success: true;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, APIResponse<T>> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<APIResponse<T>> {
    const message = this.reflector.get<string>("response_message", context.getHandler());
    const response: Response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data: T) => ({
        status: response.statusCode,
        message: message,
        success: true,
        data,
      }))
    );
  }
}
