import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'anayfernandez95@gmail.com',
        pass: 'tu-contraseña'
      }
    });
  }

  async sendMail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: 'anayfernandez95@gmail.com',
      to,
      subject,
      text
    };
    await this.transporter.sendMail(mailOptions);
  }
}
