import nodemailer from 'nodemailer';

export default async ({ from = 'no-reply@localhost', to, subject, html
}) => {
  try {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    const message = await transporter.sendMail({ to, from, subject, html });
    const mailPreviewUrl = nodemailer.getTestMessageUrl(message);

    console.log(message);
    console.log(mailPreviewUrl);

    return mailPreviewUrl;
  } catch (err) {
    console.error(err);
  }
};
