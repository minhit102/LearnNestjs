import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import { json } from 'stream/consumers';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    console.log("User : " + user);
    console.log("RequiredRoles : " + requiredRoles[0] )
    //return requiredRoles.includes(user?.role)
    //return requiredRoles.some(role => role == user?.role);
    return false //requiredRoles.some(role => String(role) === String(user?.role));

  }
}
