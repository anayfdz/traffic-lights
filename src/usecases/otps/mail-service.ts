import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import axios from 'axios';
import { Resend } from 'resend';
@Injectable()
export class MailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY)
  }

  async sendMail(to: string, subject: string, text: string): Promise<void> {
    try {
      const response = await this.resend.emails.send({ 
        from: 'Acme <' + process.env.SERVER_MAIL + '>', 
        to: [to], 
        subject: subject, 
        html: `<p>${text}</p>`,
        text: text,
      });
      console.log('Correo enviado:', response);
    } catch (e) {
      console.log('Error en el envio del correo', e)
    }
  }
}
