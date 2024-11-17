import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
  async signIn(email: string, pass: string): Promise<{ 
    user : string,
    access_token: string }> {
      const user = await this.userModel.findOne({email : email})
    //const user = await this.usersService.findByEmail(email);
    if (user?.password != pass) {
      throw new UnauthorizedException();
    }
    const payload = {
      id: user._id,
      username: user.username,
      role: user.role
    };
    console.log(payload)
    console.log(this.jwtService);
    let jwt1 =  this.jwtService.sign(payload);
    return {
      user : user.username,
      access_token: jwt1,
    };
  }

  async validateUser(payload: any) {
    const user = await this.userModel.findById(payload.id);
    return user;
  }
  async getProfileUser(id : string ){
    const user = await await this.userModel.findById(id);
    return user
  }
}
