import { Processor, Process } from '@nestjs/bull';
import * as nodemailer from 'nodemailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailService } from 'src/mail/mail.service';
@Processor('email')
export class EmailProcessor {
  constructor(private mailService: MailService) {}
  @Process('send')
  async handleSendEmail(data: any) {
    console.log("em ");
    try {
      await this.mailService.sendUserConfirmation(data)
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
