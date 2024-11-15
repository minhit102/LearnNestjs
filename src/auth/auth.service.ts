import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(email: string, pass: string): Promise<{ 
    user : string,
    access_token: string }> {
    const user = await this.usersService.findByEmail(email);
    if (user?.password != pass) {
      throw new UnauthorizedException();
    }
    const payload = {
      id: user._id,
      username: user.username,
    };
    //console.log(payload)
    console.log(this.jwtService);
    let jwt1 =  this.jwtService.sign(payload);
    return {
      user : user.username,
      access_token: jwt1
    };
  }


  async getProfileUser(id : string ){
    const user = await this.usersService.findOne(id);
    return user.user
  }
}
