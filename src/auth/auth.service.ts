import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Dependencies, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User, UserDocument } from '../users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
@Dependencies(UsersService)
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
      ) {}


  async signIn(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (user?.password != pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return user;
  }
}