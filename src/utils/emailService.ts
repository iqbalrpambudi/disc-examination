import nodemailer from 'nodemailer';

type EmailData = {
  recipientEmail: string;
  hrEmail: string;
  subject: string;
  text: string;
  html: string;
  attachments?: Array<{
    filename: string;
    contentType: string;
    path?: string;
    content?: string | Buffer;
  }>;
};

export async function sendEmail(data: EmailData): Promise<{ success: boolean; message: string }> {
  try {
    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"DISC Assessment" <${process.env.EMAIL_USER}>`,
      to: data.recipientEmail,
      cc: data.hrEmail,
      subject: data.subject,
      text: data.text,
      html: data.html,
      attachments: data.attachments,
    });

    return {
      success: true,
      message: `Email sent: ${info.messageId}`,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}