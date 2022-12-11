import {
  CanActivate,
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from '../providers/auth.service';

@Injectable()
export class AuthGuard<T extends object> implements CanActivate {
  constructor(private reflector: Reflector, private srv: AuthService<T>) {}
  private log(...data: any[]): void {
    const msg = data[0];
    data[0] = '';
    console.log(
      `[AuthGuard @ ${new Date().toDateString()} - LOG] ${msg}`,
      ...data,
    );
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (process.env.DEV) {
      return true;
    }
    return this.validateRequest(context.switchToHttp().getRequest());
  }

  validateRequest(request: any): Observable<boolean> {
    return new Observable((subscriber) => {
      const req = request as Request;
      const token = this.hasToken(req.headers);
      subscriber.next(token !== '');
      this.tokenIsValid(token)
        .then((user) => {
          request.token_data = user;
          this.log(' Meta data setten ');
          subscriber.complete();
        })
        .catch((e) => {
          this.log(`${e} ${token}`);
          subscriber.error(new UnauthorizedException());
        })
        .finally(() => {
          subscriber.complete();
        });
    });
  }

  hasToken(header: Headers): string {
    if (!header['authorization']) return '';
    return header['authorization'];
  }

  async tokenIsValid(token: string): Promise<T> {
    return this.srv.Validate(token);
  }
}
