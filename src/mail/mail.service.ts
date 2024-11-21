import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(data : any) {
    await this.mailerService.sendMail({
      to: "minhit102k66@gmail.com",
      from : "minhhoangtrong1002@gmail.com",
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation', 
      context: {
        otp : data.data.otp
      },
    });
  }
}
