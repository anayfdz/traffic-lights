import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from './jwtAuth.guard';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard extends JwtAuthGuard {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user && user.role === 'admin' || user.role === 'super_admin';
  }
}
