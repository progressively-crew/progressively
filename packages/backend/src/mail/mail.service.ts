import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { getEnvVars } from '../envVariable';

@Injectable()
export class MailService {
  private transporter: any;

  constructor() {
    const env = getEnvVars();

    this.transporter = nodemailer.createTransport({
      host: env.SmtpHost,
      port: env.SmtpPort,
      secure: false,
      auth: {
        user: env.SmtpUser,
        pass: env.SmtpPassword,
      },
      tls: {
        ciphers: 'SSLv3',
      },
    });
  }

  sendRegistrationMail(fullname: string, to: string, activationToken: string) {
    const env = getEnvVars();

    return this.transporter.sendMail({
      from: '"👻" <no-reply@progressively.io>', // sender address
      to,
      subject: '[Progressively] Activate your new user', // Subject line
      html: `<div>
          <h1>Hello ${fullname}</h1>
          <p>You've recently created a new user on Progressively.</p>
          <p>
            In order for it to be activated, you would need to follow this link:
            <a
              href="${env.BackendUrl}/auth/activate/${activationToken}"
              target="_blank"
              rel="noopener noreferrer"
            >
              ${env.BackendUrl}/auth/activate/${activationToken}</a
            >
          </p>
        </div>`,
    });
  }

  sendResetPasswordMail(
    fullname: string,
    to: string,
    resetPasswordToken: string,
  ) {
    const env = getEnvVars();

    return this.transporter.sendMail({
      from: '"👻" <no-reply@Progressively.io>', // sender address
      to,
      subject: '[Progressively] Reset your password', // Subject line
      html: `<div>
        <h1>Hello ${fullname}</h1>
        <p>You've recently asked to reset your password.</p>
        <p>
          In order for it to be done, you would need to follow this link:
          <a
            href=" ${env.FrontendUrl}/reset-password?token=${resetPasswordToken}&p=s"
            target="_blank"
            rel="noopener noreferrer"
          >
          ${env.FrontendUrl}/reset-password?token=${resetPasswordToken}&p=s</a
          >
        </p>
        <p style="color:red;">This link will be valid for 15mns.</p>
      </div>`,
    });
  }
}
