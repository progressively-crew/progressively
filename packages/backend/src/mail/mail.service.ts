import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Smtp } from './smtp-constants';
import { ResetPasswordEmail } from './emails/reset-password';
import { RegistrationEmail } from './emails/registration';

@Injectable()
export class MailService {
  private transporter: any;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: Smtp.host,
      port: Smtp.port,
      secure: false,
      auth: {
        user: Smtp.user,
        pass: Smtp.password,
      },
      tls: {
        ciphers: 'SSLv3',
      },
    });
  }

  sendRegistrationMail(fullname: string, to: string, activationToken: string) {
    const html = RegistrationEmail({
      fullname,
      activateAccountLink: `${process.env.BACKEND_URL}/auth/activate/${activationToken}`,
    });

    return this.transporter.sendMail({
      from: '"The Progressively Team" <no-reply@progressively.io>', // sender address
      to,
      subject: '[Progressively] Activate your new user', // Subject line
      html,
    });
  }

  sendResetPasswordMail(
    fullname: string,
    to: string,
    resetPasswordToken: string,
  ) {
    const html = ResetPasswordEmail({
      fullname,
      resetPasswordLink: `${process.env.FRONTEND_URL}/reset-password?token=${resetPasswordToken}&p=s`,
    });

    return this.transporter.sendMail({
      from: '"The Progressively Team" <no-reply@Progressively.io>', // sender address
      to,
      subject: '[Progressively] Reset your password', // Subject line
      html,
    });
  }
}
