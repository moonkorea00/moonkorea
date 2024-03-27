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
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PW,
    },
  });

  const mailOptions = {
    from: `"moonkorea" <${process.env.NODEMAILER_USER}>`,
    to: process.env.NODEMAILER_RECIPIENT,
    subject: `moonkorea(comment) : ${postId}`,
    text: postId,
    html: `<a href=https://moonkorea.dev/${postId} target=”_blank”>https://moonkorea.dev/${postId}</a><p>content : ${
      body || 'none'
    }</p>`,
  };
  
  try {
    await transporter.verify();
    await transporter.sendMail(mailOptions);
    return res.status(201).json({ message: 'sent' });
  } catch (err) {
    console.log('Error sending mail :', err);
    return res.status(500).json({ message: 'internal server error' });
  }
};

export default sendNotificationEmail;
