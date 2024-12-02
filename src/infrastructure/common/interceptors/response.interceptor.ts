import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class ResponseFormat<T> {
  @ApiProperty({ required: false })
  isArray?: boolean;
  @ApiProperty({ required: false })
  path?: string;
  @ApiProperty({ required: false })
  duration?: string;
  @ApiProperty({ required: false })
  method?: string;

  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseFormat<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseFormat<T>> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    return next.handle().pipe(
      map((data) => {
        // Si los datos tienen un mensaje, devuelve solo el mensaje
        if (data && data.message) {
          return { data: data.message }; // solo el mensaje
        }
        // Si no es un mensaje, sigue con la estructura de la respuesta
        return {
          data,
          isArray: Array.isArray(data),
          path: request.path,
          duration: `${Date.now() - now}ms`,
          method: request.method,
        };
      }),
    );
  }
}

