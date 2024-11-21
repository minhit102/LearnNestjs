import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { jwtConstants } from './constants';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { OtpService } from './otp.service';
import { Otp, OtpSchema } from './schemas/otp.schemas';
import { BullModule } from '@nestjs/bull';
import { EmailProcessor } from './email.process';
import { MailService } from 'src/mail/mail.service';
import { MailModule } from 'src/mail/mail.module';
// import { EmailProcessor } from './email.process';
@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost', // Địa chỉ Redis
        port: 6379,        // Cổng Redis
      },
    }),
    BullModule.registerQueue({
      name: 'email', // Tên queue
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Otp.name,
        schema: OtpSchema,
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '20m' },
      }),
    }),
    PassportModule,
    MailModule
  ],
  providers: [AuthService, JwtStrategy, OtpService  , EmailProcessor],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
