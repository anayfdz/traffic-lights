import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LoginGuard extends AuthGuard('local') {
    canActivate(context: ExecutionContext) {
        console.log("LoginGuard: Validando las credenciales...");
        return super.canActivate(context);
      }
}
