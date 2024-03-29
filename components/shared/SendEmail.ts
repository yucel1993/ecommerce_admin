import nodemailer from "nodemailer";

interface MailSettings {
  service: string;
  user: string;
  pass: string;
}

interface EmailContent {
  from: string;
  to: string;
  subject: string;
  text: string;
}

const sendMail = async (
  to: string,
  subject: string,
  message: string
): Promise<void> => {
  console.log(to, subject, message);
  // Set Passive:
  const mailSettings: MailSettings = {
    service: "Gmail",
    user: process.env.NEXT_PUBLIC_ADMIN_MAIL!,
    pass: process.env.NEXT_PUBLIC_ADMIN_PASS!, // Use app password: https://myaccount.google.com/u/1/apppasswords
  };

  const emailContent: EmailContent = {
    from: mailSettings.user,
    to: to,
    subject: subject,
    text: message,
    // html: "<b>Hello</b> How are you?",
  };

  const transporter = nodemailer.createTransport({
    service: mailSettings.service,
    auth: {
      user: mailSettings.user,
      pass: mailSettings.pass,
    },
  });

  transporter.sendMail(emailContent, (error: Error | null, info: any) => {
    if (error) {
      console.error(error);
    } else {
      console.log(info);
    }
  });
};

export default sendMail;
