import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { Otp, OtpSchema } from './schemas/otp.schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OtpService {
  constructor(@InjectModel(Otp.name) private otpModel: Model<Otp>) {}

  // Tạo OTP và lưu vào DB
  async generateAndSaveOTP(user_id: Object): Promise<string> {
    const otp = randomInt(100000, 999999).toString(); 
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 2);
    const newOtp = this.otpModel.create({ user_id, otp, expiresAt });
    return otp;
  }
}
