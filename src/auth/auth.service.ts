import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { OtpService } from './otp.service';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectQueue('email') private readonly emailQueue: Queue,
    @InjectModel(User.name) private userModel: Model<User>,
    private otpService : OtpService,
  ) {}
  async signIn(email: string, pass: string): Promise<{ 
    user : string,
    access_token: string }> {
      const user = await this.userModel.findOne({email : email})
      const isMatch = await bcrypt.compare( pass, user?.password);
    //const user = await this.usersService.findByEmail(email);
    if (!isMatch) {
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

  async validateUser(email : string , password : string) {
    const user = await this.userModel.findOne({email : email});
    if(user?.password !== password ){
      return false;
    }
    return user;
  }
  async getProfileUser(id : string ){
    const user =  await this.userModel.findById(id);
    return user
  }

  async forgotPassword(forgotPasswordDto : ForgotPasswordDto){
    const findUser = await this.userModel.findOne({email : forgotPasswordDto.email})

    if(!findUser){
      throw new NotFoundException(`User with ${forgotPasswordDto.email} not exits`)
    }
    const otp = await this.otpService.generateAndSaveOTP(findUser._id);
    const data = {
      email : findUser.email,
      otp : otp
    }
    console.log(data)
    await this.emailQueue.add('send',data);
    return { 
      message: 'OTP has been sent to your email.',
     };
  }
}
