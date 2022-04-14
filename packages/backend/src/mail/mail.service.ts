import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Smtp } from './smtp-constants';

@Injectable()
export class MailService {
  private transporter: any;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: Smtp.host,
      port: Smtp.port,
      secure: Smtp.secure,
      auth: {
        user: Smtp.user,
        pass: Smtp.password,
      },
    });
  }

  async sendRegistrationMail(
    fullname: string,
    to: string,
    activationToken: string,
  ) {
    await this.transporter.sendMail({
      from: '"👻" <no-reply@rollout.io>', // sender address
      to,
      subject: '[Rollout] Activate your new user', // Subject line
      html: `<div>
        <h1>Hello ${fullname}</h1>
        <p>You've recently created a new user on Rollout.</p>
        <p>
          In order for it to be activated, you would need to follow this link:
          <a
            href="${process.env.BACKEND_URL}/auth/activate/${activationToken}"
            target="_blank"
            rel="noopener noreferrer"
          >
            ${process.env.BACKEND_URL}/auth/activate/${activationToken}</a
          >
        </p>
      </div>`,
    });
  }

  async sendResetPasswordMail(
    fullname: string,
    to: string,
    resetPasswordToken: string,
  ) {
    await this.transporter.sendMail({
      from: '"👻" <no-reply@rollout.io>', // sender address
      to,
      subject: '[Rollout] Reset your password', // Subject line
      html: `<div>
        <h1>Hello ${fullname}</h1>
        <p>You've recently asked to reset your password.</p>
        <p>
          In order for it to be done, you would need to follow this link:
          <a
            href=" ${process.env.FRONTEND_URL}/reset-password?token=${resetPasswordToken}"
            target="_blank"
            rel="noopener noreferrer"
          >
          ${process.env.FRONTEND_URL}/reset-password?token=${resetPasswordToken}</a
          >
        </p>
        <p style="color:red;">This link will be valid for 15mns.</p>
      </div>`,
    });
  }
}
