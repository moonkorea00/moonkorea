import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const sendNotificationEmail = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { postId, body } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NEXT_PUBLIC_NODEMAILER_USER,
      pass: process.env.NEXT_PUBLIC_NODEMAILER_PASS,
    },
  });

  const mailOptions = {
    from: `"moonkorea" <${process.env.NEXT_PUBLIC_NODEMAILER_USER}>`,
    to: process.env.NEXT_PUBLIC_NODEMAILER_RECIPIENT,
    subject: `moonkorea(comment) : ${postId}`,
    text: postId,
    html: `<a href=https://moonkorea.dev/${postId} target=”_blank”>https://moonkorea.dev/${postId}</a><p>content : ${
      body || 'none'
    }</p>`,
  };

  const sendNotification = async () => {
    await new Promise((resolve, reject) => {
      transporter.verify(function (err, success) {
        if (err) {
          console.log('SMTP server error : ', err);
          reject(err);
        } else {
          resolve(success);
        }
      });
    });

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, mailRes) => {
        if (err) {
          reject(err);
        } else {
          resolve(mailRes);
        }
      });
    });
  };

  try {
    await sendNotification();
    return res.status(201).json({ message: 'sent' });
  } catch (err) {
    return res.status(500).json({ message: `internal server error` });
  }
};

export default sendNotificationEmail;
