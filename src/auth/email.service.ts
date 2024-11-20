import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    async sendOtpEmail(email: string, otp: string): Promise<void> {
        console.log(process.env.EMAIL_USER,)
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "minhit102k66@gmail.com",
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}. It is valid for 2 minutes.`,
        };

        await this.transporter.sendMail(mailOptions);
    }
}
